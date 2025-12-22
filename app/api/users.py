from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.api import users
from app.schemas import user as user_schemas
from app.services import user_service
from app.core.database import get_db

router = APIRouter()

@router.post("/", response_model=user_schemas.User)
async def create_user(user: user_schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await user_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await user_service.create_user(db=db, user=user)

@router.get("/", response_model=List[user_schemas.User])
async def read_users(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    users = await user_service.get_users(db, skip=skip, limit=limit)
    return users
