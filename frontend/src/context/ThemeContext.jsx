import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { designTokens } from "../theme";

const ThemeContext = createContext(null);

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () => {
      // Dark theme (primary mode)
      if (mode === "dark") {
        return createTheme({
          palette: {
            mode: "dark",
            primary: {
              main: designTokens.colors.primary.main,
              light: designTokens.colors.primary.light,
              dark: designTokens.colors.primary.dark,
            },
            secondary: {
              main: designTokens.colors.secondary.main,
              light: designTokens.colors.secondary.light,
              dark: designTokens.colors.secondary.dark,
            },
            success: {
              main: designTokens.colors.success.main,
              light: designTokens.colors.success.light,
              dark: designTokens.colors.success.dark,
            },
            warning: {
              main: designTokens.colors.warning.main,
              light: designTokens.colors.warning.light,
              dark: designTokens.colors.warning.dark,
            },
            error: {
              main: designTokens.colors.error.main,
              light: designTokens.colors.error.light,
              dark: designTokens.colors.error.dark,
            },
            info: {
              main: designTokens.colors.info.main,
              light: designTokens.colors.info.light,
              dark: designTokens.colors.info.dark,
            },
            background: {
              default: designTokens.colors.background.default,
              paper: designTokens.colors.background.paper,
            },
            text: {
              primary: designTokens.colors.text.primary,
              secondary: designTokens.colors.text.secondary,
              disabled: designTokens.colors.text.disabled,
            },
            divider: designTokens.colors.gray[600],
          },
          typography: {
            fontFamily: designTokens.typography.fontFamily,
            h1: {
              fontSize: designTokens.typography.sizes.h1,
              fontWeight: designTokens.typography.weights.bold,
              lineHeight: designTokens.typography.lineHeights.h1,
            },
            h2: {
              fontSize: designTokens.typography.sizes.h2,
              fontWeight: designTokens.typography.weights.semibold,
              lineHeight: designTokens.typography.lineHeights.h2,
            },
            h3: {
              fontSize: designTokens.typography.sizes.h3,
              fontWeight: designTokens.typography.weights.semibold,
              lineHeight: designTokens.typography.lineHeights.h3,
            },
            h4: {
              fontSize: designTokens.typography.sizes.h4,
              fontWeight: designTokens.typography.weights.semibold,
              lineHeight: designTokens.typography.lineHeights.h4,
            },
            h5: {
              fontSize: designTokens.typography.sizes.body,
              fontWeight: designTokens.typography.weights.semibold,
              lineHeight: designTokens.typography.lineHeights.body,
            },
            h6: {
              fontSize: designTokens.typography.sizes.bodySmall,
              fontWeight: designTokens.typography.weights.semibold,
              lineHeight: designTokens.typography.lineHeights.bodySmall,
            },
            body1: {
              fontSize: designTokens.typography.sizes.bodyLarge,
              fontWeight: designTokens.typography.weights.regular,
              lineHeight: designTokens.typography.lineHeights.bodyLarge,
            },
            body2: {
              fontSize: designTokens.typography.sizes.body,
              fontWeight: designTokens.typography.weights.regular,
              lineHeight: designTokens.typography.lineHeights.body,
            },
            caption: {
              fontSize: designTokens.typography.sizes.caption,
              fontWeight: designTokens.typography.weights.regular,
              lineHeight: designTokens.typography.lineHeights.caption,
            },
            button: {
              fontSize: designTokens.typography.sizes.button,
              fontWeight: designTokens.typography.weights.medium,
              lineHeight: designTokens.typography.lineHeights.button,
              textTransform: "none",
            },
          },
          shape: {
            borderRadius: parseInt(designTokens.borderRadius.lg),
          },
          components: {
            // Button overrides
            MuiButton: {
              styleOverrides: {
                root: {
                  borderRadius: designTokens.borderRadius.lg,
                  padding: `${designTokens.spacing.sm} ${designTokens.spacing.lg}`,
                  textTransform: "none",
                  fontWeight: designTokens.typography.weights.medium,
                  transition: `all ${designTokens.transitions.normal}`,
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                },
                containedPrimary: {
                  backgroundColor: designTokens.colors.primary.main,
                  color: designTokens.colors.gray[900],
                  "&:hover": {
                    backgroundColor: designTokens.colors.primary.light,
                  },
                  "&:active": {
                    backgroundColor: designTokens.colors.primary.dark,
                  },
                },
                containedSecondary: {
                  backgroundColor: designTokens.colors.secondary.main,
                  "&:hover": {
                    backgroundColor: designTokens.colors.secondary.light,
                  },
                  "&:active": {
                    backgroundColor: designTokens.colors.secondary.dark,
                  },
                },
                outlined: {
                  borderColor: designTokens.colors.primary.main,
                  color: designTokens.colors.primary.main,
                  "&:hover": {
                    borderColor: designTokens.colors.primary.light,
                    backgroundColor: "rgba(0, 217, 255, 0.05)",
                  },
                },
              },
            },

            // TextField overrides
            MuiTextField: {
              defaultProps: {
                size: "small",
                fullWidth: true,
              },
              styleOverrides: {
                root: {
                  "& .MuiInputBase-root": {
                    backgroundColor: designTokens.colors.background.paper,
                    borderRadius: designTokens.borderRadius.sm,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: designTokens.colors.gray[600],
                    },
                    "&:hover fieldset": {
                      borderColor: designTokens.colors.gray[500],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: designTokens.colors.primary.main,
                      boxShadow: `0 0 0 3px ${designTokens.colors.primary.lighter}`,
                    },
                  },
                },
              },
            },

            // Select overrides
            MuiSelect: {
              styleOverrides: {
                outlined: {
                  "&.MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: designTokens.colors.gray[600],
                    },
                    "&:hover fieldset": {
                      borderColor: designTokens.colors.gray[500],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: designTokens.colors.primary.main,
                    },
                  },
                },
              },
            },

            // Paper (cards, dialogs) overrides
            MuiPaper: {
              styleOverrides: {
                root: {
                  backgroundColor: designTokens.colors.background.paper,
                  backgroundImage: "none",
                  borderRadius: designTokens.borderRadius.lg,
                },
                elevation0: {
                  backgroundColor: designTokens.colors.background.paper,
                },
                elevation1: {
                  backgroundColor: designTokens.colors.background.elevated,
                },
              },
            },

            // Card overrides
            MuiCard: {
              styleOverrides: {
                root: {
                  backgroundColor: designTokens.colors.background.elevated,
                  border: `1px solid ${designTokens.colors.gray[600]}`,
                  borderRadius: designTokens.borderRadius.lg,
                  boxShadow: designTokens.shadows.md,
                  transition: `all ${designTokens.transitions.normal}`,
                  "&:hover": {
                    backgroundColor: designTokens.colors.gray[700],
                    boxShadow: `${designTokens.shadows.lg}, ${designTokens.shadows.cyan}`,
                    transform: "translateY(-2px)",
                  },
                },
              },
            },

            // Table overrides
            MuiTable: {
              styleOverrides: {
                root: {
                  backgroundColor: designTokens.colors.background.paper,
                },
              },
            },

            MuiTableHead: {
              styleOverrides: {
                root: {
                  backgroundColor: designTokens.colors.background.elevated,
                  "& .MuiTableCell-head": {
                    borderColor: designTokens.colors.gray[600],
                    color: designTokens.colors.text.secondary,
                    fontWeight: designTokens.typography.weights.semibold,
                    fontSize: designTokens.typography.sizes.bodySmall,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  },
                },
              },
            },

            MuiTableCell: {
              styleOverrides: {
                root: {
                  borderColor: designTokens.colors.gray[600],
                  padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
                },
              },
            },

            MuiTableRow: {
              styleOverrides: {
                root: {
                  "&:hover": {
                    backgroundColor: designTokens.colors.background.elevated,
                  },
                },
              },
            },

            // Dialog overrides
            MuiDialog: {
              styleOverrides: {
                paper: {
                  backgroundColor: designTokens.colors.background.paper,
                  borderRadius: designTokens.borderRadius.lg,
                },
              },
            },

            // AppBar overrides
            MuiAppBar: {
              styleOverrides: {
                root: {
                  backgroundColor: designTokens.colors.background.paper,
                  borderBottom: `1px solid ${designTokens.colors.gray[600]}`,
                  boxShadow: "none",
                },
              },
            },

            // Chip overrides
            MuiChip: {
              styleOverrides: {
                root: {
                  borderRadius: "16px",
                  backgroundColor: designTokens.colors.background.elevated,
                  border: `1px solid ${designTokens.colors.gray[600]}`,
                },
              },
            },

            // CssBaseline
            CssBaseline: {
              styleOverrides: {
                body: {
                  backgroundColor: designTokens.colors.background.default,
                  color: designTokens.colors.text.primary,
                },
              },
            },
          },
        });
      }

      // Light theme (fallback, not yet fully designed)
      return createTheme({
        palette: {
          mode: "light",
          primary: { main: "#00D9FF" },
          secondary: { main: "#FF6B9D" },
        },
        typography: {
          fontFamily: designTokens.typography.fontFamily,
        },
      });
    },
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
