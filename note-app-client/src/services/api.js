import axios from "axios";

const api = axios.create({
  baseURL: "https://notes-backend-7je9.onrender.com/api",  // ✅ MUST include /api
  withCredentials: true,
});

export default api;
