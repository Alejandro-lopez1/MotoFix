import { createContext, useContext, useState, useCallback } from "react";
import { login as loginService, logout as logoutService, isAuthenticated } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("access_token");
    return token ? { authenticated: true } : null;
  });

  const login = useCallback(async (username, password) => {
    await loginService(username, password);
    setUser({ authenticated: true });
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setUser(null);
  }, []);

  const authenticated = isAuthenticated();

  return (
    <AuthContext.Provider value={{ user, login, logout, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
