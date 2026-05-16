"use client";

import AppButton from "@/components/AppButton";
import { FieldError } from "@/components/FieldError";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordStarter } from "@/lib/auth-client";
import { isValidEmail } from "@/lib/validators/auth";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handler(e: React.SyntheticEvent<HTMLFormElement>) {
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const email = data.email.toString();
    if (!email || !isValidEmail(email)) {
      return setErrorMsg("please enter valid email");
    }

    setErrorMsg(undefined);
    try {
      setIsLoading(true);
      const response = await forgotPasswordStarter(email);
      setIsLoading(false);
      toast.success(response);
    } catch (err) {
      setIsLoading(false);
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  }
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-14 sm:px-6">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 text-center">
            <p className="mt-2 text-sm text-white/60">Enter your email</p>
          </div>

          <Card className="rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur">
            <CardContent className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handler(e);
                }}
                className="space-y-3"
              >
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                  />
                  <FieldError msg={errorMsg} />
                </div>
                <AppButton
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? "submitting..." : "submit"}
                </AppButton>{" "}
              </form>
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
