import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

// Fetch profile
export const getProfile = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Update profile
export const updateProfile = (data) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/me`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
