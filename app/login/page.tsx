// file: app/auth/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import AppButton from "@/components/AppButton";

/**
 * UI-only auth page (shadcn components).
 * - Email/password Login + Signup
 * - "Continue with Google" button (hook to your auth provider)
 *
 * Hook points:
 * - handleEmailLogin()
 * - handleEmailSignup()
 * - handleGoogleContinue()
 */

type LoginForm = { email: string; password: string };
type SignupForm = { name: string; email: string; password: string };

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-300/90">{msg}</p>;
}

export default function AuthPage() {
  const [tab, setTab] = React.useState<"login" | "signup">("login");

  const [login, setLogin] = React.useState<LoginForm>({
    email: "",
    password: "",
  });
  const [signup, setSignup] = React.useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState<
    null | "login" | "signup" | "google"
  >(null);

  const [loginErrors, setLoginErrors] = React.useState<Partial<LoginForm>>({});
  const [signupErrors, setSignupErrors] = React.useState<Partial<SignupForm>>(
    {},
  );

  const handleGoogleContinue = async () => {
    setLoading("google");
    try {
      // TODO: replace with your real provider:
      // - NextAuth: signIn("google", { callbackUrl: "/" })
      // - Clerk: signInWithOAuth({ provider: "google" })
      // - Supabase: supabase.auth.signInWithOAuth({ provider: "google" })
      window.location.href = "/api/auth/google"; // placeholder route
    } finally {
      setLoading(null);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<LoginForm> = {};
    if (!login.email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(login.email)) errs.email = "Enter a valid email.";
    if (!login.password.trim()) errs.password = "Password is required.";
    setLoginErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading("login");
    try {
      // TODO: replace with your real API call:
      // await fetch("/api/auth/login", { method:"POST", body: JSON.stringify(login) })
      await new Promise((r) => setTimeout(r, 600));
      // redirect after success
      window.location.href = "/";
    } finally {
      setLoading(null);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<SignupForm> = {};
    if (!signup.name.trim()) errs.name = "Name is required.";
    if (!signup.email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(signup.email)) errs.email = "Enter a valid email.";
    if (!signup.password.trim()) errs.password = "Password is required.";
    else if (signup.password.length < 8)
      errs.password = "Use at least 8 characters.";
    setSignupErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading("signup");
    try {
      // TODO: replace with your real API call:
      // await fetch("/api/auth/signup", { method:"POST", body: JSON.stringify(signup) })
      await new Promise((r) => setTimeout(r, 650));
      window.location.href = "/";
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* background (match your dark neon theme) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-14 sm:px-6">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 text-center">
            <p className="mt-2 text-sm text-white/60">
              Login or create an account.
            </p>
          </div>

          <Card className="rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur">
            <CardContent className="p-6">
              {/* Google */}
              <AppButton
                onClick={handleGoogleContinue}
                disabled={loading !== null}
                variant="outline"
                className="w-full"
              >
                <FaGoogle />{" "}
                {loading === "google"
                  ? "Connecting..."
                  : "Continue with Google"}
              </AppButton>

              <div className="my-5 flex items-center gap-3">
                <Separator className="flex-1 bg-white/10" />
                <span className="text-xs text-white/45">or</span>
                <Separator className="flex-1 bg-white/10" />
              </div>

              {/* Tabs */}
              <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as "login" | "signup")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.02] p-1">
                  <TabsTrigger
                    value="login"
                    className="rounded-xl data-[state=active]:bg-white/[0.08] data-[state=active]:text-white"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-xl data-[state=active]:bg-white/[0.08] data-[state=active]:text-white"
                  >
                    Sign up
                  </TabsTrigger>
                </TabsList>

                {/* Login */}
                <TabsContent value="login" className="mt-5">
                  <form onSubmit={handleEmailLogin} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="login-email" className="text-white/80">
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        value={login.email}
                        onChange={(e) => {
                          setLogin((p) => ({ ...p, email: e.target.value }));
                          setLoginErrors((p) => ({ ...p, email: undefined }));
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        inputMode="email"
                        className={cn(
                          "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
                          loginErrors.email && "border-red-300/40",
                        )}
                      />
                      <FieldError msg={loginErrors.email} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="login-password" className="text-white/80">
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={login.password}
                        onChange={(e) => {
                          setLogin((p) => ({ ...p, password: e.target.value }));
                          setLoginErrors((p) => ({
                            ...p,
                            password: undefined,
                          }));
                        }}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className={cn(
                          "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
                          loginErrors.password && "border-red-300/40",
                        )}
                      />
                      <FieldError msg={loginErrors.password} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        href="/auth/forgot"
                        className="text-xs text-white/60 hover:text-white hover:underline"
                      >
                        Forgot password?
                      </Link>
                      <span className="text-xs text-white/45">
                        Secure login
                      </span>
                    </div>

                    {/* <Button
                      disabled={loading !== null}
                      className="h-11 rounded-2xl"
                    >
                      {loading === "login" ? "Signing in..." : "Login"}
                    </Button> */}
                    <AppButton disabled={loading !== null}>
                      {loading === "login" ? "Signing in..." : "Login"}
                    </AppButton>
                  </form>
                </TabsContent>

                {/* Signup */}
                <TabsContent value="signup" className="mt-5">
                  <form onSubmit={handleEmailSignup} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="signup-name" className="text-white/80">
                        Name
                      </Label>
                      <Input
                        id="signup-name"
                        value={signup.name}
                        onChange={(e) => {
                          setSignup((p) => ({ ...p, name: e.target.value }));
                          setSignupErrors((p) => ({ ...p, name: undefined }));
                        }}
                        placeholder="Your name"
                        autoComplete="name"
                        className={cn(
                          "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
                          signupErrors.name && "border-red-300/40",
                        )}
                      />
                      <FieldError msg={signupErrors.name} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="signup-email" className="text-white/80">
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        value={signup.email}
                        onChange={(e) => {
                          setSignup((p) => ({ ...p, email: e.target.value }));
                          setSignupErrors((p) => ({ ...p, email: undefined }));
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        inputMode="email"
                        className={cn(
                          "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
                          signupErrors.email && "border-red-300/40",
                        )}
                      />
                      <FieldError msg={signupErrors.email} />
                    </div>

                    <div className="grid gap-2">
                      <Label
                        htmlFor="signup-password"
                        className="text-white/80"
                      >
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signup.password}
                        onChange={(e) => {
                          setSignup((p) => ({
                            ...p,
                            password: e.target.value,
                          }));
                          setSignupErrors((p) => ({
                            ...p,
                            password: undefined,
                          }));
                        }}
                        placeholder="Min 8 characters"
                        autoComplete="new-password"
                        className={cn(
                          "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
                          signupErrors.password && "border-red-300/40",
                        )}
                      />
                      <FieldError msg={signupErrors.password} />
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

                    <Button
                      disabled={loading !== null}
                      className="h-11 rounded-2xl"
                    >
                      {loading === "signup" ? "Creating..." : "Create account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-white/45">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-white/60 hover:text-white hover:underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
