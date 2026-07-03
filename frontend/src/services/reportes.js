import api from "./api";

export const getDashboard = () => api.get("/reportes/dashboard/");
export const getReporteMensual = (mes, anio) =>
  api.get("/reportes/mensual/", { params: { mes, anio } });
