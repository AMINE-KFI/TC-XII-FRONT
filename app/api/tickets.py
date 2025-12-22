from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Header
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.schemas import ticket as ticket_schemas
from app.services import ticket_service
from app.core.database import get_db
from app.models.user import User
from app.api.deps import get_current_user

router = APIRouter()

# 1. Specific string paths first
@router.get("/me", response_model=List[ticket_schemas.Ticket])
async def read_my_tickets(
    skip: int = 0, 
    limit: int = 100, 
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get tickets for the authenticated user.
    """
    return await ticket_service.get_tickets_by_user(db, user_id=current_user.id, skip=skip, limit=limit)

@router.get("/escalated", response_model=List[ticket_schemas.Ticket])
async def read_escalated_tickets(
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    """
    Get escalated tickets for agents.
    """
    from app.models.ticket import TicketStatus
    return await ticket_service.get_tickets_by_status(db, status=TicketStatus.ESCALATED, skip=skip, limit=limit)

# 2. General collections
@router.get("/", response_model=List[ticket_schemas.Ticket])
async def read_tickets(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await ticket_service.get_tickets(db, skip=skip, limit=limit)

@router.post("/", response_model=ticket_schemas.Ticket)
async def create_ticket(
    ticket: ticket_schemas.TicketCreate, 
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    print("DEBUG: Creating ticket...", flush=True)
    created_ticket = await ticket_service.create_ticket(db=db, ticket=ticket)
    # Trigger AI processing in background
    from app.services import ai_service
    background_tasks.add_task(ai_service.process_ticket_with_ai, ticket_id=created_ticket.id)
    return created_ticket

# 3. Path parameters (ID)
@router.get("/{ticket_id}", response_model=ticket_schemas.Ticket)
async def read_ticket(ticket_id: int, db: AsyncSession = Depends(get_db)):
    db_ticket = await ticket_service.get_ticket(db, ticket_id=ticket_id)
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket

@router.post("/{ticket_id}/feedback", response_model=ticket_schemas.Ticket)
async def submit_feedback(
    ticket_id: int, 
    feedback: ticket_schemas.TicketFeedback,
    db: AsyncSession = Depends(get_db)
):
    updated_ticket = await ticket_service.update_ticket_feedback(db, ticket_id, feedback.satisfaction_score)
    if not updated_ticket:
         raise HTTPException(status_code=404, detail="Ticket not found")
    return updated_ticket
