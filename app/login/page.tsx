"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { GoogleButton } from "@/components/GoogleButton";

export default function AuthPage() {
  const [tab, setTab] = React.useState<"login" | "signup">("login");

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
              Login or create an account.
            </p>
          </div>

          <Card className="rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur">
            <CardContent className="p-6">
              <GoogleButton />

              <div className="my-5 flex items-center gap-3">
                <Separator className="flex-1 bg-white/10" />
                <span className="text-xs text-white/45">or</span>
                <Separator className="flex-1 bg-white/10" />
              </div>

              <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as "login" | "signup")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.02] p-1">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-5">
                  <LoginForm />
                </TabsContent>

                <TabsContent value="signup" className="mt-5">
                  <SignupForm />
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
