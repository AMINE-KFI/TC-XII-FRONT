from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class TicketStatus(str, Enum):
    OPEN = "Open"
    IN_PROGRESS = "In Progress"
    RESOLVED = "Resolved"
    ESCALATED = "Escalated"

class TicketBase(BaseModel):
    subject: str
    description: str

class TicketCreate(TicketBase):
    customer_id: int
    ai_confidence_score: Optional[float] = 0.0

class TicketUpdate(BaseModel):
    subject: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TicketStatus] = None
    agent_id: Optional[int] = None
    ai_confidence_score: Optional[float] = None
    closed_at: Optional[datetime] = None

class TicketFeedback(BaseModel):
    is_satisfied: bool
    feedback_reason: Optional[str] = None

class Ticket(TicketBase):
    id: int
    status: TicketStatus
    ai_confidence_score: float
    is_satisfied: Optional[bool] = None
    feedback_reason: Optional[str] = None
    created_at: datetime
    closed_at: Optional[datetime] = None
    customer_id: int
    agent_id: Optional[int] = None

    class Config:
        from_attributes = True
