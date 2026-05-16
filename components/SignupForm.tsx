"use client";

import * as React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AppButton from "@/components/AppButton";
import { FieldError } from "./FieldError";
import { validateSignup } from "@/lib/validators/auth";
import { registerUser } from "@/lib/auth-client";
import type { SignupForm as SignupFormType } from "@/lib/types/auth";
import { toast } from "sonner";

export function SignupForm() {
  const APP_URL = process.env.APP_URL;
  const [values, setValues] = React.useState<SignupFormType>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<Partial<SignupFormType>>({});
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors = validateSignup(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await registerUser(values);
      window.location.href = "/login";
      toast.success("User registered.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="signup-name" className="text-white/80">
          Name
        </Label>
        <Input
          id="signup-name"
          value={values.name}
          onChange={(e) => {
            setValues((p) => ({ ...p, name: e.target.value }));
            setErrors((p) => ({ ...p, name: undefined }));
          }}
          placeholder="Your name"
          autoComplete="name"
          className={cn(
            "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
            errors.name && "border-red-300/40",
          )}
        />
        <FieldError msg={errors.name} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="signup-email" className="text-white/80">
          Email
        </Label>
        <Input
          id="signup-email"
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
        <Label htmlFor="signup-password" className="text-white/80">
          Password
        </Label>
        <Input
          id="signup-password"
          type="password"
          value={values.password}
          onChange={(e) => {
            setValues((p) => ({ ...p, password: e.target.value }));
            setErrors((p) => ({ ...p, password: undefined }));
          }}
          placeholder="Min 8 characters"
          autoComplete="new-password"
          className={cn(
            "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
            errors.password && "border-red-300/40",
          )}
        />
        <FieldError msg={errors.password} />
      </div>

      <p className="text-xs text-white/45">
        By signing up, you agree to our{" "}
        <Link
          href="/terms"
          className="text-white/60 hover:text-white hover:underline"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-white/60 hover:text-white hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <AppButton
        disabled={loading}
        type="submit"
        variant="secondary"
        className="h-11 rounded-2xl"
      >
        {loading ? "Creating..." : "Create account"}
      </AppButton>
    </form>
  );
}
