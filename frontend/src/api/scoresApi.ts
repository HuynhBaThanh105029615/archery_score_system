import api from "./axios";
import type { Score } from "./types";

export const scoresApi = {
  list: async (params?: { competition_id?: number; archer_id?: number; limit?: number; offset?: number }): Promise<Score[]> =>
    (await api.get<Score[]>("/api/v1/scores", { params })).data,

  get: async (id: number): Promise<Score> =>
    (await api.get<Score>(`/api/v1/scores/${id}`)).data,

  submit: async (payload: Partial<Score>): Promise<Score> =>
    (await api.post<Score>("/api/v1/scores", payload)).data,

  approve: async (id: number) =>
    api.post(`/api/v1/scores/${id}/approve`),

  reject: async (id: number) =>
    api.post(`/api/v1/scores/${id}/reject`),
};
