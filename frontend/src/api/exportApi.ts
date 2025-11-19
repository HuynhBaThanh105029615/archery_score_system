import api from "./axios";

export const exportApi = {
  resultsBlob: async (competition_id: number) =>
    api.get(`/api/v1/export/${competition_id}`, { responseType: "blob" }),
};
