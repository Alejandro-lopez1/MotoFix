import api from "./api";

export const getCobros = (params) => api.get("/cobros/", { params });
