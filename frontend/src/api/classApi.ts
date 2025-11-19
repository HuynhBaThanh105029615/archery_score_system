import api from "./axios";

export const classApi = {
  list: async () => (await api.get("/api/v1/classes")).data,
  get: async (id: number) => (await api.get(`/api/v1/classes/${id}`)).data,
  create: async (payload: any) => (await api.post("/api/v1/classes", payload)).data,
  update: async (id: number, payload: any) => api.put(`/api/v1/classes/${id}`, payload),
  remove: async (id: number) => api.delete(`/api/v1/classes/${id}`),
};
