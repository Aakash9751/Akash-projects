# Sample Project for Jira Agent Testing

This is a mock project created to test the integration of AI tools (like Egonex AI or our custom Jira Agent) with a codebase.

## Folder Structure
- `src/components/Login.jsx`: A React component for the login page. Contains a simulated issue where the login fails.
- `src/auth_service.py`: A mock Python backend service for authentication. Contains a deliberate bug that causes a database timeout for certain email addresses.

## How to use this for testing
1. Push this repository to GitHub.
2. Create a Jira ticket (e.g., "Login page is crashing when users try to login").
3. Connect your Jira Agent / AI tool to this GitHub repository.
4. Ask the agent: "Where is the issue related to the Login page crash?"
5. The agent should be able to scan these files and point you to `Login.jsx` and `auth_service.py`.
