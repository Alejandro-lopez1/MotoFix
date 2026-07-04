import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as proveedoresService from "../services/proveedores";

export function useProveedores(params) {
  return useQuery({
    queryKey: ["proveedores", params],
    queryFn: () => proveedoresService.getProveedores(params).then((r) => r.data),
  });
}

export function useCreateProveedor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => proveedoresService.createProveedor(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["proveedores"] }),
  });
}

export function useUpdateProveedor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => proveedoresService.updateProveedor(id, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["proveedores"] }),
  });
}

export function useDeleteProveedor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => proveedoresService.deleteProveedor(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["proveedores"] }),
  });
}
