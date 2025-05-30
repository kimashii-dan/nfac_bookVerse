import json
from fastapi import  HTTPException
from services.book_service import fetch_bookId_by_title
from models import  BookTitle, GeminiResponse, UserPrompt
from typing import List
from services.gemini_service import generate
from fastapi import APIRouter


gemini_router = APIRouter(prefix='/gemini', tags=["gemini"])

@gemini_router.post("/generate", response_model=GeminiResponse)
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
        raise HTTPException(status_code=500, detail="Failed to parse Gemini response")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")
    
    