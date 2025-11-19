import api from "./axios";

export const divisionApi = {
  list: async () => (await api.get("divisions")).data,
  get: async (id: number) => (await api.get(`divisions/${id}`)).data,
  create: async (payload: any) => (await api.post("divisions", payload)).data,
  update: async (id: number, payload: any) => api.put(`divisions/${id}`, payload),
  remove: async (id: number) => api.delete(`divisions/${id}`),
};
