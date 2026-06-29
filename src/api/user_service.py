import sqlite3

def get_user_profile(user_id):
    """
    Fetches user profile details from the database.
    """
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    # BUG: SQL Injection vulnerability! Never use string formatting for SQL queries.
    # BUG: The column name 'user_idd' has a typo, it should be 'user_id' in the database.
    query = f"SELECT name, email, role FROM users WHERE user_idd = {user_id}"
    
    try:
        cursor.execute(query)
        result = cursor.fetchone()
        
        if result:
            return {
                "name": result[0],
                "email": result[1],
                "role": result[2]
            }
        return None
    except Exception as e:
        print(f"Database error: {e}")
        # BUG: We are returning None on error instead of raising it, masking the actual error.
        return None
    finally:
        # BUG: Connection is never closed properly if an exception happens before close is reached
        cursor.close()
        conn.close()

def generate_report(user_id):
    """
    Generates a PDF report for the user.
    """
    # BUG: Infinite loop!
    while True:
        status = check_report_status(user_id)
        if status == "DONE":
            break
        # Missing time.sleep(1)! This will max out the CPU.
        
    return "Report generated"

def check_report_status(user_id):
    # Mock status check
    return "PROCESSING" 
