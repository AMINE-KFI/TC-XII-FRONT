from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate

async def create_ticket(db: AsyncSession, ticket: TicketCreate):
    db_ticket = Ticket(**ticket.model_dump())
    db.add(db_ticket)
    await db.commit()
    await db.refresh(db_ticket)
    return db_ticket

async def get_tickets(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(Ticket).offset(skip).limit(limit))
    return result.scalars().all()

async def get_ticket(db: AsyncSession, ticket_id: int):
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    return result.scalars().first()
