import { useState } from "react";
import {
  Box, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMotocicletas, useCreateMotocicleta, useUpdateMotocicleta, useDeleteMotocicleta } from "../hooks/useMotocicletas";
import { useClientes } from "../hooks/useClientes";
import { useNotification } from "../context/NotificationContext";
import ConfirmDialog from "../components/ConfirmDialog";

const schema = z.object({
  dominio: z.string().min(6, "El dominio debe tener al menos 6 caracteres").max(10),
  marca: z.string().min(1, "La marca es obligatoria"),
  modelo: z.string().optional(),
  cliente: z.any().nullable(),
});

const defaultValues = { dominio: "", marca: "", modelo: "", cliente: null };

export default function MotocicletasPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useMotocicletas(search ? { search } : undefined);
  const { data: clientesData } = useClientes();
  const createMoto = useCreateMotocicleta();
  const updateMoto = useUpdateMotocicleta();
  const deleteMoto = useDeleteMotocicleta();
  const { notify } = useNotification();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const openCreate = () => {
    setEditing(null);
    reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (moto) => {
    setEditing(moto);
    reset({
      dominio: moto.dominio,
      marca: moto.marca,
      modelo: moto.modelo || "",
      cliente: moto.cliente || null,
    });
    setDialogOpen(true);
  };

  const onDelete = async () => {
    try {
      await deleteMoto.mutateAsync(deletingId);
      notify("Motocicleta eliminada correctamente");
    } catch {
      notify("Error al eliminar la motocicleta", "error");
    }
    setConfirmOpen(false);
    setDeletingId(null);
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        cliente: formData.cliente || null,
      };
      if (editing) {
        await updateMoto.mutateAsync({ id: editing.id, ...payload });
        notify("Motocicleta actualizada correctamente");
      } else {
        await createMoto.mutateAsync(payload);
        notify("Motocicleta creada correctamente");
      }
      setDialogOpen(false);
    } catch {
      notify(editing ? "Error al actualizar" : "Error al crear", "error");
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Motocicletas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Nueva Motocicleta
        </Button>
      </Box>

      <TextField
        placeholder="Buscar por dominio, marca o modelo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
        slotProps={{
          input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> },
        }}
      />

      {isLoading && <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Error al cargar motocicletas</Alert>}

      {!isLoading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dominio</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Creado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary" sx={{ py: 3 }}>No hay motocicletas registradas</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data?.results?.map((moto) => (
                  <TableRow key={moto.id} hover>
                    <TableCell><strong>{moto.dominio}</strong></TableCell>
                    <TableCell>{moto.marca}</TableCell>
                    <TableCell>{moto.modelo || "-"}</TableCell>
                    <TableCell>{moto.cliente_nombre || "-"}</TableCell>
                    <TableCell>{new Date(moto.created).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEdit(moto)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => { setDeletingId(moto.id); setConfirmOpen(true); }} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{editing ? "Editar Motocicleta" : "Nueva Motocicleta"}</DialogTitle>
        <DialogContent>
          <Box component="form" id="moto-form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              label="Dominio / Patente"
              {...register("dominio")}
              error={!!errors.dominio}
              helperText={errors.dominio?.message}
              fullWidth
              autoFocus
              sx={{ mb: 2 }}
            />
            <TextField
              label="Marca"
              {...register("marca")}
              error={!!errors.marca}
              helperText={errors.marca?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Modelo"
              {...register("modelo")}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={watch("cliente") || ""}
                onChange={(e) => setValue("cliente", e.target.value || null)}
                label="Cliente"
              >
                <MenuItem value="">Sin cliente</MenuItem>
                {clientesData?.results?.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ minHeight: 44 }}>Cancelar</Button>
          <Button type="submit" form="moto-form" variant="contained" sx={{ minHeight: 44 }}>
            {editing ? "Guardar Cambios" : "Crear Motocicleta"}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar Motocicleta"
        message="¿Está seguro de eliminar esta motocicleta? Esta acción no se puede deshacer."
        onConfirm={onDelete}
        onCancel={() => { setConfirmOpen(false); setDeletingId(null); }}
      />
    </Box>
  );
}
