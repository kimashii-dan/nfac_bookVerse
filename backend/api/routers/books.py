from fastapi import  APIRouter, Depends, HTTPException, Query
import httpx
from services.book_service import create_book, fetch_book_by_id, fetch_books, get_book_by_id
from models import  BookDetailsResponse, BookListResponse, BookItem
from typing import List, Optional
from sqlalchemy.orm import Session
from services.auth_service import get_user_by_username, verify_token,  get_db
from services.auth_service import oauth2_scheme
from fastapi import APIRouter
from helpers import format_book, format_details_book, convert_into_text

books_router = APIRouter(prefix='/books', tags=["books"])


@books_router.get("/", response_model=BookListResponse)
async def find_books(
    query: Optional[str] = Query(None),
    search_by: str = Query("title", pattern="^(title|author)$"),
    page: int = Query(1, ge=1)
):
    
    if not query:
        return BookListResponse(books=None, totalBooks=0)

    limit = 6
    offset = (page - 1) * limit

    try:
        data = await fetch_books(query=query, limit=limit, offset=offset, search_by=search_by)
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


@books_router.get("/favorites", response_model=List[BookItem])
async def get_favorites(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
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


        
@books_router.post("/favorites")
async def add_favorite(book: BookItem, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
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



@books_router.get("/{id}", response_model=BookDetailsResponse)
async def find_book(id: str):

    try:
        book = await fetch_book_by_id(id)
    except httpx.HTTPStatusError:
        raise HTTPException(status_code=404, detail="Book not found")
    if not book.id or not book.volumeInfo.title:
        raise HTTPException(status_code=404, detail="Book not found")

    return format_details_book(book)
        
        

    
    
    




