import html
import re
import httpx
from config import settings
from models import APIBookDetailsItem, APIBookItem, APIBookListResponse, BookDetailsResponse, BookResponse

async def fetch_books_from_api(
    query: str,
    limit: int,
    offset: int,
    search_by: str = "title"
) -> APIBookListResponse:
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
        return APIBookListResponse(**response.json())
    

async def fetch_book_by_id(
    id: str
) -> APIBookDetailsItem:
    
    params = {
            "fields": "id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/imageLinks,volumeInfo/averageRating,volumeInfo/ratingsCount",
            "key": settings.GOOGLE_API_KEY.get_secret_value()
        }

    async with httpx.AsyncClient() as client:
        url = f"{settings.GOOGLE_API_URL}/{id}"
        response = await client.get(url, params=params, timeout=10.0)
        response.raise_for_status()
        return APIBookDetailsItem(**response.json())


def format_details_book(book: APIBookDetailsItem) -> BookDetailsResponse:
    volume_info = book.volumeInfo
    published_year = volume_info.publishedDate.split("-")[0] if volume_info.publishedDate else "0000"
    
    thumbnail = ""
    if volume_info.imageLinks and volume_info.imageLinks.thumbnail:
        thumbnail = volume_info.imageLinks.thumbnail.replace("http:", "https:")

    description = convert_into_text(volume_info.description)
    
    return BookDetailsResponse(
        id=book.id,
        title=volume_info.title or "Unknown Title",
        author=volume_info.authors[0] if volume_info.authors else "Unknown Author",
        description=description or "No description available",
        publishDate=published_year,
        image=thumbnail,
        averageRating=volume_info.averageRating,
        ratingsCount=volume_info.ratingsCount
    )


def format_book(book: APIBookItem) -> BookResponse:
    volume_info = book.volumeInfo
    published_year = volume_info.publishedDate.split("-")[0] if volume_info.publishedDate else "0000"
    
    thumbnail = ""
    if volume_info.imageLinks and volume_info.imageLinks.thumbnail:
        thumbnail = volume_info.imageLinks.thumbnail.replace("http:", "https:")
    
    return BookResponse(
        id=book.id,
        title=volume_info.title or "Unknown Title",
        author=volume_info.authors[0] if volume_info.authors else "Unknown Author",
        publishDate=published_year,
        image=thumbnail,
        averageRating=volume_info.averageRating
    )






def convert_into_text(html_text: str) -> str:
    plain_text = re.sub(r'<[^>]+>', '', html_text)
    decoded_text = html.unescape(plain_text)
    sentences = re.split(r'(?<=[.!?])\s+', decoded_text)
    return ' '.join(sentences[:3])