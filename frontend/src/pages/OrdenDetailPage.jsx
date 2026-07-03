import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Card, CardContent, Chip, Button, CircularProgress,
  Alert, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel, List,
  ListItem, ListItemText, Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useOrden, useUpdateEstado, useAgregarRepuesto, useRegistrarCobro, useAgregarNota } from "../hooks/useOrdenes";
import { useRepuestos } from "../hooks/useRepuestos";

const ESTADOS = ["Recibida", "En diagnóstico", "En reparación", "Esperando repuesto", "Lista para entregar", "Entregada"];

export default function OrdenDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: ot, isLoading, error } = useOrden(id);
  const updateEstado = useUpdateEstado();
  const agregarRepuesto = useAgregarRepuesto();
  const registrarCobro = useRegistrarCobro();
  const agregarNota = useAgregarNota();
  const { data: repuestos } = useRepuestos({ disponibles: true });

  const [estadoDialog, setEstadoDialog] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [repuestoDialog, setRepuestoDialog] = useState(false);
  const [selRepuesto, setSelRepuesto] = useState("");
  const [cantRepuesto, setCantRepuesto] = useState(1);
  const [cobroDialog, setCobroDialog] = useState(false);
  const [montoCobro, setMontoCobro] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [notaDialog, setNotaDialog] = useState(false);
  const [notaText, setNotaText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (isLoading) return <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error al cargar la orden</Alert>;
  if (!ot) return <Alert severity="warning">Orden no encontrada</Alert>;

  const handleEstadoChange = async () => {
    try {
      await updateEstado.mutateAsync({ id: ot.id, estado: nuevoEstado });
      setSuccessMsg(`Estado actualizado a "${nuevoEstado}"`);
      setEstadoDialog(false);
    } catch { setSuccessMsg(""); }
  };

  const handleAgregarRepuesto = async () => {
    try {
      await agregarRepuesto.mutateAsync({ id: ot.id, repuesto_id: selRepuesto, cantidad: cantRepuesto });
      setSuccessMsg("Repuesto agregado correctamente");
      setRepuestoDialog(false);
    } catch (err) {
      alert(err.response?.data?.error || "Error al agregar repuesto");
    }
  };

  const handleRegistrarCobro = async () => {
    try {
      await registrarCobro.mutateAsync({ id: ot.id, monto_cobrado: montoCobro, forma_pago: formaPago });
      setSuccessMsg("Cobro registrado correctamente");
      setCobroDialog(false);
    } catch { setSuccessMsg(""); }
  };

  const handleAgregarNota = async () => {
    if (!notaText.trim()) return;
    try {
      await agregarNota.mutateAsync({ id: ot.id, texto: notaText });
      setSuccessMsg("Nota agregada");
      setNotaDialog(false);
      setNotaText("");
    } catch { setSuccessMsg(""); }
  };

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/ordenes")} sx={{ mb: 2 }}>
        Volver
      </Button>

      {successMsg && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMsg("")}>{successMsg}</Alert>}

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                OT #{ot.id} - {ot.dominio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(ot.fecha_creacion).toLocaleString()}
              </Typography>
            </Box>
            <Chip
              label={ot.estado}
              color={ot.estado === "Entregada" ? "success" : ot.estado === "Esperando repuesto" ? "error" : "primary"}
              onClick={() => { setNuevoEstado(ot.estado); setEstadoDialog(true); }}
              clickable
            />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">Cliente</Typography>
              <Typography>{ot.nombre_cliente}</Typography>
              <Typography variant="body2">{ot.telefono_cliente}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">Motocicleta</Typography>
              <Typography>{ot.marca_moto} {ot.modelo}</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2" color="text.secondary">Problema Informado</Typography>
              <Typography>{ot.descripcion_problema}</Typography>
            </Grid>
            {ot.diagnostico && (
              <Grid size={12}>
                <Typography variant="subtitle2" color="text.secondary">Diagnóstico</Typography>
                <Typography>{ot.diagnostico}</Typography>
              </Grid>
            )}
            {ot.monto_mano_obra && (
              <Grid size={{ xs: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Mano de Obra</Typography>
                <Typography>${ot.monto_mano_obra}</Typography>
              </Grid>
            )}
            <Grid size={{ xs: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">Saldo Pendiente</Typography>
              <Typography sx={{ fontWeight: 600, color: ot.saldo_pendiente > 0 ? "warning.main" : "inherit" }}>
                ${ot.saldo_pendiente || 0}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="subtitle2" color="text.secondary">Monto Sugerido</Typography>
              <Typography>${ot.monto_sugerido}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Button variant="outlined" fullWidth onClick={() => setEstadoDialog(true)}>
            Cambiar Estado
          </Button>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Button variant="outlined" fullWidth onClick={() => setRepuestoDialog(true)}>
            Agregar Repuesto
          </Button>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Button variant="outlined" fullWidth onClick={() => {
            setMontoCobro(ot.monto_sugerido);
            setCobroDialog(true);
          }}>
            Registrar Cobro
          </Button>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Button variant="outlined" fullWidth onClick={() => setNotaDialog(true)}>
            Agregar Nota
          </Button>
        </Grid>
      </Grid>

      {ot.repuestos_utilizados?.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Repuestos Utilizados</Typography>
            <List dense>
              {ot.repuestos_utilizados?.map((r) => (
                <ListItem key={r.id}>
                  <ListItemText primary={`${r.repuesto_nombre} x${r.cantidad}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {ot.cobros?.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Cobros Registrados</Typography>
            <List dense>
              {ot.cobros?.map((c) => (
                <ListItem key={c.id}>
                  <ListItemText
                    primary={`$${c.monto_cobrado} - ${c.forma_pago}`}
                    secondary={new Date(c.fecha).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {ot.notas?.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Notas</Typography>
            <List dense>
              {ot.notas?.map((n) => (
                <ListItem key={n.id}>
                  <ListItemText
                    primary={n.texto}
                    secondary={new Date(n.fecha_hora).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {ot.historial_estados?.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Historial de Cambios</Typography>
            <List dense>
              {ot.historial_estados?.map((h) => (
                <ListItem key={h.id}>
                  <ListItemText
                    primary={`${h.estado_anterior || "Inicio"} → ${h.estado_nuevo}`}
                    secondary={new Date(h.fecha_cambio).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      <Dialog open={estadoDialog} onClose={() => setEstadoDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Cambiar Estado</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Estado</InputLabel>
            <Select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)} label="Estado">
              {ESTADOS.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEstadoDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleEstadoChange} disabled={!nuevoEstado || nuevoEstado === ot.estado}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={repuestoDialog} onClose={() => setRepuestoDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Agregar Repuesto</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
            <InputLabel>Repuesto</InputLabel>
            <Select value={selRepuesto} onChange={(e) => setSelRepuesto(e.target.value)} label="Repuesto">
              {repuestos?.results?.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.nombre} (stock: {r.cantidad_stock})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Cantidad"
            type="number"
            value={cantRepuesto}
            onChange={(e) => setCantRepuesto(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRepuestoDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleAgregarRepuesto} disabled={!selRepuesto}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={cobroDialog} onClose={() => setCobroDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Registrar Cobro</DialogTitle>
        <DialogContent>
          <TextField
            label="Monto a cobrar"
            type="number"
            value={montoCobro}
            onChange={(e) => setMontoCobro(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Forma de pago</InputLabel>
            <Select value={formaPago} onChange={(e) => setFormaPago(e.target.value)} label="Forma de pago">
              <MenuItem value="Efectivo">Efectivo</MenuItem>
              <MenuItem value="Transferencia">Transferencia</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCobroDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleRegistrarCobro} disabled={!montoCobro || !formaPago}>
            Confirmar Cobro
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={notaDialog} onClose={() => setNotaDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Agregar Nota</DialogTitle>
        <DialogContent>
          <TextField
            label="Texto de la nota"
            multiline
            rows={3}
            value={notaText}
            onChange={(e) => setNotaText(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotaDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleAgregarNota} disabled={!notaText.trim()}>
            Guardar Nota
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
