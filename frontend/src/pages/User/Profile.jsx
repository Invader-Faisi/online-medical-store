import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "../Style/UProfile.css";
import { getProfile, updateProfile } from "../../services/userServices";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      jwtDecode(token); 
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser({ ...response.data, password: "" });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(user);
      alert(response.data.message);
      setUser({ ...user, password: "" }); // clear password field
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter new password to change"
          />
        </label>

        <button type="submit" className="btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
}
