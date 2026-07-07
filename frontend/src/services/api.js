import axios from "axios";

const api = axios.create({
  baseURL: "https://motofix-backend-iwky.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  paramsSerializer: { indexes: null },
});

function cleanParams(params) {
  if (!params || typeof params !== "object" || Array.isArray(params)) return params;
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
}

api.interceptors.request.use((config) => {
  config.params = cleanParams(config.params);
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) throw new Error("No refresh token");
        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh/`,
          { refresh }
        );
        localStorage.setItem("access_token", data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
