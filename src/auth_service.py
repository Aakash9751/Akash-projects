def authenticate_user(email, password):
    """
    Mock Authentication Service
    """
    # BUG: There is a logic error here. It always returns False for a specific domain
    # or the database connection is failing.
    
    if not email or not password:
        return {"success": False, "message": "Email and password are required"}
        
    if "@test.com" in email:
        # Deliberate bug: Failing all test.com emails without proper error message
        raise Exception("Database connection timeout")
        
    if email == "admin@merfantz.in" and password == "admin123":
        return {"success": True, "token": "xyz_123_abc_token"}
        
    return {"success": False, "message": "Invalid credentials"}
