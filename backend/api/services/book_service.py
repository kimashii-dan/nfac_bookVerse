
import httpx
from config import settings
from models import APIBookDetails, APIBookList, Book, APIBookTitles
from sqlalchemy.orm import Session
async def fetch_books(
    query: str,
    limit: int,
    offset: int,
    search_by: str = "title"
) -> APIBookList:
    params = {
            "q": f"in{search_by}:{query}",
            "startIndex": offset,
            "maxResults": limit,
            "fields": "items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/imageLinks,volumeInfo/averageRating),totalItems",
            "key": settings.GOOGLE_API_KEY.get_secret_value()
        }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(settings.GOOGLE_API_URL, params=params, timeout=10.0)
        response.raise_for_status()
        return APIBookList(**response.json())
    
async def fetch_bookId_by_title(
    title: str,
) -> APIBookTitles:
    params = {
            "q": f"intitle:{title}",
            "maxResults": 1,
            "fields": "items(id,volumeInfo/title)",
            "key": settings.GOOGLE_API_KEY.get_secret_value()
        }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(settings.GOOGLE_API_URL, params=params, timeout=10.0)
        response.raise_for_status()
        return APIBookTitles(**response.json())    

async def fetch_book_by_id(
    id: str
) -> APIBookDetails:
    
    params = {
            "fields": "id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/imageLinks,volumeInfo/averageRating,volumeInfo/ratingsCount",
            "key": settings.GOOGLE_API_KEY.get_secret_value()
        }

    async with httpx.AsyncClient() as client:
        url = f"{settings.GOOGLE_API_URL}/{id}"
        response = await client.get(url, params=params, timeout=10.0)
        response.raise_for_status()
        return APIBookDetails(**response.json())






def get_book_by_id(db: Session, id: str):
    return db.query(Book).filter(Book.id == id).first()

def create_book(db: Session, book: Book):
    db_book = Book(id=book.id, title=book.title, author=book.author, publish_date=book.publish_date, image=book.image, average_rating=book.average_rating)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book






    
