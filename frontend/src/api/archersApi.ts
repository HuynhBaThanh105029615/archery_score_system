import api from "./axios";
import type { Archer } from "./types";

export const archersApi = {
  list: async (): Promise<Archer[]> =>
    (await api.get<Archer[]>("archers")).data,

  get: async (id: number): Promise<Archer> =>
    (await api.get<Archer>(`archers/${id}`)).data,

  create: async (payload: Partial<Archer>): Promise<Archer> =>
    (await api.post<Archer>("archers", payload)).data,

  update: async (id: number, payload: Partial<Archer>) =>
    api.put(`archers/${id}`, payload),

  remove: async (id: number) =>
    api.delete(`archers/${id}`),
};
