import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as repuestosService from "../services/repuestos";

export function useRepuestos(params) {
  return useQuery({
    queryKey: ["repuestos", params],
    queryFn: () => repuestosService.getRepuestos(params).then((r) => r.data),
  });
}

export function useRepuesto(id) {
  return useQuery({
    queryKey: ["repuesto", id],
    queryFn: () => repuestosService.getRepuesto(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateRepuesto() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => repuestosService.createRepuesto(data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["repuestos"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useIngresarStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => repuestosService.ingresarStock(id, data).then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.invalidateQueries({ queryKey: ["repuestos"] });
      qc.invalidateQueries({ queryKey: ["repuesto", vars.id] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useRepuestosBajoMinimo() {
  return useQuery({
    queryKey: ["repuestos", "bajo-minimo"],
    queryFn: () => repuestosService.getRepuestosBajoMinimo().then((r) => r.data),
  });
}

export function useResumenStock() {
  return useQuery({
    queryKey: ["repuestos", "resumen"],
    queryFn: () => repuestosService.getResumenStock().then((r) => r.data),
  });
}

export function useMovimientos(id) {
  return useQuery({
    queryKey: ["movimientos", id],
    queryFn: () => repuestosService.getMovimientos(id).then((r) => r.data),
    enabled: !!id,
  });
}
