/**
 * OrderStatusChip Component
 * Displays order status with semantic colors and icons
 * 
 * Usage:
 * <OrderStatusChip status="En diagnóstico" />
 * <OrderStatusChip status="Esperando repuesto" size="small" />
 */

import { Box } from "@mui/material";
import { designTokens } from "../theme";

const statusIcons = {
  "Recibida": "📥",
  "En diagnóstico": "🔍",
  "En reparación": "🔧",
  "Esperando repuesto": "⏸️",
  "En reparación retorno": "🔄",
  "Lista para entregar": "✅",
  "Entregada": "📤",
};

export function OrderStatusChip({ status, size = "medium" }) {
  const statusColor = designTokens.orderStateColors[status];

  if (!statusColor) {
    console.warn(`Unknown order status: ${status}`);
    return null;
  }

  const sizeStyles = {
    small: {
      padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`,
      fontSize: designTokens.typography.sizes.caption,
    },
    medium: {
      padding: `${designTokens.spacing.xs} ${designTokens.spacing.md}`,
      fontSize: designTokens.typography.sizes.bodySmall,
    },
    large: {
      padding: `${designTokens.spacing.sm} ${designTokens.spacing.lg}`,
      fontSize: designTokens.typography.sizes.body,
    },
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: designTokens.spacing.xs,
        ...sizeStyles[size],
        backgroundColor: statusColor.bg,
        border: `1px solid ${statusColor.border}`,
        color: statusColor.color,
        borderRadius: "16px",
        fontWeight: designTokens.typography.weights.medium,
        whiteSpace: "nowrap",
        transition: `all ${designTokens.transitions.normal}`,
      }}
    >
      <span>{statusIcons[status]}</span>
      <span>{status}</span>
    </Box>
  );
}

export default OrderStatusChip;
