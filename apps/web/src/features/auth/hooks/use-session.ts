"use client";

import { useEffect, useState } from "react";
import { getMe } from "../api/auth.api";
import { useSessionStore } from "../store/session.store";

export function useSession() {
  const user = useSessionStore((state) => state.user);
  const setUser = useSessionStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(user === null);

  useEffect(
    function loadSession() {
      if (user !== null) {
        setIsLoading(false);
        return;
      }

      async function fetchMe() {
        try {
          setUser(await getMe());
        } catch {
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMe();
    },
    [user, setUser],
  );

  return { user, isLoading };
}