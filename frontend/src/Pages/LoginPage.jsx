import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, login } from '../api/userApi';
import { useStateContext } from '../contexts/ContextProvider';
import './LoginPage.css';

function LoginPage() {
    const { setUser } = useStateContext();
    const [payload, setPayload] = useState({
        email: "",
        password: ""
    });
    const NavigateTo = useNavigate();

    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value });
    }

    const validateInput = () => {
        if (payload.email === "" || payload.password === "") {
            alert("Please fill in all fields");
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateInput()) {
            login(payload).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                } else {
                    alert("An error occurred");
                }
            }).then(() => {
                getUser().then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        setUser({
                            id: res.data.id,
                            name: res.data.name,
                            email: res.data.email,
                            image: res.data.image
                        });
                        NavigateTo("/");
                    } else {
                        alert("An error occurred");
                    }
                })
            });
        }
    }

    return (
        <>
            <div className='background-login'>
                <div className="login-container">
                    <div className="login-form">
                        <img src="/src/assets/logo.jpg" alt="Logo" className="login-logo" />
                        <h1>Log in to your account</h1>
                        <p>Welcome back! Please enter your details.</p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Email
                                <input type="text" name="email" placeholder='Enter your email' value={payload.email} onChange={(e) => handleChange(e)} required />
                            </label>
                            <label>
                                Password
                                <input type="password" name="password" placeholder='Enter your password' value={payload.password} onChange={(e) => handleChange(e)} required />
                            </label>
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