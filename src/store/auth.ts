import { StateCreator } from "zustand";

export interface AuthSlice {
  user: { id: number; name: string; email: string } | null;
  accessToken: string | null;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  user: null,
  accessToken: null,
});
