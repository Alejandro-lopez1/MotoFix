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
      icon: <BuildIcon sx={{ fontSize: { xs: 28, sm: 40 } }} />,
      color: "primary.main",
    },
    {
      label: "Cerradas este Mes",
      value: data.ordenes_cerradas_mes,
      icon: <CheckCircleIcon sx={{ fontSize: { xs: 28, sm: 40 } }} />,
      color: "success.main",
    },
    {
      label: "Ingresos del Mes",
      value: `$${data.ingresos_total?.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: { xs: 28, sm: 40 } }} />,
      color: "secondary.main",
    },
    {
      label: "Saldo Pendiente",
      value: `$${data.saldo_pendiente_total?.toLocaleString()}`,
      icon: <WarningIcon sx={{ fontSize: { xs: 28, sm: 40 } }} />,
      color: "warning.main",
      alert: data.saldo_pendiente_total > 0,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
        Dashboard
      </Typography>

      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: 4 }}>
        {cards.map((card) => (
          <Grid size={{ xs: 6, sm: 6, md: 3 }} key={card.label}>
            <Card elevation={1}>
              <CardContent sx={{ textAlign: "center", p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ color: card.color, mb: 0.5 }}>{card.icon}</Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.5rem" } }}
                >
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  {card.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={1}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                Trabajos Recientes
              </Typography>
              {data.ordenes_recientes?.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                  No hay trabajos activos
                </Typography>
              ) : (
                <List dense disablePadding>
                  {data.ordenes_recientes?.map((ot) => (
                    <ListItem
                      key={ot.id}
                      component="button"
                      onClick={() => navigate(`/ordenes/${ot.id}`)}
                      sx={{ borderRadius: 1, cursor: "pointer", "&:hover": { bgcolor: "action.hover" }, mb: 0.5, px: 1, py: 0.75 }}
                    >
                      <ListItemText
                        primary={ot.dominio}
                        secondary={ot.nombre_cliente}
                        primaryTypographyProps={{ fontWeight: 600, fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      />
                      <Chip
                        label={ot.estado}
                        size="small"
                        color={ESTADO_COLORS[ot.estado] || "default"}
                        sx={{ ml: 1 }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={1}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                Stock Bajo
              </Typography>
              {data.repuestos_bajos?.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                  Sin alertas de stock bajo
                </Typography>
              ) : (
                <List dense disablePadding>
                  {data.repuestos_bajos?.map((r) => (
                    <ListItem key={r.id} sx={{ px: 1, py: 0.75 }}>
                      <ListItemText
                        primary={r.nombre}
                        primaryTypographyProps={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
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
