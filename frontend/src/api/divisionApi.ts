import api from "./axios";

export const divisionApi = {
  list: async () => (await api.get("/api/v1/divisions")).data,
  get: async (id: number) => (await api.get(`/api/v1/divisions/${id}`)).data,
  create: async (payload: any) => (await api.post("/api/v1/divisions", payload)).data,
  update: async (id: number, payload: any) => api.put(`/api/v1/divisions/${id}`, payload),
  remove: async (id: number) => api.delete(`/api/v1/divisions/${id}`),
};
