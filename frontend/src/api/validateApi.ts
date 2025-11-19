import api from "./axios";

export const validateApi = {
  validateScorePayload: async (payload: any) =>
    (await api.post("/api/v1/validate/score", payload)).data,

  validateEntryPayload: async (payload: any) =>
    (await api.post("/api/v1/validate/entry", payload)).data,
};
