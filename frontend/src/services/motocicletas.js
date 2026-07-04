import api from "./api";

export const getMotocicletas = (params) => api.get("/motocicletas/", { params });
export const getMotocicleta = (id) => api.get(`/motocicletas/${id}/`);
export const createMotocicleta = (data) => api.post("/motocicletas/", data);
export const updateMotocicleta = (id, data) => api.put(`/motocicletas/${id}/`, data);
export const deleteMotocicleta = (id) => api.delete(`/motocicletas/${id}/`);
export const buscarMotocicleta = (dominio) => api.get(`/motocicletas/buscar/${dominio}/`);
export const getHistorialMoto = (id) => api.get(`/motocicletas/${id}/historial/`);
