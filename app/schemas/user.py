from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    CLIENT = "Client"
    AGENT = "Agent"
    ADMIN = "Admin"

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[UserRole] = UserRole.CLIENT

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    role: Optional[UserRole] = None

class User(UserBase):
    id: int
    is_active: bool
    role: UserRole

    class Config:
        from_attributes = True
