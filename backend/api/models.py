from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy import Column, Float, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from db import Base, engine

# Search books API models
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
    
class APIBookList(BaseModel):
    items: Optional[List[APIBookItem]] = None
    totalItems: int = 0
        
class BookItem(BaseModel):
    id: str
    title: str
    author: str
    publish_date: str
    image: str
    average_rating: Optional[float] = None
    
class BookListResponse(BaseModel):
    books: Optional[List[BookItem]] = None
    total_books: int = 0
    

# Specific book API models    
class VolumeDetailsInfo(BaseModel):
    title: Optional[str] = None
    authors: Optional[List[str]] = None
    description: Optional[str] = None
    publishedDate: Optional[str] = None
    imageLinks: Optional[ImageLinks] = None
    averageRating: Optional[float] = None
    ratingsCount: Optional[int] = None    

class APIBookDetails(BaseModel):
    id: str
    volumeInfo: VolumeDetailsInfo

class BookDetailsResponse(BaseModel):
    id: str
    title: str
    author: str
    description: Optional[str] = None
    publish_date: str
    image: str
    average_rating: Optional[float] = None
    ratings_count: Optional[int] = None


# Gemini response API models
class VolumeTitleOnly(BaseModel):
    title: Optional[str] = None

class APIBookTitle(BaseModel):
    id: str
    volumeInfo: VolumeTitleOnly

class APIBookTitles(BaseModel):
    items: Optional[List[APIBookTitle]] = None
    
class BookTitle(BaseModel):
    title: str
    id: str

class GeminiResponse(BaseModel):
    main_text: str
    books: Optional[List[BookTitle]]
    
    
# User submissions
class UserDTO(BaseModel):
    username:str
    password:str
    
class UserPrompt(BaseModel):
    prompt: str    
 
 
   
class Token(BaseModel):
    access_token: str
    username: str
    
class RefreshTokenRequest(BaseModel):
    refresh_token: str    
    
class TokenData(BaseModel):
    username: Optional[str] = None


# Database
user_book_association = Table(
    'user_book',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('book_id', String, ForeignKey('books.id'))
)

class User(Base):
    __tablename__="users"

    id=Column(Integer, primary_key=True, index=True)
    username=Column(String, unique=True, index=True)
    hashed_password=Column(String)
    books = relationship("Book", secondary=user_book_association, back_populates="users")

class Book(Base):
    __tablename__ = "books"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    publish_date = Column(String)
    image = Column(String)
    average_rating = Column(Float, nullable=True)
    users = relationship("User", secondary=user_book_association, back_populates="books")
    
Base.metadata.create_all(bind=engine)