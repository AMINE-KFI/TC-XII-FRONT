from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.schemas import ticket as ticket_schemas
from app.services import ticket_service
# from app.services import ai_service
from app.core.database import get_db

router = APIRouter()

@router.post("/", response_model=ticket_schemas.Ticket)
async def create_ticket(
    ticket: ticket_schemas.TicketCreate, 
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    print("DEBUG: Creating ticket...", flush=True)
    created_ticket = await ticket_service.create_ticket(db=db, ticket=ticket)
    print(f"DEBUG: Ticket created {created_ticket.id}. Scheduling AI...", flush=True)
    
    # Trigger AI processing in background
    # We pass only the ID so the background task manages its own lifecycle/session
    from app.services import ai_service
    background_tasks.add_task(ai_service.process_ticket_with_ai, ticket_id=created_ticket.id)
    print("DEBUG: AI Scheduled.", flush=True)
    # await ai_service.process_ticket_with_ai(ticket_id=created_ticket.id) # SYNC RUN
    # print("DEBUG: AI Finished Sync.", flush=True)
    
    return created_ticket

@router.get("/", response_model=List[ticket_schemas.Ticket])
async def read_tickets(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await ticket_service.get_tickets(db, skip=skip, limit=limit)

@router.get("/{ticket_id}", response_model=ticket_schemas.Ticket)
async def read_ticket(ticket_id: int, db: AsyncSession = Depends(get_db)):
    db_ticket = await ticket_service.get_ticket(db, ticket_id=ticket_id)
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket
