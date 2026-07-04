import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Card, CardContent, Button, CircularProgress,
  Alert, Chip, Grid, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, List, ListItem, ListItemText, Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRepuesto, useIngresarStock, useMovimientos } from "../hooks/useRepuestos";

export default function RepuestoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: repuesto, isLoading, error } = useRepuesto(id);
  const { data: movimientos } = useMovimientos(id);
  const ingresarStock = useIngresarStock();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState("");

  if (isLoading) return <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error al cargar repuesto</Alert>;
  if (!repuesto) return <Alert severity="warning">Repuesto no encontrado</Alert>;

  const handleIngresar = async () => {
    try {
      await ingresarStock.mutateAsync({ id: repuesto.id, cantidad: parseInt(cantidad), precio_unitario: parseFloat(precio) });
      setDialogOpen(false);
      setCantidad(1);
      setPrecio("");
    } catch { /* handled */ }
  };

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/repuestos")} sx={{ mb: 2, minHeight: 44 }}>
        Volver
      </Button>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{repuesto.nombre}</Typography>
              {repuesto.proveedor && (
                <Typography variant="body2" color="text.secondary">
                  Proveedor: {repuesto.proveedor}
                </Typography>
              )}
            </Box>
            {repuesto.esta_bajo_minimo && <Chip label="Stock Bajo" color="error" />}
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">Stock Actual</Typography>
              <Typography variant="h5" color={repuesto.esta_bajo_minimo ? "error" : "inherit"}>
                {repuesto.cantidad_stock}
              </Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">Punto Reorden</Typography>
              <Typography variant="h5">{repuesto.punto_reorden}</Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">Precio Prom.</Typography>
              <Typography variant="h5">${repuesto.precio_compra_promedio}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">Valor Total Stock</Typography>
              <Typography variant="h6">${repuesto.valor_total}</Typography>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setDialogOpen(true)}
          >
            Ingresar Stock
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Historial de Movimientos</Typography>
          {movimientos?.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Sin movimientos registrados</Typography>
          ) : (
            <List>
              {movimientos?.map((m) => (
                <ListItem key={m.id}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip
                          label={m.tipo}
                          size="small"
                          color={m.tipo === "Ingreso" ? "success" : "warning"}
                        />
                        <Typography variant="body2">
                          {m.cantidad} unidades {m.precio_unitario ? `a $${m.precio_unitario}` : ""}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        {new Date(m.fecha).toLocaleString()}
                        {m.ot_numero && ` - OT #${m.ot_numero}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Ingresar Stock - {repuesto.nombre}</DialogTitle>
        <DialogContent>
          <TextField
            label="Cantidad a ingresar"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
            fullWidth
            sx={{ mb: 2.5, mt: 1 }}
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
