from fastapi import  APIRouter, Depends, HTTPException, Request, Response
from fastapi.security import  OAuth2PasswordRequestForm
from models import RefreshTokenRequest, Token, UserDTO
from sqlalchemy.orm import Session
from services.auth_service import REFRESH_TOKEN_EXPIRE_DAYS, create_refresh_token, get_user_by_username, authenticate_user, create_access_token, create_user, ACCESS_TOKEN_EXPIRE_MINUTES, get_db
from config import settings
from jose import JWTError, jwt
auth_router = APIRouter(prefix='/auth', tags=["auth"])


@auth_router.post('/register', response_model=dict)
def register_user(user: UserDTO, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db=db, user=user)



@auth_router.post('/token', response_model=Token)
def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException (
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token = create_access_token(data={"sub": user.username})
    refresh_token = create_refresh_token(data={"sub": user.username})
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
    )
    return {"access_token": access_token, "refresh_token": refresh_token, "username": user.username}



@auth_router.post("/refresh", response_model=Token)
async def refresh_access_token(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    
    if not refresh_token:
        raise HTTPException(
            status_code=401,
            detail="Refresh token missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
        
    try:
        payload = jwt.decode(
            refresh_token, settings.JWT_REFRESH.get_secret_value(), algorithms=[settings.JWT_ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid refresh token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = get_user_by_username(db, username=username)
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    new_access_token = create_access_token(data={"sub": user.username})
    new_refresh_token = create_refresh_token(data={"sub": user.username})
    
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
    )
    return {"access_token": new_access_token, "username": username}


@auth_router.post("/logout", response_model=dict)
async def logout(response: Response):
    response.delete_cookie(key="refresh_token")
    return {"message": "Logged out"}