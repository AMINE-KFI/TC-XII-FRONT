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

class Ticket(TicketBase):
    id: int
    status: TicketStatus
    ai_confidence_score: float
    created_at: datetime
    customer_id: int
    agent_id: Optional[int] = None

    class Config:
        from_attributes = True
