"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../api/auth.api";
import { useSessionStore } from "../store/session.store";
import { toast } from "sonner";
import { homeHrefFor } from "@/config/nav.config";

export function useLogin() {
  const router = useRouter();
  const setUser = useSessionStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const user = await login(email, password);
      setUser(user);
      toast.success(`Selamat datang, ${user.name}`);
      router.replace(homeHrefFor(user.role));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login gagal");
      setIsSubmitting(false);
    }
  }

  return { email, password, isSubmitting, error, setEmail, setPassword, submit };
}