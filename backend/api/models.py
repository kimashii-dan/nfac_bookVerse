from pydantic import BaseModel
from typing import Optional, List

class ImageLinks(BaseModel):
    smallThumbnail: Optional[str] = None
    thumbnail: Optional[str] = None


class VolumeInfo(BaseModel):
    title: Optional[str] = None
    authors: Optional[List[str]] = None
    publishedDate: Optional[str] = None
    imageLinks: Optional[ImageLinks] = None
    averageRating: Optional[float] = None

class APIBookItem(BaseModel):
    id: str
    volumeInfo: VolumeInfo

class APIBookListResponse(BaseModel):
    items: Optional[List[APIBookItem]] = None
    totalItems: int = 0

class BookResponse(BaseModel):
    id: str
    title: str
    author: str
    publishDate: str
    image: str
    averageRating: Optional[float] = None

class BookSearchResult(BaseModel):
    books: Optional[List[BookResponse]] = None
    totalBooks: int = 0