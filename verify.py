import asyncio
import httpx
import sys
import random

async def main():
    async with httpx.AsyncClient(base_url="http://127.0.0.1:8000", timeout=10.0) as client:
        try:
            # 1. Health check
            print("Checking Root...")
            r = await client.get("/")
            print(f"Root: {r.status_code}")

            # 2. Create User
            print("Creating User...")
            rnd = random.randint(1000,9999)
            user_data = {"email": f"ai_verify_{rnd}@doxa.com", "password": "password123", "role": "Client"}
            r = await client.post("/users/", json=user_data)
            if r.status_code != 200:
                 print(f"User creation failed: {r.status_code} {r.text}")
                 return
            
            user_id = r.json()["id"]
                
            # 3. Create Ticket (Trigger AI)
            print("Creating Ticket (Triggering AI)...")
            ticket_data = {
                "subject": "AI Test Ticket", 
                "description": "Testing background processing", 
                "customer_id": user_id
            }
            r = await client.post("/tickets/", json=ticket_data)
            if r.status_code != 200:
                print(f"Ticket creation failed: {r.status_code} {r.text}")
                return
            
            ticket_id = r.json()["id"]
            print(f"Ticket Created: ID {ticket_id}")

            print("Waiting for AI processing (3.5 seconds)...")
            await asyncio.sleep(3.5)

            # 4. Check Ticket for AI updates
            print("Checking Ticket Status...")
            r = await client.get(f"/tickets/{ticket_id}")
            if r.status_code != 200:
                print(f"Failed to get ticket: {r.status_code} {r.text}")
                return
            t = r.json()
            print(f"Ticket Status: {t['status']}")
            print(f"AI Confidence: {t['ai_confidence_score']}")
            
            if t['ai_confidence_score'] > 0:
                print("SUCCESS: AI Confidence score updated!")
            else:
                print("FAILURE: AI Confidence score not updated.")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
