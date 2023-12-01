import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./auth";

const STORAGE_KEY = "healthysnack-storage";

export const useStore = create<
  AuthSlice,
  [["zustand/persist", Pick<AuthSlice, "accessToken">]]
>(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
