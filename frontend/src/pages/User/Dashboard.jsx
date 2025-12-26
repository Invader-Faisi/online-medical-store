import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {jwtDecode } from "jwt-decode";
import "../Style/UDashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode (token);
      setUserName(decoded.name); 
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Online Medicos</h2>
          <p>Welcome, {userName}</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="profile" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Profile
          </NavLink>
          <NavLink to="medicines" className="nav-link">
            Browse Medicines
          </NavLink>
          <NavLink to="prescriptions" className="nav-link">
            Upload Prescription
          </NavLink>
          <NavLink to="cart" className="nav-link">
            Cart
          </NavLink>
          <NavLink to="orders" className="nav-link">
            Orders
          </NavLink>
        </nav>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
