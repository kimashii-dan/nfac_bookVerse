import httpx
from config import settings
from models import APIBookItem, APIBookListResponse, BookResponse

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
        response = await client.get(
            settings.GOOGLE_API_URL,
            params=params,
            timeout=10.0
        )
        response.raise_for_status()
        return APIBookListResponse(**response.json())
    


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
