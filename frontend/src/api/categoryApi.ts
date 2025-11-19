import api from "./axios";

export const categoryApi = {
  list: async () => (await api.get("categories")).data,
  get: async (id: number) => (await api.get(`categories/${id}`)).data,
  create: async (payload: any) => (await api.post("categories", payload)).data,
  update: async (id: number, payload: any) => api.put(`categories/${id}`, payload),
  remove: async (id: number) => api.delete(`categories/${id}`),
};
