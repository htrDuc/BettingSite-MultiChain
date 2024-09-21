import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      localStorage.removeItem("token");

      window.location.href = "/signin";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
