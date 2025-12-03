import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000
});

// Interceptor untuk menambahkan token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.__ACCESS_TOKEN__; // in-memory global (sementara)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response untuk menangani error global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
