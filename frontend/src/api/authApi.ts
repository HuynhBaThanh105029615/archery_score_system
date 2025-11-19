import api from "./axios";
import type { AuthResponse, User } from "./types";

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> =>
    (await api.post<AuthResponse>("auth/login", { email, password })).data,

  logout: async (): Promise<void> =>
    (await api.post("auth/logout")).data,

  me: async (): Promise<Partial<User>> =>
    (await api.get<Partial<User>>("auth/me")).data,
};
