import { useNavigate } from "react-router-dom";
import {
  Grid, Card, CardContent, Typography, CircularProgress,
  Box, List, ListItem, ListItemText, Chip, Alert,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WarningIcon from "@mui/icons-material/Warning";
import { useDashboard } from "../hooks/useDashboard";

const ESTADO_COLORS = {
  "Recibida": "default",
  "En diagnóstico": "info",
  "En reparación": "warning",
  "Esperando repuesto": "error",
  "Lista para entregar": "success",
};

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();
  const navigate = useNavigate();

  if (isLoading) return <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error al cargar el dashboard</Alert>;

  const cards = [
    {
      label: "Órdenes Activas",
      value: data.ordenes_activas,
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      color: "primary.main",
    },
    {
      label: "Cerradas este Mes",
      value: data.ordenes_cerradas_mes,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: "success.main",
    },
    {
      label: "Ingresos del Mes",
      value: `$${data.ingresos_total?.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      color: "secondary.main",
    },
    {
      label: "Saldo Pendiente",
      value: `$${data.saldo_pendiente_total?.toLocaleString()}`,
      icon: <WarningIcon sx={{ fontSize: 40 }} />,
      color: "warning.main",
      alert: data.saldo_pendiente_total > 0,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Dashboard</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {cards.map((card) => (
          <Grid size={{ xs: 6, md: 3 }} key={card.label}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Box sx={{ color: card.color, mb: 1 }}>{card.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Trabajos Recientes</Typography>
              {data.ordenes_recientes?.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No hay trabajos activos
                </Typography>
              ) : (
                <List dense>
                  {data.ordenes_recientes?.map((ot) => (
                    <ListItem
                      key={ot.id}
                      component="button"
                      onClick={() => navigate(`/ordenes/${ot.id}`)}
                      sx={{ borderRadius: 1, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
                    >
                      <ListItemText
                        primary={`${ot.dominio} - ${ot.nombre_cliente}`}
                        secondary={new Date(ot.fecha_creacion).toLocaleDateString()}
                      />
                      <Chip
                        label={ot.estado}
                        size="small"
                        color={ESTADO_COLORS[ot.estado] || "default"}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Stock Bajo</Typography>
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
                        secondary={`Stock: ${r.cantidad_stock} / Mínimo: ${r.punto_reorden}`}
                      />
                      <Chip label="Bajo stock" size="small" color="error" />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
