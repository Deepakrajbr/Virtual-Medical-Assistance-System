import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});
export const fetchUserHistory = async (userId, token) => {
  // token optional: pass Authorization header if needed
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await API.get(`/users/${userId}/history`, { headers });
  return res.data;
};

export const getUserAppointments = async (token) => {
  const res = await fetch("http://localhost:5000/api/appointments/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export default API;
