import asyncio
import httpx
import sys
import random

# Helper to get auth header
async def get_token_header(client, email, password):
    response = await client.post(
        "/login/access_token", 
        data={"username": email, "password": password},
        headers={"content-type": "application/x-www-form-urlencoded"}
    )
    if response.status_code != 200:
        print(f"Login failed: {response.text}")
        return None
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

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
                "is_over_18": True,
                "receives_updates": True
            }
            r = await client.post("/users/", json=user_data)
            if r.status_code != 200:
                 print(f"User creation failed: {r.status_code} {r.text}")
                 return
            
            user_id = r.json()["id"]
            print(f"User Created: {email}, Name: {r.json()['full_name']}, Over 18: {r.json()['is_over_18']}, Updates: {r.json()['receives_updates']}")
            if r.json()['is_over_18'] != True:
                print("FAILURE: is_over_18 mismatch")
            if r.json()['receives_updates'] != True:
                print("FAILURE: receives_updates mismatch")
            
            # Authenticate
            print("Logging in...")
            auth_headers = await get_token_header(client, email, "password123")
            if not auth_headers:
                return
            print("Login successful.")

            # 3. Update User
            print("Updating User...")
            update_data = {"full_name": "Updated Name"}
            r = await client.put(f"/users/{user_id}", json=update_data, headers=auth_headers)
            if r.status_code == 200:
                print(f"User Updated: {r.json()['full_name']}")
            else:
                 print(f"User update failed: {r.status_code} {r.text}")

            # 4. Verify Update via Get
            r = await client.get(f"/users/{user_id}", headers=auth_headers)
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
            r = await client.post("/tickets/", json=ticket_data, headers=auth_headers)
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
                r = await client.post(f"/tickets/{ticket_id}/feedback", json=feedback_data, headers=auth_headers)
                if r.status_code == 200:
                    fb = r.json()
                    print(f"Feedback submitted: Satisfied={fb['is_satisfied']}, Reason='{fb['feedback_reason']}'")
                else:
                    print(f"Feedback failed: {r.status_code} {r.text}")
                
                # Update Status to RESOLVED
                print("Updating Status to Resolved...")
                update_payload = {"status": "Resolved"}
                r = await client.put(f"/tickets/{ticket_id}", json=update_payload, headers=auth_headers)
                if r.status_code == 200:
                     print(f"Status Updated: {r.json()['status']}")
                else:
                     print(f"Status Update Failed: {r.status_code} {r.text}")

                # Check Stats
                print("Checking Admin Stats...")
                r = await client.get("/admin/stats/", headers=auth_headers) # Trailing slash due to previous redirect discovery
                if r.status_code == 200:
                    print(f"Stats: {r.json()}")
                elif r.status_code == 307:
                     r = await client.get(r.headers['location'], headers=auth_headers)
                     print(f"Stats (followed redirect): {r.json()}")
                else:
                    print(f"Stats failed: {r.status_code}")

            # --------------------------------------

            # 5. Delete User
            print("Deleting User...")
            r = await client.delete(f"/users/{user_id}", headers=auth_headers)
            if r.status_code == 200:
                print("User Deleted.")
            else:
                print(f"User deletion failed: {r.status_code} {r.text}")

            # 6. Verify Deletion
            r = await client.get(f"/users/{user_id}", headers=auth_headers)
            if r.status_code == 404:
                print("SUCCESS: User 404 after delete.")
            else:
                print(f"FAILURE: User still exists or other error: {r.status_code}")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
