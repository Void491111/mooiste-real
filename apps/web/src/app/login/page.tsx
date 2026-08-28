"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { SPRING } from "@/config/motion.config";
import { useLogin } from "@/features/auth/hooks/use-login";

export default function LoginPage() {
  const form = useLogin();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    form.submit();
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background p-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-card border border-border bg-card p-6"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="grid size-12 place-items-center rounded-card bg-brand">
            <Image src="/logo.png" alt="De Mooiste" width={40} height={40} className="size-10" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">De Mooiste POS</h1>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs text-muted-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="username"
            value={form.email}
            onChange={function handleEmail(event) {
              form.setEmail(event.target.value);
            }}
            className="h-11 rounded-card"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs text-muted-foreground">
            Kata sandi
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={function handlePassword(event) {
              form.setPassword(event.target.value);
            }}
            className="h-11 rounded-card"
          />
        </div>

        {form.error !== null && (
          <p className="rounded-card bg-danger-soft px-3 py-2 text-xs text-danger-soft-fg">
            {form.error}
          </p>
        )}

        <motion.div whileTap={form.isSubmitting ? undefined : { scale: 0.98 }} transition={SPRING.snappy}>
          <button
            type="submit"
            disabled={form.isSubmitting}
            className="h-11 w-full rounded-card bg-brand text-sm font-bold text-white transition-colors hover:bg-brand-soft disabled:opacity-40"
          >
            {form.isSubmitting ? "Masuk…" : "Masuk"}
          </button>
        </motion.div>
      </form>
    </div>
  );
}