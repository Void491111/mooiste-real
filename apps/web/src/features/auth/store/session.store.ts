import { create } from "zustand";
import type { SessionUser } from "../types";

type SessionState = {
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
};

export const useSessionStore = create<SessionState>(function createSessionStore(set) {
  return {
    user: null,

    setUser: function setSessionUser(user) {
      set({ user });
    },
  };
});