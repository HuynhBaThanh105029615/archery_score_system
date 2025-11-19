import api from "./axios";
import type { Competition } from "./types";

export const competitionsApi = {
  list: async (params?: { limit?: number; offset?: number }): Promise<Competition[]> =>
    (await api.get<Competition[]>("/competitions/", { params })).data,  // FIXED: trailing slash

  get: async (id: number): Promise<Competition> =>
    (await api.get<Competition>(`/competitions/${id}`)).data,

  create: async (payload: Partial<Competition>): Promise<Competition> =>
    (await api.post<Competition>("/competitions/", payload)).data,     // FIXED

  update: async (id: number, payload: Partial<Competition>) =>
    api.put(`/competitions/${id}`, payload),

  remove: async (id: number) =>
    api.delete(`/competitions/${id}`),
};
