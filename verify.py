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
            email = f"user_{rnd}@doxa.com"
            user_data = {
                "email": email, 
                "password": "password123", 
                "role": "Client",
                "full_name": "Original Name",
                "is_over_18": True
            }
            r = await client.post("/users/", json=user_data)
            if r.status_code != 200:
                 print(f"User creation failed: {r.status_code} {r.text}")
                 return
            
            user_id = r.json()["id"]
            print(f"User Created: {email}, Name: {r.json()['full_name']}, Over 18: {r.json()['is_over_18']}")
            if r.json()['is_over_18'] != True:
                print("FAILURE: is_over_18 mismatch")
            
            # 3. Update User
            print("Updating User...")
            update_data = {"full_name": "Updated Name"}
            r = await client.put(f"/users/{user_id}", json=update_data)
            if r.status_code == 200:
                print(f"User Updated: {r.json()['full_name']}")
            else:
                 print(f"User update failed: {r.status_code} {r.text}")

            # 4. Verify Update via Get
            r = await client.get(f"/users/{user_id}")
            if r.json()['full_name'] == "Updated Name":
                print("SUCCESS: User name verification passed.")
            else:
                print("FAILURE: User name not updated.")

            # --- Ticket & Feedback Verification ---
            print("Creating Ticket...")
            ticket_data = {
                "subject": "Feedback Test", 
                "description": "Testing is_satisfied", 
                "customer_id": user_id
            }
            r = await client.post("/tickets/", json=ticket_data)
            if r.status_code != 200:
                print(f"Ticket creation failed: {r.status_code} {r.text}")
            else:
                ticket_id = r.json()["id"]
                print(f"Ticket Created: ID {ticket_id}")

                print("Waiting for AI processing (3.5 seconds)...")
                await asyncio.sleep(3.5)

                # Submit Refactored Feedback
                print("Submitting Feedback...")
                feedback_data = {"is_satisfied": True, "feedback_reason": "Great service!"}
                r = await client.post(f"/tickets/{ticket_id}/feedback", json=feedback_data)
                if r.status_code == 200:
                    fb = r.json()
                    print(f"Feedback submitted: Satisfied={fb['is_satisfied']}, Reason='{fb['feedback_reason']}'")
                else:
                    print(f"Feedback failed: {r.status_code} {r.text}")
                
                # Check Stats
                print("Checking Admin Stats...")
                r = await client.get("/admin/stats/") # Trailing slash due to previous redirect discovery
                if r.status_code == 200:
                    print(f"Stats: {r.json()}")
                elif r.status_code == 307:
                     r = await client.get(r.headers['location'])
                     print(f"Stats (followed redirect): {r.json()}")
                else:
                    print(f"Stats failed: {r.status_code}")

            # --------------------------------------

            # 5. Delete User
            print("Deleting User...")
            r = await client.delete(f"/users/{user_id}")
            if r.status_code == 200:
                print("User Deleted.")
            else:
                print(f"User deletion failed: {r.status_code} {r.text}")

            # 6. Verify Deletion
            r = await client.get(f"/users/{user_id}")
            if r.status_code == 404:
                print("SUCCESS: User 404 after delete.")
            else:
                print(f"FAILURE: User still exists or other error: {r.status_code}")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
