"use client";

import * as React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AppButton from "@/components/AppButton";
import { FieldError } from "./FieldError";
import { validateLogin } from "@/lib/validators/auth";
import { loginUser } from "@/lib/auth-client";
import type { LoginForm as LoginFormType } from "@/lib/types/auth";
import { toast } from "sonner";

export function LoginForm() {
  const [values, setValues] = React.useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<Partial<LoginFormType>>({});
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await loginUser(values);
      toast.success("Login Successful.");
      window.location.href = "/";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="login-email" className="text-white/80">
          Email
        </Label>
        <Input
          id="login-email"
          value={values.email}
          onChange={(e) => {
            setValues((p) => ({ ...p, email: e.target.value }));
            setErrors((p) => ({ ...p, email: undefined }));
          }}
          placeholder="you@example.com"
          autoComplete="email"
          inputMode="email"
          className={cn(
            "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
            errors.email && "border-red-300/40",
          )}
        />
        <FieldError msg={errors.email} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="login-password" className="text-white/80">
          Password
        </Label>
        <Input
          id="login-password"
          type="password"
          value={values.password}
          onChange={(e) => {
            setValues((p) => ({ ...p, password: e.target.value }));
            setErrors((p) => ({ ...p, password: undefined }));
          }}
          placeholder="••••••••"
          autoComplete="current-password"
          className={cn(
            "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
            errors.password && "border-red-300/40",
          )}
        />
        <FieldError msg={errors.password} />
      </div>

      <div className="flex items-center justify-between">
        <Link
          href="/forgot"
          className="text-xs text-white/60 hover:text-white hover:underline"
        >
          Forgot password?
        </Link>
        <span className="text-xs text-white/45">Secure login</span>
      </div>

      <AppButton variant="secondary" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </AppButton>
    </form>
  );
}
