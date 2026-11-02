from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "MyOutFit API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "production-secret-key-change-in-production"
    SUPABASE_URL: str = "https://mock.supabase.co"
    SUPABASE_KEY: str = "mock-key"
    SUPABASE_SERVICE_ROLE_KEY: Optional[str] = None
    SUPABASE_JWT_SECRET: Optional[str] = "super-secret-jwt-key-min-32-chars-long"
    RATE_LIMIT_PER_MINUTE: int = 120
    ENVIRONMENT: str = "development"
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000", "*"]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
