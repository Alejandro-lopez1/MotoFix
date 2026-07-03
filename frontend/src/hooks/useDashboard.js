import { useQuery } from "@tanstack/react-query";
import * as reportesService from "../services/reportes";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => reportesService.getDashboard().then((r) => r.data),
    refetchInterval: 30000,
  });
}

export function useReporteMensual(mes, anio) {
  return useQuery({
    queryKey: ["reporte-mensual", mes, anio],
    queryFn: () => reportesService.getReporteMensual(mes, anio).then((r) => r.data),
    enabled: !!mes && !!anio,
  });
}
