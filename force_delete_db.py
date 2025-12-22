import os
import time

db_file = "doxa_support_v1.db"
if os.path.exists(db_file):
    try:
        os.remove(db_file)
        print(f"Deleted {db_file}")
    except PermissionError:
        print(f"Could not delete {db_file}, it is locked.")
else:
    print(f"{db_file} not found.")
