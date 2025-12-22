import random
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.ticket import Ticket, TicketStatus
from app.services import ticket_service
from app.core.database import SessionLocal

async def process_ticket_with_ai(ticket_id: int):
    """
    Background task to process ticket with AI agent pipeline.
    Manages its own DB session.
    """
    try:
        with open("ai_log.txt", "a") as f:
            f.write(f"Processing ticket {ticket_id}\n")
        async with SessionLocal() as db:
            print(f"AI Agent: Processing ticket {ticket_id}...", flush=True)
            ticket = await ticket_service.get_ticket(db, ticket_id)
            if not ticket:
                print("AI Agent: Ticket not found.", flush=True)
                return

            # --- Pipeline Steps ---

            # 1. Query Analyzer
            print("AI Agent: Analyzing query...", flush=True)
            await asyncio.sleep(1) # Simulate processing time

            # 2. Solution Finder
            print("AI Agent: Finding solutions...", flush=True)
            await asyncio.sleep(1) # Simulate processing time

            # 3. Evaluator
            confidence_score = random.uniform(0.4, 0.95)
            print(f"AI Agent: Evaluated confidence score: {confidence_score:.2f}", flush=True)

            # Update Ticket
            ticket.ai_confidence_score = confidence_score
            
            if confidence_score < 0.60:
                print("AI Agent: Low confidence. Escalating ticket.", flush=True)
                ticket.status = TicketStatus.ESCALATED
            else:
                print("AI Agent: High confidence. Suggesting response (TODO).", flush=True)
            
            db.add(ticket)
            await db.commit()
            await db.refresh(ticket)
            print(f"AI Agent: Finished processing ticket {ticket_id}. Status: {ticket.status.value}, Score: {ticket.ai_confidence_score}", flush=True)
            with open("ai_log.txt", "a") as f:
                f.write(f"Finished ticket {ticket_id} with score {ticket.ai_confidence_score}\n")
    except Exception as e:
        with open("ai_log.txt", "a") as f:
            f.write(f"ERROR: {e}\n")
        print(f"AI Agent ERROR: {e}", flush=True)
        import traceback
        traceback.print_exc()
