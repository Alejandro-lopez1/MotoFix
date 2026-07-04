import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmText = "Eliminar", cancelText = "Cancelar", color = "error" }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title || "Confirmar acción"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || "¿Está seguro de que desea continuar?"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} sx={{ minHeight: 44 }}>{cancelText}</Button>
        <Button onClick={onConfirm} variant="contained" color={color} sx={{ minHeight: 44 }}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}
