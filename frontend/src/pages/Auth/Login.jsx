import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authServices";
import "../Style/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });

      // Login successful if response includes token
      if (response.data.token) {
        // Save token and user info
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login successful");

        // Navigate based on role
        const role = response.data.user.role;
        if (role === "ADMIN" || role === "PHARMACIST") {
          navigate("/Admin/Dashboard");
        } else {
          navigate("/User/Dashboard"); 
        }
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="link-text" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
