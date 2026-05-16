"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import AppButton from "./AppButton";
import { FieldError } from "./FieldError";
import { useActionState } from "react";
import { submitForm } from "@/lib/ServerActions";
import { toast } from "sonner";

function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(submitForm, null);

  if (state?.success) {
    toast.success(state.message);
    window.location.replace("/login");
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
            <p className="mt-2 text-sm text-white/60">
              Enter your new password
            </p>
          </div>

          <Card className="rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur">
            <CardContent className="p-6">
              <form action={formAction} className="space-y-3">
                <Input readOnly value={token} name="token" hidden />
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-white/80">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword" className="text-white/80">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                  />
                  {!state?.success && <FieldError msg={state?.message} />}
                </div>
                <AppButton
                  disabled={isPending}
                  variant="outline"
                  className="w-full"
                  type="submit"
                >
                  {isPending ? "submitting..." : "submit"}
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

export default ResetPasswordForm;
