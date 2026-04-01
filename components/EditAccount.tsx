import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { Separator } from "./ui/separator";
import AppButton from "./AppButton";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FieldHint } from "@/app/profile/page";
import type { UserType } from "../app/profile/profileSection.types";
import React from "react";

function EditAccount({ user }: { user: UserType }) {
  const [savingProfile, setSavingProfile] = React.useState(false);

  return (
    <TabsContent value="account" className="mt-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* user card */}
        <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
                <Image
                  src={user.avatarSrc || "chowmein.png"}
                  alt="Avatar"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-white">
                  {user.name}
                </p>
                <p className="truncate text-sm text-white/60">{user.email}</p>
              </div>
            </div>

            <Separator className="my-5 bg-white/10" />

            <div className="space-y-2 text-sm text-white/65">
              <div className="flex items-center justify-between">
                <span>Phone</span>
                <span className="text-white/80">{user.phone || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Saved addresses</span>
                <span className="text-white/80">{addresses.length}</span>
              </div>
            </div>

            <AppButton
              variant="secondary"
              className="w-full mt-2"
              onClick={() => alert("logged out")}
            >
              Log out
            </AppButton>
          </CardContent>
        </Card>

        {/* edit form */}
        <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:col-span-3">
          <CardContent className="p-6">
            <div className="mb-4">
              <p className="text-sm font-semibold text-white">
                Profile details
              </p>
              <p className="mt-1 text-sm text-white/60">
                Edit your basic information.
              </p>
            </div>

            {saved === "profile" && (
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white/70">
                ✅ Saved!
              </div>
            )}

            <form onSubmit={saveProfile} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white/80">
                  Name
                </Label>
                <Input
                  id="name"
                  value={user.name}
                  onChange={(e) =>
                    setUser((p) => ({ ...p, name: e.target.value }))
                  }
                  className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser((p) => ({ ...p, email: e.target.value }))
                    }
                    className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                  <FieldHint>
                    Email changes should be verified in backend.
                  </FieldHint>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-white/80">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={user.phone || ""}
                    onChange={(e) =>
                      setUser((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                    placeholder="+977..."
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                <FieldHint>Connect save to your API later.</FieldHint>
                <Button className="h-11 rounded-2xl" disabled={savingProfile}>
                  {savingProfile ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}

export default EditAccount;
