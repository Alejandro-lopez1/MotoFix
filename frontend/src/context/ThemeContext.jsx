import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeContext = createContext(null);

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#dc004e" },
          ...(mode === "dark"
            ? { background: { default: "#121212", paper: "#1e1e1e" } }
            : {}),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: { fontWeight: 700 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { textTransform: "none", fontWeight: 600, minHeight: 44 },
            },
          },
          MuiTextField: {
            defaultProps: { size: "small", fullWidth: true },
          },
          MuiCard: {
            styleOverrides: {
              root: { borderRadius: 12 },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
