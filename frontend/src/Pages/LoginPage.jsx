import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    return (
        <>
            <div className='background-login'>
                <div className="login-container">
                    <div className="login-form">
                        <img src="/src/assets/logo.jpg" alt="Logo" className="login-logo" />
                        <h1>Log in to your account</h1>
                        <p>Welcome back! Please enter your details.</p>
                        <form>
                            <label>
                                Email
                                <input type="text" name="email" placeholder='Enter your email' required />
                            </label>
                            <label>
                                Password
                                <input type="password" name="password" placeholder='Enter your password' required />
                            </label>
                            <div className="login-options">
                                {/* <label>
                                    <input type="checkbox" /> Remember for 30 days
                                </label> */}
                                <a href="" className="forgot-password">Forgot password</a>
                            </div>
                            <button type="submit" className="login-btn">Sign in</button>
                            <p>Don't have an account? <Link to="/guest/register" className="signup-link">Sign up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;