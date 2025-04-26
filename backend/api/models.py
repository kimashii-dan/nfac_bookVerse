from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy import Column, Float, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from db import Base, engine

class ImageLinks(BaseModel):
    smallThumbnail: Optional[str] = None
    thumbnail: Optional[str] = None


class VolumeInfo(BaseModel):
    title: Optional[str] = None
    authors: Optional[List[str]] = None
    publishedDate: Optional[str] = None
    imageLinks: Optional[ImageLinks] = None
    averageRating: Optional[float] = None

class VolumeDetailsInfo(BaseModel):
    title: Optional[str] = None
    authors: Optional[List[str]] = None
    description: Optional[str] = None
    publishedDate: Optional[str] = None
    imageLinks: Optional[ImageLinks] = None
    averageRating: Optional[float] = None
    ratingsCount: Optional[int] = None    


class APIBookItem(BaseModel):
    id: str
    volumeInfo: VolumeInfo

class APIBookDetailsItem(BaseModel):
    id: str
    volumeInfo: VolumeDetailsInfo

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

class BookDetailsResponse(BaseModel):
    id: str
    title: str
    author: str
    description: Optional[str] = None
    publishDate: str
    image: str
    averageRating: Optional[float] = None
    ratingsCount: Optional[int] = None

class BookSearchResult(BaseModel):
    books: Optional[List[BookResponse]] = None
    totalBooks: int = 0



class UserCreate(BaseModel):
    username:str
    password:str
    
class BookCreate(BaseModel):
    id: str
    title: str
    author: str
    publish_date: str
    image: str
    average_rating: Optional[float] = None


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