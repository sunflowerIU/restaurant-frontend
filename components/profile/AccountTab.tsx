import Image from "next/image";

import AppButton from "@/components/AppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { logoutUser } from "@/lib/auth-client";
import type { UpdateProfile, User } from "@/lib/types/profile";
import { isValidNepalMobile, normalizeNepalPhone } from "@/lib/validators/auth";
import { useRef } from "react";
import { toast } from "sonner";

type AccountTabProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  savingProfile: boolean;
  saveProfile: (payload: UpdateProfile) => Promise<boolean>;
};

export default function AccountTab({
  user,
  setUser,
  savingProfile,
  saveProfile,
}: AccountTabProps) {
  const originalRef = useRef({
    name: user.name ?? "",
    phone: user.phone ?? "",
  });
  if (!user) return;

  const hasChanged =
    (user.name ?? "") !== originalRef.current.name ||
    (user.phone ?? "") !== originalRef.current.phone;

  async function handleSubmit(payload: UpdateProfile) {
    //if no change then just return
    if (!hasChanged) {
      return toast.warning("Nothing to change");
    }

    //validate phone number
    if (payload.phone) {
      const isValid = isValidNepalMobile(normalizeNepalPhone(payload.phone));

      if (!isValid) return toast.error("Invalid phone number.");
    }

    const result = await saveProfile(payload);
    if (result) {
      originalRef.current = {
        name: user.name ?? "",
        phone: user.phone ?? "",
      };
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
      <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
              <Image
                src={user.avatarSrc || "/chowmein.png"}
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
              <span className="text-white/80">{user.phone || "Not Found"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Saved addresses</span>
            </div>
          </div>

          <AppButton
            onClick={() => logoutUser(setUser)}
            variant="secondary"
            className="mt-2 w-full"
          >
            Logout
          </AppButton>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:col-span-3">
        <CardContent className="p-6">
          <div className="mb-4">
            <p className="text-sm font-semibold text-white">Profile details</p>
            <p className="mt-1 text-sm text-white/60">
              Edit your basic information.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit({ name: user.name, phone: user.phone });
            }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white/80">
                Name
              </Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => {
                    if (!prev) return null;
                    return { ...prev, name: e.target.value };
                  })
                }
                className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-white/80">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={user.phone || ""}
                  onChange={(e) => {
                    setUser((prev) => {
                      if (!prev) return null;
                      return { ...prev, phone: e.target.value };
                    });
                  }}
                  className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                  placeholder="+977..."
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
              <AppButton variant="secondary" disabled={savingProfile}>
                {savingProfile ? "Saving..." : "Save changes"}
              </AppButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
