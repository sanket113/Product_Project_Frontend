import axios from "axios";

/**
 * Configured axios instance for API calls to the backend.
 * Automatically adds JWT token to requests (except auth endpoints) and sets base URL.
 */
const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    //  Skip token for auth endpoints
    if (!config.url.startsWith("/auth")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
