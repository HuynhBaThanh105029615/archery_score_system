import api from "./axios";

export const exportApi = {
  resultsBlob: async (competition_id: number) =>
    api.get(`export/${competition_id}`, { responseType: "blob" }),
};
