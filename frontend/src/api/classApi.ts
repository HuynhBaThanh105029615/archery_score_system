import api from "./axios";

export const classApi = {
  list: async () => (await api.get("classes")).data,
  get: async (id: number) => (await api.get(`classes/${id}`)).data,
  create: async (payload: any) => (await api.post("classes", payload)).data,
  update: async (id: number, payload: any) => api.put(`classes/${id}`, payload),
  remove: async (id: number) => api.delete(`classes/${id}`),
};
