import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as motocicletasService from "../services/motocicletas";

export function useMotocicletas(params) {
  return useQuery({
    queryKey: ["motocicletas", params],
    queryFn: () => motocicletasService.getMotocicletas(params).then((r) => r.data),
  });
}

export function useMotocicleta(id) {
  return useQuery({
    queryKey: ["motocicleta", id],
    queryFn: () => motocicletasService.getMotocicleta(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateMotocicleta() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => motocicletasService.createMotocicleta(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["motocicletas"] }),
  });
}

export function useUpdateMotocicleta() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => motocicletasService.updateMotocicleta(id, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["motocicletas"] }),
  });
}

export function useDeleteMotocicleta() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => motocicletasService.deleteMotocicleta(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["motocicletas"] }),
  });
}
