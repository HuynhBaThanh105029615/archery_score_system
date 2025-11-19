import api from "./axios";

export const auditApi = {
  list: async (params?: { limit?: number; offset?: number }) =>
    (await api.get("/api/v1/audit", { params })).data,
};
