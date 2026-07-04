import { useState } from "react";
import {
  Box, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClientes, useCreateCliente, useUpdateCliente, useDeleteCliente } from "../hooks/useClientes";
import { useNotification } from "../context/NotificationContext";
import ConfirmDialog from "../components/ConfirmDialog";

const schema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  telefono: z.string().optional(),
});

const defaultValues = { nombre: "", telefono: "" };

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useClientes(search ? { search } : undefined);
  const createCliente = useCreateCliente();
  const updateCliente = useUpdateCliente();
  const deleteCliente = useDeleteCliente();
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

  const openEdit = (cliente) => {
    setEditing(cliente);
    reset({ nombre: cliente.nombre, telefono: cliente.telefono || "" });
    setDialogOpen(true);
  };

  const onDelete = async () => {
    try {
      await deleteCliente.mutateAsync(deletingId);
      notify("Cliente eliminado correctamente");
    } catch {
      notify("Error al eliminar el cliente", "error");
    }
    setConfirmOpen(false);
    setDeletingId(null);
  };

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await updateCliente.mutateAsync({ id: editing.id, ...formData });
        notify("Cliente actualizado correctamente");
      } else {
        await createCliente.mutateAsync(formData);
        notify("Cliente creado correctamente");
      }
      setDialogOpen(false);
    } catch {
      notify(editing ? "Error al actualizar el cliente" : "Error al crear el cliente", "error");
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Clientes</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Nuevo Cliente
        </Button>
      </Box>

      <TextField
        placeholder="Buscar por nombre o teléfono..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
        slotProps={{
          input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> },
        }}
      />

      {isLoading && <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Error al cargar clientes</Alert>}

      {!isLoading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Creado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography color="text.secondary" sx={{ py: 3 }}>No hay clientes registrados</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data?.results?.map((cliente) => (
                  <TableRow key={cliente.id} hover>
                    <TableCell>{cliente.nombre}</TableCell>
                    <TableCell>{cliente.telefono || "-"}</TableCell>
                    <TableCell>{new Date(cliente.created).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEdit(cliente)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => { setDeletingId(cliente.id); setConfirmOpen(true); }} color="error">
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
        <DialogTitle>{editing ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
        <DialogContent>
          <Box component="form" id="cliente-form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              label="Nombre"
              {...register("nombre")}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
              fullWidth
              autoFocus
              sx={{ mb: 2 }}
            />
            <TextField
              label="Teléfono"
              {...register("telefono")}
              error={!!errors.telefono}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ minHeight: 44 }}>Cancelar</Button>
          <Button type="submit" form="cliente-form" variant="contained" sx={{ minHeight: 44 }}>
            {editing ? "Guardar Cambios" : "Crear Cliente"}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar Cliente"
        message="¿Está seguro de eliminar este cliente? Esta acción no se puede deshacer."
        onConfirm={onDelete}
        onCancel={() => { setConfirmOpen(false); setDeletingId(null); }}
      />
    </Box>
  );
}
