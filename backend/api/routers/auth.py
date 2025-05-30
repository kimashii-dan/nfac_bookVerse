from fastapi import  APIRouter, Depends, HTTPException
from fastapi.security import  OAuth2PasswordRequestForm
from models import UserDTO
from sqlalchemy.orm import Session
from datetime import  timedelta
from services.auth_service import get_user_by_username, authenticate_user, create_access_token, create_user, ACCESS_TOKEN_EXPIRE_MINUTES, get_db

auth_router = APIRouter(prefix='/auth', tags=["auth"])


@auth_router.post('/register')
def register_user(user: UserDTO, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db=db, user=user)


@auth_router.post('/token')
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException (
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_data=access_token_expires)
    return {"access_token": access_token, "username": user.username}