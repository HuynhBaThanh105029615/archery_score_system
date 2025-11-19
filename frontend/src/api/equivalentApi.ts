import api from "./axios";
import type { Round } from "./types";

export const equivalentApi = {
  list: async (params?: { round_id?: number; class_id?: number; division_id?: number }) =>
    (await api.get("equivalent", { params })).data,

  get: async (id: number) =>
    (await api.get(`equivalent/${id}`)).data,
};
