import api from "./api";

export const getRepuestos = (params) => api.get("/repuestos/", { params });
export const getRepuesto = (id) => api.get(`/repuestos/${id}/`);
export const createRepuesto = (data) => api.post("/repuestos/", data);
export const updateRepuesto = (id, data) =>
  api.put(`/repuestos/${id}/`, data);
export const deleteRepuesto = (id) => api.delete(`/repuestos/${id}/`);
export const ingresarStock = (id, data) =>
  api.post(`/repuestos/${id}/ingresar_stock/`, data);
export const getMovimientos = (id) => api.get(`/repuestos/${id}/movimientos/`);
export const getRepuestosBajoMinimo = () => api.get("/repuestos/bajo_minimo/");
export const getResumenStock = () => api.get("/repuestos/resumen_stock/");
