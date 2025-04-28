import json
from fastapi import  Depends, FastAPI, HTTPException, Query
from fastapi.security import  OAuth2PasswordRequestForm
import httpx
from services.book_service import create_book, fetch_book_by_id, fetch_bookId_by_title, fetch_books_from_api, format_book, format_details_book, get_book_by_id
from models import  BookDetailsResponse, BookResponse, BookListResponse, BookTitle, GeminiResponse, UserDTO, UserPrompt
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import  timedelta
from services.auth_service import get_user_by_username, authenticate_user, create_access_token, create_user, verify_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_db
from services.auth_service import oauth2_scheme
from services.gemini_service import generate


app = FastAPI()

origins = [
    "https://nfac-book-verse.vercel.app",
    "http://nfac-book-verse.vercel.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/register')
def register_user(user: UserDTO, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db=db, user=user)



@app.post('/token')
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException (
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_data=access_token_expires)
    return {"access_token": access_token, "username": user.username}
    





@app.post("/favorites")
async def add_favorite(book: BookResponse, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    username = verify_token(token)
    if not username:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    db_user = get_user_by_username(db, username)
    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    db_book = get_book_by_id(db, book.id)
    if not db_book:
        db_book = create_book(db=db, book=book)
    
    if db_book in db_user.books:
        raise HTTPException(status_code=400, detail="Book already associated with user")
         
    db_user.books.append(db_book)
    db.commit()
    
    return {"message": f"Book {db_book.title} added to user {db_user.username}"}
    
    
    
@app.get("/favorites")
def get_user_favorites(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    username = verify_token(token)
    if not username:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    db_user = get_user_by_username(db, username)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db_user.books   



@app.get("/books", response_model=BookListResponse)
async def find_books(
    query: Optional[str] = Query(None),
    search_by: str = Query("title", pattern="^(title|author)$"),
    page: int = Query(1, ge=1)
) -> BookListResponse:
    
    if not query:
        return BookListResponse(books=None, totalBooks=0)

    limit = 6
    offset = (page - 1) * limit

    try:
        data = await fetch_books_from_api(query=query, limit=limit, offset=offset, search_by=search_by)
        if not data.items:
                return BookListResponse(books=None, totalBooks=0)

        books = [format_book(book) for book in data.items]
        return BookListResponse(books=books, total_books=data.totalItems)

    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=400,
            detail=f"{e.response.status_code} - {e.response.text}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"{e}"
        )


@app.get("/books/{id}", response_model=BookDetailsResponse or None)
async def find_books(
    id: str
) -> BookDetailsResponse:
    
    if not id:
        return None

    try:
        data = await fetch_book_by_id(id)
        if not data.id:
                return None

        book_details = format_details_book(data)
        return book_details

    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=400,
            detail=f"{e.response.status_code} - {e.response.text}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"{e}"
        )


@app.post("/generate", response_model=GeminiResponse)
async def generate_response(request: UserPrompt):
    try:
        response = generate(request.prompt)
        result = json.loads(response)
        
        if not all(key in result for key in ["main_text", "book_titles"]):
            raise ValueError("Invalid response format")
        
        books: List[BookTitle] = []
    
        for title in result["book_titles"]:
            response = await fetch_bookId_by_title(title)
            
            if response.items:
                for item in response.items:
                    if item.volumeInfo and item.volumeInfo.title:
                        book = BookTitle(
                            id=item.id,
                            title=item.volumeInfo.title
                        )
                        books.append(book)
        
        return GeminiResponse(main_text=result["main_text"], books=books)
        
    except json.JSONDecodeError:
        raise HTTPException(500, "Failed to parse Gemini response")
    except Exception as e:
        raise HTTPException(500, f"Processing error: {str(e)}")
        