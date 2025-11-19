import api from "./axios";

export const categoryApi = {
  list: async () => (await api.get("/api/v1/categories")).data,
  get: async (id: number) => (await api.get(`/api/v1/categories/${id}`)).data,
  create: async (payload: any) => (await api.post("/api/v1/categories", payload)).data,
  update: async (id: number, payload: any) => api.put(`/api/v1/categories/${id}`, payload),
  remove: async (id: number) => api.delete(`/api/v1/categories/${id}`),
};
