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
import { OrderStatusChip } from "../components/OrderStatusChip";
import { designTokens } from "../theme";

export default function OrdenesListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useOrdenes({ search, activas: true });

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: designTokens.spacing.xl, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: designTokens.spacing.sm }}>
            Órdenes de Trabajo
          </Typography>
          <Typography variant="body2" sx={{ color: designTokens.colors.text.secondary }}>
            Gestionar y seguimiento de órdenes
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/ordenes/nueva")}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          Nuevo Trabajo
        </Button>
      </Box>

      {/* Search Bar */}
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
        <Card
          sx={{
            backgroundColor: designTokens.colors.background.elevated,
            border: `1px solid ${designTokens.colors.gray[600]}`,
          }}
        >
          <CardContent sx={{ textAlign: "center", py: designTokens.spacing["2xl"] }}>
            <Typography color="text.secondary" sx={{ mb: designTokens.spacing.lg }}>
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
            sx={{
              borderRadius: designTokens.borderRadius.md,
              mb: designTokens.spacing.md,
              backgroundColor: designTokens.colors.background.paper,
              border: `1px solid ${designTokens.colors.gray[600]}`,
              transition: `all ${designTokens.transitions.normal}`,
              "&:hover": {
                backgroundColor: designTokens.colors.background.elevated,
                borderColor: designTokens.colors.primary.main,
              },
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    #{ot.id} - {ot.dominio}
                  </Typography>
                  <OrderStatusChip status={ot.estado} size="small" />
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
