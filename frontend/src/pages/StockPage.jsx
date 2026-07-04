import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, TextField, InputAdornment,
  Card, CardContent, CardActions, Grid, Chip, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useRepuestos, useIngresarStock, useResumenStock } from "../hooks/useRepuestos";
import { useNotification } from "../context/NotificationContext";

export default function StockPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useRepuestos(search ? { search } : undefined);
  const { data: resumen } = useResumenStock();
  const ingresarStock = useIngresarStock();
  const { notify } = useNotification();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selRepuesto, setSelRepuesto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState("");

  const handleIngresar = async () => {
    if (!selRepuesto) return;
    try {
      await ingresarStock.mutateAsync({ id: selRepuesto.id, cantidad: parseInt(cantidad), precio_unitario: parseFloat(precio) });
      notify(`Stock ingresado: ${selRepuesto.nombre} +${cantidad} unidades`);
      setDialogOpen(false);
      setCantidad(1);
      setPrecio("");
      setSelRepuesto(null);
    } catch {
      notify("Error al ingresar stock", "error");
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Gestión de Stock</Typography>

      {resumen && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 4 }}>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 1.5 }}>
                <Typography variant="h6">{resumen.total_items}</Typography>
                <Typography variant="caption" color="text.secondary">Total Items</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 1.5 }}>
                <Typography variant="h6">${resumen.total_valor_stock?.toLocaleString()}</Typography>
                <Typography variant="caption" color="text.secondary">Valor Stock</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 1.5 }}>
                <Typography variant="h6" color={resumen.bajo_minimo > 0 ? "error" : "inherit"}>
                  {resumen.bajo_minimo}
                </Typography>
                <Typography variant="caption" color="text.secondary">Stock Bajo</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <TextField
        placeholder="Buscar repuesto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
        slotProps={{
          input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> },
        }}
      />

      {isLoading && <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Error al cargar stock</Alert>}

      {!isLoading && !error && (
        <Grid container spacing={2}>
          {data?.results?.length === 0 ? (
            <Grid size={12}>
              <Card>
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <InventoryIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                  <Typography color="text.secondary">No hay repuestos en el inventario</Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            data?.results?.map((r) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={r.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{r.nombre}</Typography>
                      {r.esta_bajo_minimo && <Chip label="Bajo stock" size="small" color="error" />}
                    </Box>
                    <Typography variant="body2" color="text.secondary">{r.proveedor || "Sin proveedor"}</Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      <Typography variant="body2">Stock: <strong>{r.cantidad_stock}</strong></Typography>
                      <Typography variant="body2">Mín: <strong>{r.punto_reorden}</strong></Typography>
                      <Typography variant="body2">$<strong>{r.precio_compra_promedio}</strong></Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => { setSelRepuesto(r); setDialogOpen(true); }}>
                      + Ingresar Stock
                    </Button>
                    <Button size="small" onClick={() => navigate(`/repuestos/${r.id}`)}>
                      Movimientos
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Ingresar Stock</DialogTitle>
        <DialogContent>
          {selRepuesto && (
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>{selRepuesto.nombre}</Typography>
          )}
          <TextField
            label="Cantidad a ingresar"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
            fullWidth
            sx={{ mb: 2.5 }}
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Precio unitario de compra"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ minHeight: 44 }}>Cancelar</Button>
          <Button variant="contained" onClick={handleIngresar} disabled={!cantidad || !precio} sx={{ minHeight: 44 }}>
            Confirmar Ingreso
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
