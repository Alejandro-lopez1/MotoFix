import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as clientesService from "../services/clientes";

export function useClientes(params) {
  return useQuery({
    queryKey: ["clientes", params],
    queryFn: () => clientesService.getClientes(params).then((r) => r.data),
  });
}

export function useCliente(id) {
  return useQuery({
    queryKey: ["cliente", id],
    queryFn: () => clientesService.getCliente(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateCliente() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => clientesService.createCliente(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clientes"] }),
  });
}

export function useUpdateCliente() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => clientesService.updateCliente(id, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clientes"] }),
  });
}

export function useDeleteCliente() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => clientesService.deleteCliente(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clientes"] }),
  });
}
