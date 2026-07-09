import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Request Interceptor: Attach token if it's in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response Interceptor: Handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend says the token is invalid (401), log the user out
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optional: window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default API;
