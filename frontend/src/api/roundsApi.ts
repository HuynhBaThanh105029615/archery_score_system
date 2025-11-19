import api from "./axios";
import type { Round, RoundRange, RoundEnd } from "./types";

export const roundsApi = {
  list: async (): Promise<Round[]> =>
    (await api.get<Round[]>("/api/v1/rounds")).data,

  get: async (id: number): Promise<Round> =>
    (await api.get<Round>(`/api/v1/rounds/${id}`)).data,

  rangesForRound: async (round_id: number): Promise<RoundRange[]> =>
    (await api.get<RoundRange[]>(`/api/v1/rounds/${round_id}/ranges`)).data,

  endsForRange: async (range_id: number): Promise<RoundEnd[]> =>
    (await api.get<RoundEnd[]>(`/api/v1/ranges/${range_id}/ends`)).data,
};
