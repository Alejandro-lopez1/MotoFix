import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box, Typography, Button, TextField, Card, CardContent,
  Alert, CircularProgress, Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateOrden } from "../hooks/useOrdenes";
import { buscarMotocicleta } from "../services/motocicletas";

const schema = z.object({
  dominio: z.string().min(6, "El dominio debe tener al menos 6 caracteres").max(10),
  nombre_cliente: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  telefono_cliente: z.string().optional(),
  marca_moto: z.string().optional(),
  modelo_moto: z.string().optional(),
  descripcion_problema: z.string().min(5, "La descripción debe tener al menos 5 caracteres").max(500),
});

export default function OrdenFormPage() {
  const navigate = useNavigate();
  const createOrden = useCreateOrden();
  const [loadingMoto, setLoadingMoto] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dominio: "",
      nombre_cliente: "",
      telefono_cliente: "",
      marca_moto: "",
      modelo_moto: "",
      descripcion_problema: "",
    },
  });

  const dominio = watch("dominio");

  useEffect(() => {
    if (dominio.length >= 6) {
      const timer = setTimeout(async () => {
        setLoadingMoto(true);
        try {
          const { data } = await buscarMotocicleta(dominio);
          if (data) {
            setValue("nombre_cliente", data.cliente_nombre || "");
            setValue("marca_moto", data.marca || "");
            setValue("modelo_moto", data.modelo || "");
          }
        } catch {
          // No autocomplete
        } finally {
          setLoadingMoto(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [dominio, setValue]);

  const onSubmit = async (data) => {
    setError("");
    try {
      const result = await createOrden.mutateAsync(data);
      navigate(`/ordenes/${result.id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear la orden");
    }
  };

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/ordenes")} sx={{ mb: 2 }}>
        Volver
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3 }}>Nueva Orden de Trabajo</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Patente / Dominio"
                  {...register("dominio")}
                  error={!!errors.dominio}
                  helperText={errors.dominio?.message}
                  autoFocus
                  slotProps={{
                    input: {
                      endAdornment: loadingMoto && <CircularProgress size={20} />,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Nombre del Cliente"
                  {...register("nombre_cliente")}
                  error={!!errors.nombre_cliente}
                  helperText={errors.nombre_cliente?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Teléfono"
                  {...register("telefono_cliente")}
                  error={!!errors.telefono_cliente}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <TextField
                  label="Marca"
                  {...register("marca_moto")}
                  error={!!errors.marca_moto}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <TextField
                  label="Modelo"
                  {...register("modelo_moto")}
                  error={!!errors.modelo_moto}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Descripción del Problema"
                  {...register("descripcion_problema")}
                  error={!!errors.descripcion_problema}
                  helperText={errors.descripcion_problema?.message}
                  multiline
                  rows={3}
                  placeholder="Ej: No arranca, Frena mal, Pierde aceite..."
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => navigate("/ordenes")}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={createOrden.isPending}
              >
                {createOrden.isPending ? <CircularProgress size={24} /> : "Guardar Trabajo"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
