import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, TextField, InputAdornment,
  Card, CardContent, Chip, List, ListItemButton,
  ListItemText, CircularProgress, Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useOrdenes } from "../hooks/useOrdenes";

export default function CobrosPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useOrdenes({ search, ordering: "-saldo_pendiente" });

  const conDeuda = data?.results?.filter((ot) => ot.saldo_pendiente > 0) || [];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Cobros</Typography>

      <TextField
        placeholder="Buscar cliente o dominio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        slotProps={{
          input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> },
        }}
      />

      {isLoading && <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Error al cargar</Alert>}

      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Órdenes con Saldo Pendiente ({conDeuda.length})
      </Typography>

      {conDeuda.length === 0 && !isLoading && (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <Typography color="text.secondary">No hay saldos pendientes</Typography>
          </CardContent>
        </Card>
      )}

      <List>
        {conDeuda.map((ot) => (
          <ListItemButton
            key={ot.id}
            onClick={() => navigate(`/ordenes/${ot.id}`)}
            sx={{ borderRadius: 2, mb: 1, bgcolor: "background.paper" }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {ot.dominio} - {ot.nombre_cliente}
                  </Typography>
                  <Chip
                    label={`$${ot.saldo_pendiente}`}
                    size="small"
                    color="warning"
                  />
                </Box>
              }
              secondary={ot.marca_moto}
            />
          </ListItemButton>
        ))}
      </List>

      <Typography variant="subtitle1" sx={{ mb: 1, mt: 3, fontWeight: 600 }}>
        Todas las Órdenes
      </Typography>
      <List>
        {data?.results?.map((ot) => (
          <ListItemButton
            key={ot.id}
            onClick={() => navigate(`/ordenes/${ot.id}`)}
            sx={{ borderRadius: 2, mb: 0.5, bgcolor: "background.paper" }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">#{ot.id} {ot.dominio}</Typography>
                  <Chip
                    label={`$${ot.saldo_pendiente}`}
                    size="small"
                    variant="outlined"
                    color={ot.saldo_pendiente > 0 ? "warning" : "default"}
                  />
                </Box>
              }
              secondary={`${ot.nombre_cliente} - ${ot.estado}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
