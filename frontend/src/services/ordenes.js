import api from "./api";

export const getOrdenes = (params) => api.get("/ordenes/", { params });
export const getOrden = (id) => api.get(`/ordenes/${id}/`);
export const createOrden = (data) => api.post("/ordenes/", data);
export const updateOrdenEstado = (id, estado) =>
  api.patch(`/ordenes/${id}/estado/`, { estado });
export const getRepuestosDeOT = (id) => api.get(`/ordenes/${id}/repuestos/`);
export const agregarRepuestoAOT = (id, data) =>
  api.post(`/ordenes/${id}/agregar_repuesto/`, data);
export const getCobrosDeOT = (id) => api.get(`/ordenes/${id}/cobros/`);
export const registrarCobroEnOT = (id, data) =>
  api.post(`/ordenes/${id}/registrar_cobro/`, data);
export const getNotasDeOT = (id) => api.get(`/ordenes/${id}/notas/`);
export const agregarNotaAOT = (id, texto) =>
  api.post(`/ordenes/${id}/agregar_nota/`, { texto });
