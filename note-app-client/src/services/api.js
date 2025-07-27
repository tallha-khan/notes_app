import axios from "axios";

const api = axios.create({
  baseURL: "https://notes-backend-7je9.onrender.com/api", // hardcoded for now
  withCredentials: true,
});


export default api;
