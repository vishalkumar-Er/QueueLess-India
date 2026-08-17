import axios from "axios";

const API = axios.create({
  baseURL: "https://queueless-india-backend-do3b.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add JWT Token in every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;