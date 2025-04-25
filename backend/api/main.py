from fastapi import FastAPI, HTTPException, Query
import httpx
from services.book_service import fetch_book_by_id, fetch_books_from_api, format_book, format_details_book
from models import  BookDetailsResponse, BookSearchResult
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/books", response_model=BookSearchResult)
async def find_books(
    query: Optional[str] = Query(None),
    search_by: str = Query("title", regex="^(title|author)$"),
    page: int = Query(1, ge=1)
) -> BookSearchResult:
    
    if not query:
        return BookSearchResult(books=None, totalBooks=0)

    limit = 6
    offset = (page - 1) * limit

    try:
        data = await fetch_books_from_api(query=query, limit=limit, offset=offset, search_by=search_by)
        if not data.items:
                return BookSearchResult(books=None, totalBooks=0)

        books = [format_book(book) for book in data.items]
        return BookSearchResult(books=books, totalBooks=data.totalItems)

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


