import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField, Button, Typography, Box, Alert, CircularProgress,
} from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      if (!err.response) {
        setError("Error de conexión con el servidor. Verifique que el backend esté accesible.");
      } else if (err.response.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else if (err.response.status === 400) {
        setError("Solicitud inválida. Verifique los datos ingresados.");
      } else if (err.response.status >= 500) {
        setError("Error interno del servidor. Intente nuevamente.");
      } else {
        setError("Error inesperado. Intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700, textAlign: "center", fontSize: { xs: "1.35rem", sm: "1.5rem" } }}>
          MotoFix
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
          Gestión Operativa del Taller
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert>}
        <TextField
          label="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2.5 }}
          autoFocus
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 3.5 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ py: 1.5, minHeight: 48 }}
        >
          {loading ? <CircularProgress size={24} /> : "Ingresar"}
        </Button>
      </Box>
    </AuthLayout>
  );
}
