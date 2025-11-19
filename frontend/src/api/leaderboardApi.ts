import api from "./axios";

export const leaderboardApi = {
  overall: async (params?: { limit?: number; offset?: number }) =>
    (await api.get("leaderboard", { params })).data,

  competition: async (competition_id: number) =>
    (await api.get(`leaderboard/${competition_id}`)).data,

  personalBest: async (archer_id: number) =>
    (await api.get(`leaderboard/pb/${archer_id}`)).data,
};
