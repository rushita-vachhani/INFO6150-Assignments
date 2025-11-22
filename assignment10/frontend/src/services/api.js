import axios from "axios";

const api = axios.create({
  // Append /api to the base URL from the environment variable
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;