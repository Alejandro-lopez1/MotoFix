import { Box, Paper } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: "100%" }} elevation={3}>
        {children}
      </Paper>
    </Box>
  );
}
