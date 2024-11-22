import { useState } from "react";
import "./RegisterPage.css";

function RegisterPage() {
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
            <p>Start your 30-day free trial</p>
            <form>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </label>
              <label>
                Confirm password
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  required
                />
              </label>
              <button type="submit" className="signup-btn">
                Get Started
              </button>
              <p>
                Already have an account?{" "}
                <a href="" className="signin-link">
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
