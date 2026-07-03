import { useState } from "react";
import {
  Box, Typography, Card, CardContent, Grid, CircularProgress,
  Alert, FormControl, InputLabel, Select, MenuItem, List,
  ListItem, ListItemText, Chip, Divider,
} from "@mui/material";
import { useReporteMensual } from "../hooks/useDashboard";

const months = [
  { value: 1, label: "Enero" }, { value: 2, label: "Febrero" }, { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" }, { value: 5, label: "Mayo" }, { value: 6, label: "Junio" },
  { value: 7, label: "Julio" }, { value: 8, label: "Agosto" }, { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" }, { value: 11, label: "Noviembre" }, { value: 12, label: "Diciembre" },
];

export default function ReportesPage() {
  const now = new Date();
  const [mes, setMes] = useState(now.getMonth() + 1);
  const [anio, setAnio] = useState(now.getFullYear());
  const { data, isLoading, error } = useReporteMensual(mes, anio);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Reportes</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Mes</InputLabel>
            <Select value={mes} onChange={(e) => setMes(e.target.value)} label="Mes">
              {months.map((m) => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Año</InputLabel>
            <Select value={anio} onChange={(e) => setAnio(e.target.value)} label="Año">
              {[2025, 2026, 2027].map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {isLoading && <Box sx={{ textAlign: "center", p: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">Error al cargar reporte</Alert>}

      {data && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Resumen de {months.find((m) => m.value === data.mes)?.label} {data.anio}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 6 }}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{data.total_ot_cerradas}</Typography>
                  <Typography variant="body2" color="text.secondary">OT Cerradas</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
                    ${data.ingresos_total?.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Ingresos Totales</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Ingresos por Forma de Pago
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Efectivo" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    ${data.ingresos_efectivo?.toLocaleString()}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Transferencia" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    ${data.ingresos_transferencia?.toLocaleString()}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Saldo Pendiente Total
              </Typography>
              <Typography
                variant="h6"
                color={data.saldo_pendiente_total > 0 ? "warning.main" : "inherit"}
              >
                ${data.saldo_pendiente_total?.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Repuestos con Stock Bajo
              </Typography>
              {data.repuestos_bajos?.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Sin alertas de stock bajo
                </Typography>
              ) : (
                <List dense>
                  {data.repuestos_bajos?.map((r) => (
                    <ListItem key={r.id}>
                      <ListItemText
                        primary={r.nombre}
                        secondary={`Stock: ${r.cantidad_stock} | Mínimo: ${r.punto_reorden}`}
                      />
                      <Chip label="Reponer" size="small" color="error" />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
