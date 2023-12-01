import { StateCreator } from "zustand";

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface AuthSlice {
  user: AuthUser | null;
  accessToken: string | null;
  onAuthSuccess: ({
    user,
    accessToken,
  }: {
    user: AuthUser;
    accessToken: string;
  }) => void;
  onProfileUpdate: (user: AuthUser) => void;
  onLogout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  user: null,
  accessToken: null,
  onAuthSuccess: (payload) => {
    set(() => ({ ...payload }));
  },
  onProfileUpdate: (payload) => {
    set(() => ({ user: payload }));
  },
  onLogout: () => {
    set(() => ({
      user: null,
      accessToken: null,
    }));
  },
});
