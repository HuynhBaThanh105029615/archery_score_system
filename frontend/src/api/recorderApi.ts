import api from "./axios";

export const recorderApi = {
  list: async () =>
    (await api.get("/recorders/")).data,

  get: async (id: number) =>
    (await api.get(`/recorders/${id}`)).data,

  create: async (payload: any) =>
    (await api.post("/recorders/", payload)).data,

  update: async (id: number, payload: any) =>
    (await api.put(`/recorders/${id}`, payload)).data,

  remove: async (id: number) =>
    (await api.delete(`/recorders/${id}`)).data,
};
