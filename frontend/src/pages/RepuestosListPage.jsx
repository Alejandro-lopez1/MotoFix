import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, TextField, InputAdornment,
  Card, CardContent, Grid, Chip, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRepuestos, useCreateRepuesto, useResumenStock } from "../hooks/useRepuestos";

const repuestoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  precio_compra_promedio: z.string().min(1),
  cantidad_stock: z.string().min(1),
  punto_reorden: z.string().min(1),
  descripcion: z.string().optional(),
  proveedor: z.string().optional(),
});

export default function RepuestosListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useRepuestos({ search });
  const { data: resumen } = useResumenStock();
  const createRepuesto = useCreateRepuesto();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(repuestoSchema),
  });

  const onSubmit = async (formData) => {
    try {
      await createRepuesto.mutateAsync({
        ...formData,
        precio_compra_promedio: parseFloat(formData.precio_compra_promedio),
        cantidad_stock: parseInt(formData.cantidad_stock),
        punto_reorden: parseInt(formData.punto_reorden),
      });
      setDialogOpen(false);
      reset();
    } catch { /* handled by react-query */ }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Repuestos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          Nuevo Repuesto
        </Button>
      </Box>

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
      {error && <Alert severity="error">Error al cargar repuestos</Alert>}

      <Grid container spacing={2}>
        {data?.results?.map((r) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={r.id}>
            <Card
              sx={{ cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
              onClick={() => navigate(`/repuestos/${r.id}`)}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{r.nombre}</Typography>
                  {r.esta_bajo_minimo && <Chip label="Bajo stock" size="small" color="error" />}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {r.proveedor}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography variant="body2">
                    Stock: <strong>{r.cantidad_stock}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Mín: <strong>{r.punto_reorden}</strong>
                  </Typography>
                  <Typography variant="body2">
                    $<strong>{r.precio_compra_promedio}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16, display: { sm: "none" } }}
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Nuevo Repuesto</DialogTitle>
        <DialogContent>
          <Box component="form" id="repuesto-form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              label="Nombre"
              {...register("nombre")}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
              fullWidth
              sx={{ mb: 2 }}
              autoFocus
            />
            <TextField label="Descripción" {...register("descripcion")} fullWidth sx={{ mb: 2 }} />
            <TextField label="Proveedor" {...register("proveedor")} fullWidth sx={{ mb: 2 }} />
            <TextField
              label="Precio de Compra"
              type="number"
              {...register("precio_compra_promedio")}
              error={!!errors.precio_compra_promedio}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Cantidad en Stock"
              type="number"
              {...register("cantidad_stock")}
              error={!!errors.cantidad_stock}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Punto de Reorden"
              type="number"
              {...register("punto_reorden")}
              error={!!errors.punto_reorden}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ minHeight: 44 }}>Cancelar</Button>
          <Button type="submit" form="repuesto-form" variant="contained" sx={{ minHeight: 44 }}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
