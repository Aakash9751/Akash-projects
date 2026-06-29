import React, { useState } from 'react';
import { loginUser } from '../auth_service';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // BUG: The login button is not working properly because we are passing wrong parameters 
        // to the auth service. Or maybe it's not handling the error correctly.
        try {
            const response = await loginUser(email, password);
            if (response.success) {
                console.log("Logged in successfully!");
                // Redirect to dashboard
            } else {
                // This error message might not be displaying properly
                setError(response.message);
            }
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Egonex System</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                
                {/* BUG: The button type might be an issue or missing onClick in some frameworks, 
                    but here it's part of a form. Let's pretend the issue is in the backend response. */}
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
}

export default Login;
