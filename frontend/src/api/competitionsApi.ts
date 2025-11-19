import api from "./axios";
import type { Competition } from "./types";

export const competitionsApi = {
  list: async (params?: { limit?: number; offset?: number } ): Promise<Competition[]> =>
    (await api.get<Competition[]>("/api/v1/competitions", { params })).data,

  get: async (id: number): Promise<Competition> =>
    (await api.get<Competition>(`/api/v1/competitions/${id}`)).data,

  create: async (payload: Partial<Competition>): Promise<Competition> =>
    (await api.post<Competition>("/api/v1/competitions", payload)).data,

  update: async (id: number, payload: Partial<Competition>) =>
    api.put(`/api/v1/competitions/${id}`, payload),

  remove: async (id: number) =>
    api.delete(`/api/v1/competitions/${id}`),
};
