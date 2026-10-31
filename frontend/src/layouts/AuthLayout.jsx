import { Box, Paper } from "@mui/material";
import { designTokens } from "../theme";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: designTokens.spacing.lg,
        backgroundColor: designTokens.colors.background.default,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 80%, rgba(255, 107, 157, 0.05) 0%, transparent 50%)`,
      }}
    >
      <Paper
        sx={{
          p: { xs: designTokens.spacing.xl, sm: designTokens.spacing["2xl"] },
          maxWidth: 400,
          width: "100%",
          backgroundColor: designTokens.colors.background.paper,
          border: `1px solid ${designTokens.colors.gray[600]}`,
          borderRadius: designTokens.borderRadius.lg,
          boxShadow: designTokens.shadows.lg,
        }}
        elevation={0}
      >
        {children}
      </Paper>
    </Box>
  );
}
