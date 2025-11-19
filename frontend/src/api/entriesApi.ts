import api from "./axios";
import type { Archer, Competition } from "./types";

export const entriesApi = {
  list: async (params?: { competition_id?: number; archer_id?: number; limit?: number; offset?: number }) =>
    (await api.get("entries", { params })).data,

  get: async (id: number) =>
    (await api.get(`entries/${id}`)).data,

  create: async (payload: any) =>
    (await api.post("entries", payload)).data,

  update: async (id: number, payload: any) =>
    api.put(`entries/${id}`, payload),

  remove: async (id: number) =>
    api.delete(`entries/${id}`),
};
