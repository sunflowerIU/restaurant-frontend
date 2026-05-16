// file: app/error.tsx
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppButton from "@/components/AppButton";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  //   useEffect(() => {
  //     // Log to your monitoring tool here (Sentry, LogRocket, etc.)
  //     // console.error(error);
  //   }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* background (match your theme) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <Card className="relative w-full max-w-lg rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur">
        <CardContent className="p-7">
          <p className="text-xs text-white/60">Something went wrong</p>
          <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white">
            We hit an unexpected error
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Try again. If it keeps happening, go back home.
          </p>

          {/* Optional: show digest in dev */}
          {process.env.NODE_ENV !== "production" && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-3">
              <p className="text-xs font-medium text-white/70">Debug</p>
              <p className="mt-1 break-words text-xs text-white/55">
                {error?.message || "Unknown error"}
              </p>
              {error?.digest ? (
                <p className="mt-1 text-xs text-white/45">
                  Digest: {error.digest}
                </p>
              ) : null}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button className="rounded-2xl" onClick={() => reset()}>
              Try again
            </Button>

            <AppButton href="/" variant="outline">
              Go Home
            </AppButton>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
