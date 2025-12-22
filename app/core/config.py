from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Doxa Customer Support"
    DATABASE_URL: str = "sqlite+aiosqlite:///./doxa_support_v2.db"
    API_V1_STR: str = "/api/v1"

    class Config:
        env_file = ".env"

settings = Settings()
