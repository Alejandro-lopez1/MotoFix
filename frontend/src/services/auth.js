import api from "./api";

export const login = async (username, password) => {
  const { data } = await api.post("/auth/login/", { username, password });
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  return data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getToken = () => localStorage.getItem("access_token");

export const isAuthenticated = () => !!getToken();
