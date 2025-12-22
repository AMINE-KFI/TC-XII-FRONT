import bcrypt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plain password against the hashed version.
    """
    # bcrypt requires bytes, so we encode the strings
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_byte_enc = hashed_password.encode('utf-8')
    
    # checkpw securely checks the password
    return bcrypt.checkpw(password_byte_enc, hashed_password_byte_enc)

def get_password_hash(password: str) -> str:
    """
    Hashes a password using bcrypt with a salt.
    """
    pwd_bytes = password.encode('utf-8')
    
    # gensalt(rounds=12) generates a salt and configures the work factor.
    # rounds=12 is standard; increase to 14+ for higher security (slower).
    salt = bcrypt.gensalt(rounds=12)
    
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    
    # Return as string to be compatible with your database model
    return hashed.decode('utf-8')