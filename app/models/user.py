from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, Integer, Enum
from app.models.base import Base
import enum

class UserRole(str, enum.Enum):
    CLIENT = "Client"
    AGENT = "Agent"
    ADMIN = "Admin"

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.CLIENT)
