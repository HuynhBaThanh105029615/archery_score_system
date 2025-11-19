import api from "./axios";

export const validateApi = {
  validateScorePayload: async (payload: any) =>
    (await api.post("validate/score", payload)).data,

  validateEntryPayload: async (payload: any) =>
    (await api.post("validate/entry", payload)).data,
};
