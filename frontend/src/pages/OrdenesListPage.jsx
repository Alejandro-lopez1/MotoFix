import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, TextField, InputAdornment,
  List, ListItemButton, ListItemText, Chip, Card, CardContent,
  CircularProgress, Alert, Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useOrdenes } from "../hooks/useOrdenes";

const ESTADO_COLORS = {
  "Recibida": "default",
  "En diagnóstico": "info",
  "En reparación": "warning",
  "Esperando repuesto": "error",
  "Lista para entregar": "success",
  "Entregada": "default",
};

export default function OrdenesListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useOrdenes({ search, activas: true });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Órdenes de Trabajo</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/ordenes/nueva")}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          Nuevo Trabajo
        </Button>
      </Box>

      <TextField
        placeholder="Buscar por dominio, cliente o N° de OT..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start"><SearchIcon /></InputAdornment>
            ),
          },
        }}
      />

      {isLoading && <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Error al cargar órdenes</Alert>}

      {data?.results?.length === 0 && !isLoading && (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              No hay órdenes de trabajo activas
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/ordenes/nueva")}>
              Crear Primer Trabajo
            </Button>
          </CardContent>
        </Card>
      )}

      <List>
        {data?.results?.map((ot) => (
          <ListItemButton
            key={ot.id}
            onClick={() => navigate(`/ordenes/${ot.id}`)}
            sx={{ borderRadius: 2, mb: 1, bgcolor: "background.paper" }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    #{ot.id} - {ot.dominio}
                  </Typography>
                  <Chip label={ot.estado} size="small" color={ESTADO_COLORS[ot.estado] || "default"} />
                  {ot.saldo_pendiente > 0 && (
                    <Chip label={`$${ot.saldo_pendiente}`} size="small" color="warning" variant="outlined" />
                  )}
                </Box>
              }
              secondary={
                <>
                  {ot.nombre_cliente} - {ot.marca_moto} {ot.modelo}
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(ot.fecha_creacion).toLocaleDateString()}
                  </Typography>
                </>
              }
            />
          </ListItemButton>
        ))}
      </List>

      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16, display: { sm: "none" } }}
        onClick={() => navigate("/ordenes/nueva")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
