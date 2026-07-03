import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ordenesService from "../services/ordenes";

export function useOrdenes(params) {
  return useQuery({
    queryKey: ["ordenes", params],
    queryFn: () => ordenesService.getOrdenes(params).then((r) => r.data),
  });
}

export function useOrden(id) {
  return useQuery({
    queryKey: ["orden", id],
    queryFn: () => ordenesService.getOrden(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateOrden() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => ordenesService.createOrden(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ordenes"] }),
  });
}

export function useUpdateEstado() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, estado }) => ordenesService.updateOrdenEstado(id, estado).then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.invalidateQueries({ queryKey: ["ordenes"] });
      qc.invalidateQueries({ queryKey: ["orden", vars.id] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useAgregarRepuesto() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => ordenesService.agregarRepuestoAOT(id, data).then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.invalidateQueries({ queryKey: ["orden", vars.id] });
      qc.invalidateQueries({ queryKey: ["repuestos"] });
    },
  });
}

export function useRegistrarCobro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => ordenesService.registrarCobroEnOT(id, data).then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.invalidateQueries({ queryKey: ["orden", vars.id] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useAgregarNota() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, texto }) => ordenesService.agregarNotaAOT(id, texto).then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.invalidateQueries({ queryKey: ["orden", vars.id] });
    },
  });
}
