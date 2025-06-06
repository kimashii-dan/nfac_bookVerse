from pydantic_settings import BaseSettings
from pydantic import SecretStr

class Settings(BaseSettings):
    GOOGLE_API_KEY: SecretStr
    GEMINI_API_KEY: SecretStr
    GOOGLE_API_URL: str
    JWT_SECRET: SecretStr
    JWT_REFRESH: SecretStr
    JWT_ALGORITHM: str
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()