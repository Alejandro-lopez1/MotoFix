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
import { OrderStatusChip } from "../components/OrderStatusChip";
import { designTokens } from "../theme";

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
      {/* Page Header */}
      <Box sx={{ mb: designTokens.spacing["3xl"] }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: designTokens.typography.sizes.h2,
            fontWeight: 700,
            color: designTokens.colors.text.primary,
            mb: designTokens.spacing.sm,
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: designTokens.colors.text.secondary,
            fontSize: designTokens.typography.sizes.body,
          }}
        >
          Resumen general de operaciones
        </Typography>
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={designTokens.spacing.lg} sx={{ mb: designTokens.spacing["3xl"] }}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
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

      <Grid container spacing={designTokens.spacing.lg}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              backgroundColor: designTokens.colors.background.elevated,
              border: `1px solid ${designTokens.colors.gray[600]}`,
              borderRadius: designTokens.borderRadius.lg,
            }}
          >
            <CardContent sx={{ p: designTokens.spacing.xl }}>
              <Typography
                variant="h3"
                sx={{
                  mb: designTokens.spacing.lg,
                  fontSize: designTokens.typography.sizes.h4,
                  fontWeight: 600,
                }}
              >
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
                      <OrderStatusChip status={ot.estado} size="small" />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              backgroundColor: designTokens.colors.background.elevated,
              border: `1px solid ${designTokens.colors.gray[600]}`,
              borderRadius: designTokens.borderRadius.lg,
            }}
          >
            <CardContent sx={{ p: designTokens.spacing.xl }}>
              <Typography
                variant="h3"
                sx={{
                  mb: designTokens.spacing.lg,
                  fontSize: designTokens.typography.sizes.h4,
                  fontWeight: 600,
                }}
              >
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
