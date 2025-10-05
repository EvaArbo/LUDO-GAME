import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000",
  withCredentials: true, // ensures cookies/JWT tokens are sent
  headers: { "Content-Type": "application/json" },
});

// ✅ Token validation helper
export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Basic JWT structure check (header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    // Decode payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp > currentTime;
  } catch (error) {
    console.warn("Invalid token format:", error);
    return false;
  }
};

// ✅ Attach JWT token automatically to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid()) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token && !isTokenValid()) {
      // Token exists but is invalid - clear it
      console.warn("Invalid token detected - clearing");
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Enhanced response interceptor for errors and token handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      console.error("Network error:", err.message);
      return Promise.reject(err);
    }

    const { status, data } = err.response;

    if (status === 401) {
      // Token expired or invalid - clear storage and redirect
      console.warn("Authentication failed - clearing token and redirecting to login");
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    } else if (status === 403) {
      console.error("Forbidden - insufficient permissions");
    } else if (status >= 500) {
      console.error("Server error:", status, data);
    } else {
      console.error("API error:", status, data);
    }

    return Promise.reject(err);
  }
);

// --------------------------
// Authentication endpoints
// --------------------------
export const registerUser = (data) => api.post("/auth/register", data);

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  if (res.data.access_token) localStorage.setItem("token", res.data.access_token);
  return res.data;
};

export const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    return res.data;
  } catch (err) {
    // Don't throw error for logout failures, just clear local storage
    if (err.response?.status !== 404) {
      console.warn("Logout API call failed:", err.message);
    }
    // Always clear local storage on logout attempt
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  }
};


export const getCurrentUser = () => api.get("/auth/user").then((res) => res.data);

export const updateUser = (data) => api.put("/auth/user", data).then((res) => res.data);

export const deleteUser = () =>
  api.delete("/auth/user").then((res) => {
    localStorage.removeItem("token");
    return res.data;
  });

export const forgotPassword = (identifier) =>
  api.post("/auth/forgot-password", { identifier }).then((res) => res.data);

// --------------------------
// Game endpoints
// --------------------------

// Start a completely NEW game
export const startGame = () => api.post("/game/new");

// Resume the last unfinished game
export const resumeGame = () => api.get("/game/resume");

// Get existing game by ID
export const getGame = (gameId) => api.get(`/game/${gameId}`);

// Update game state
export const updateGame = (gameId, state) => api.put(`/game/${gameId}`, { state });

// Delete game
export const deleteGame = (gameId) => api.delete(`/game/${gameId}`);

export default api;