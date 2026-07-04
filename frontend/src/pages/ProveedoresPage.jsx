import { useState } from "react";
import {
  Box, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProveedores, useCreateProveedor, useUpdateProveedor, useDeleteProveedor } from "../hooks/useProveedores";
import { useNotification } from "../context/NotificationContext";
import ConfirmDialog from "../components/ConfirmDialog";

const schema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  telefono: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  direccion: z.string().optional(),
});

const defaultValues = { nombre: "", telefono: "", email: "", direccion: "" };

export default function ProveedoresPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useProveedores(search ? { search } : undefined);
  const createProv = useCreateProveedor();
  const updateProv = useUpdateProveedor();
  const deleteProv = useDeleteProveedor();
  const { notify } = useNotification();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const openCreate = () => {
    setEditing(null);
    reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (prov) => {
    setEditing(prov);
    reset({ nombre: prov.nombre, telefono: prov.telefono || "", email: prov.email || "", direccion: prov.direccion || "" });
    setDialogOpen(true);
  };

  const onDelete = async () => {
    try {
      await deleteProv.mutateAsync(deletingId);
      notify("Proveedor eliminado correctamente");
    } catch {
      notify("Error al eliminar el proveedor", "error");
    }
    setConfirmOpen(false);
    setDeletingId(null);
  };

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await updateProv.mutateAsync({ id: editing.id, ...formData });
        notify("Proveedor actualizado correctamente");
      } else {
        await createProv.mutateAsync(formData);
        notify("Proveedor creado correctamente");
      }
      setDialogOpen(false);
    } catch {
      notify(editing ? "Error al actualizar" : "Error al crear", "error");
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Proveedores</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Nuevo Proveedor
        </Button>
      </Box>

      <TextField
        placeholder="Buscar proveedor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
        slotProps={{
          input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> },
        }}
      />

      {isLoading && <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Error al cargar proveedores</Alert>}

      {!isLoading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary" sx={{ py: 3 }}>No hay proveedores registrados</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data?.results?.map((prov) => (
                  <TableRow key={prov.id} hover>
                    <TableCell><strong>{prov.nombre}</strong></TableCell>
                    <TableCell>{prov.telefono || "-"}</TableCell>
                    <TableCell>{prov.email || "-"}</TableCell>
                    <TableCell>{prov.direccion || "-"}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEdit(prov)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => { setDeletingId(prov.id); setConfirmOpen(true); }} color="error">
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
        <DialogTitle>{editing ? "Editar Proveedor" : "Nuevo Proveedor"}</DialogTitle>
        <DialogContent>
          <Box component="form" id="prov-form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField label="Nombre" {...register("nombre")} error={!!errors.nombre} helperText={errors.nombre?.message} fullWidth sx={{ mb: 2 }} autoFocus />
            <TextField label="Teléfono" {...register("telefono")} fullWidth sx={{ mb: 2 }} />
            <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} fullWidth sx={{ mb: 2 }} />
            <TextField label="Dirección" {...register("direccion")} fullWidth multiline rows={2} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ minHeight: 44 }}>Cancelar</Button>
          <Button type="submit" form="prov-form" variant="contained" sx={{ minHeight: 44 }}>{editing ? "Guardar Cambios" : "Crear Proveedor"}</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog open={confirmOpen} title="Eliminar Proveedor" message="¿Está seguro de eliminar este proveedor?" onConfirm={onDelete} onCancel={() => { setConfirmOpen(false); setDeletingId(null); }} />
    </Box>
  );
}
