import html
import re
from models import APIBookDetails, APIBookItem, BookDetailsResponse, BookItem

def format_book(book: APIBookItem) -> BookItem:
    volume_info = book.volumeInfo
    published_year = volume_info.publishedDate.split("-")[0] if volume_info.publishedDate else "0000"
    
    thumbnail = ""
    if volume_info.imageLinks and volume_info.imageLinks.thumbnail:
        thumbnail = volume_info.imageLinks.thumbnail.replace("http:", "https:")
    
    return BookItem(
        id=book.id,
        title=volume_info.title or "Unknown Title",
        author=volume_info.authors[0] if volume_info.authors else "Unknown Author",
        publish_date=published_year,
        image=thumbnail,
        average_rating=volume_info.averageRating
    )


def format_details_book(book: APIBookDetails) -> BookDetailsResponse:
    volume_info = book.volumeInfo
    published_year = volume_info.publishedDate.split("-")[0] if volume_info.publishedDate else "0000"
    
    thumbnail = ""
    if volume_info.imageLinks and volume_info.imageLinks.thumbnail:
        thumbnail = volume_info.imageLinks.thumbnail.replace("http:", "https:")
        
        
    description = ""
    if volume_info.description:
        description = convert_into_text(volume_info.description)
    else:
        description="No description available"
    
    return BookDetailsResponse(
        id=book.id,
        title=volume_info.title or "Unknown Title",
        author=volume_info.authors[0] if volume_info.authors else "Unknown Author",
        description=description,
        publish_date=published_year,
        image=thumbnail,
        average_rating=volume_info.averageRating,
        ratings_count=volume_info.ratingsCount
    )


def convert_into_text(html_text: str) -> str:
    plain_text = re.sub(r'<[^>]+>', '', html_text)
    decoded_text = html.unescape(plain_text)
    sentences = re.split(r'(?<=[.!?])\s+', decoded_text)
    return ' '.join(sentences[:3])




