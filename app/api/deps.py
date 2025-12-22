from fastapi import Header, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services import user_service

async def get_current_user(
    x_user_email: str = Header(..., description="Simulated Auth: Pass User Email"),
    db: AsyncSession = Depends(get_db)
):
    """
    Simulates authentication by looking up user by email from header.
    In production, this would parse a JWT token.
    """
    user = await user_service.get_user_by_email(db, x_user_email)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
