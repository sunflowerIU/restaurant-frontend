// file: app/not-found.tsx
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* background (match your theme) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <Card className="relative w-full max-w-md rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur">
        <CardContent className="p-7 text-center">
          <p className="text-xs text-white/60">404</p>
          <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-white/60">
            The page you’re looking for doesn’t exist or was moved.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild className="rounded-2xl">
              <Link href="/">Go Home</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.06]"
            >
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-white/45">
            Tip: use the navigation to find momo faster.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
