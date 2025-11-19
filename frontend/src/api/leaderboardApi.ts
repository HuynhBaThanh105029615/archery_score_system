import api from "./axios";

export const leaderboardApi = {
  overall: async (params?: { limit?: number; offset?: number }) =>
    (await api.get("/api/v1/leaderboard", { params })).data,

  competition: async (competition_id: number) =>
    (await api.get(`/api/v1/leaderboard/${competition_id}`)).data,

  personalBest: async (archer_id: number) =>
    (await api.get(`/api/v1/leaderboard/pb/${archer_id}`)).data,
};
