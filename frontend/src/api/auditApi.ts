import api from "./axios";

export const auditApi = {
  list: async (params?: { limit?: number; offset?: number }) =>
    (await api.get("audit", { params })).data,
};
