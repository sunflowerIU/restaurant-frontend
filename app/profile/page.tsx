// file: app/profile/page.tsx
"use client";

import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppButton from "@/components/AppButton";

type User = {
  name: string;
  email: string;
  phone?: string;
  avatarSrc?: string;
};

type Address = {
  id: string;
  label: string; // Home / Work
  line1: string;
  city: string;
  notes?: string;
};

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-white/45">{children}</p>;
}

export default function ProfilePage() {
  // Replace with real auth user later
  const [user, setUser] = React.useState<User>({
    name: "Amit",
    email: "amittamang421@gmail.com",
    phone: "9861911983",
    avatarSrc: "/chowmein.png",
  });

  const [savingProfile, setSavingProfile] = React.useState(false);
  const [savingPassword, setSavingPassword] = React.useState(false);
  const [saved, setSaved] = React.useState<null | "profile" | "password">(null);

  const [password, setPassword] = React.useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [pwdError, setPwdError] = React.useState<string | null>(null);

  const [addresses, setAddresses] = React.useState<Address[]>([
    {
      id: "a1",
      label: "Home",
      line1: "Boudha, Street 12",
      city: "Kathmandu",
      notes: "Ring the bell",
    },
    {
      id: "a2",
      label: "Work",
      line1: "Lazimpat, Block A",
      city: "Kathmandu",
      notes: "Reception",
    },
  ]);

  const [newAddress, setNewAddress] = React.useState<Omit<Address, "id">>({
    label: "Home",
    line1: "",
    city: "",
    notes: "",
  });

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setSaved(null);
    try {
      // TODO: call your API
      await new Promise((r) => setTimeout(r, 500));
      setSaved("profile");
      window.setTimeout(() => setSaved(null), 1200);
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwdError(null);
    setSaved(null);

    if (!password.current.trim())
      return setPwdError("Current password is required.");
    if (password.next.length < 8)
      return setPwdError("New password must be at least 8 characters.");
    if (password.next !== password.confirm)
      return setPwdError("Passwords do not match.");

    setSavingPassword(true);
    try {
      // TODO: call your API
      await new Promise((r) => setTimeout(r, 650));
      setSaved("password");
      setPassword({ current: "", next: "", confirm: "" });
      window.setTimeout(() => setSaved(null), 1200);
    } finally {
      setSavingPassword(false);
    }
  }

  function addAddress(e: React.FormEvent) {
    e.preventDefault();
    if (!newAddress.line1.trim() || !newAddress.city.trim()) return;

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());
    setAddresses((prev) => [{ id, ...newAddress }, ...prev]);
    setNewAddress({ label: "Home", line1: "", city: "", notes: "" });
  }

  function removeAddress(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <main className="relative min-h-screen overflow-hidden lg:max-h-screen">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <div className="mb-7">
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Account settings
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/60 md:text-base">
            Update your profile, change password, and manage addresses.
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.03] p-2">
            <div className="flex w-max items-center gap-2">
              <TabsTrigger
                value="account"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Addresses
              </TabsTrigger>
            </div>
          </TabsList>

          {/* Account */}
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
                      <p className="truncate text-sm text-white/60">
                        {user.email}
                      </p>
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

                  <AppButton variant="secondary" className="mt-2 w-full">
                    Logout
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
                      {/* <Button
                        className="h-11 rounded-2xl"
                        disabled={savingProfile}
                      >
                        {savingProfile ? "Saving..." : "Save changes"}
                      </Button> */}
                      <AppButton variant="secondary" disabled={savingProfile}>
                        {savingProfile ? "Saving..." : "Save changes"}
                      </AppButton>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Password */}
          <TabsContent value="security" className="mt-5">
            <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white">
                    Change password
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    Use a strong password.
                  </p>
                </div>

                {saved === "password" && (
                  <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white/70">
                    ✅ Password updated!
                  </div>
                )}

                {pwdError && (
                  <div className="mb-4 rounded-2xl border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-200">
                    {pwdError}
                  </div>
                )}

                <form onSubmit={changePassword} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current" className="text-white/80">
                      Current password
                    </Label>
                    <Input
                      id="current"
                      type="password"
                      value={password.current}
                      onChange={(e) =>
                        setPassword((p) => ({ ...p, current: e.target.value }))
                      }
                      className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="next" className="text-white/80">
                        New password
                      </Label>
                      <Input
                        id="next"
                        type="password"
                        value={password.next}
                        onChange={(e) =>
                          setPassword((p) => ({ ...p, next: e.target.value }))
                        }
                        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                        autoComplete="new-password"
                      />
                      <FieldHint>Minimum 8 characters.</FieldHint>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="confirm" className="text-white/80">
                        Confirm new password
                      </Label>
                      <Input
                        id="confirm"
                        type="password"
                        value={password.confirm}
                        onChange={(e) =>
                          setPassword((p) => ({
                            ...p,
                            confirm: e.target.value,
                          }))
                        }
                        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <FieldHint>
                      Connect password update to your API later.
                    </FieldHint>
                    <AppButton variant="secondary" disabled={savingPassword}>
                      {savingPassword ? "Updating..." : "Update password"}
                    </AppButton>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses */}
          <TabsContent value="addresses" className="mt-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
              {/* Add address */}
              <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:col-span-2">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-white">
                    Add address
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    For faster delivery.
                  </p>

                  <form onSubmit={addAddress} className="mt-4 grid gap-4">
                    <div className="grid gap-2">
                      <Label className="text-white/80" htmlFor="label">
                        Label
                      </Label>
                      <Input
                        id="label"
                        value={newAddress.label}
                        onChange={(e) =>
                          setNewAddress((p) => ({
                            ...p,
                            label: e.target.value,
                          }))
                        }
                        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                        placeholder="Home / Work"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-white/80" htmlFor="line1">
                        Address line
                      </Label>
                      <Input
                        id="line1"
                        value={newAddress.line1}
                        onChange={(e) =>
                          setNewAddress((p) => ({
                            ...p,
                            line1: e.target.value,
                          }))
                        }
                        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                        placeholder="Street, area"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-white/80" htmlFor="city">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress((p) => ({ ...p, city: e.target.value }))
                        }
                        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                        placeholder="Kathmandu"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-white/80" htmlFor="notes">
                        Notes (optional)
                      </Label>
                      <Input
                        id="notes"
                        value={newAddress.notes || ""}
                        onChange={(e) =>
                          setNewAddress((p) => ({
                            ...p,
                            notes: e.target.value,
                          }))
                        }
                        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                        placeholder="Gate, landmark..."
                      />
                    </div>

                    <AppButton variant="secondary">Add</AppButton>
                  </form>
                </CardContent>
              </Card>

              {/* Address list */}
              <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:col-span-3">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-white">
                    Saved addresses
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    {addresses.length} saved
                  </p>

                  <div className="mt-5 grid gap-3">
                    {addresses.map((a) => (
                      <div
                        key={a.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {a.label}
                            </p>
                            <p className="mt-1 text-sm text-white/65">
                              {a.line1}
                            </p>
                            <p className="mt-1 text-sm text-white/65">
                              {a.city}
                            </p>
                            {a.notes ? (
                              <p className="mt-2 text-xs text-white/50">
                                {a.notes}
                              </p>
                            ) : null}
                          </div>
                          <AppButton
                            variant="destructive"
                            onClick={() => removeAddress(a.id)}
                          >
                            Remove
                          </AppButton>
                        </div>
                      </div>
                    ))}

                    {addresses.length === 0 && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-white/60">
                        No saved addresses.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
