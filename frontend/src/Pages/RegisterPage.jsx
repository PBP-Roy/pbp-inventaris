import { useState } from "react";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import { register, getUser } from "../api/userApi";
import { useStateContext } from "../contexts/ContextProvider";

function RegisterPage() {
  const { setUser } = useStateContext();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const NavigateTo = useNavigate();
  
  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  const validateInput = () => {
    if (payload.name === "" || payload.email === "" || payload.password === "" || payload.password_confirmation === "") {
      alert("Please fill in all fields");
      return false;
    }
    if (payload.password !== payload.password_confirmation) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInput()) {
      register(payload).then((res) => {
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
      <div className="background-signup">
        <div className="signup-container">
          <div className="signup-form">
            <img
              src="/src/assets/logo.jpg"
              alt="Logo"
              className="signup-logo"
            />
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={payload.name}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={payload.email}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={payload.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <label>
                Confirm password
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm your password"
                  value={payload.password_confirmation}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <button type="submit" className="signup-btn">
                Get Started
              </button>
              <p>
                Already have an account?{" "}
                <Link to={'/guest/login'} className="signin-link">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
