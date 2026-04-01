// file: app/contact/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AppButton from "@/components/AppButton";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email.";
  if (!form.message.trim()) errors.message = "Message is required.";
  if (form.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters.";

  return errors;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-300/90">{msg}</p>;
}

//social media
const socialMediaLinks = [
  {
    platform: "Instagram",
    href: "https://www.instagram.com/thing.amit?igsh=MXNtdWdsbGpiNWdvZA==",
  },
  {
    platform: "Facebook",
    href: "https://www.facebook.com/chyangba.tamang.277276",
  },
  {
    platform: "TikTok",
    href: "https://www.tiktok.com/@amit.tamang513?_r=1&_t=ZS-95ATbWXqZDV",
  },
  {
    platform: "Whatsapp",
    href: "https://wa.me/qr/ERWCOFK2XMNZI1",
  },
];

export default function ContactPage() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "sent">(
    "idle",
  );

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: undefined }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    // Replace this with your real API call:
    // await fetch("/api/contact", { method:"POST", body: JSON.stringify(form) })
    await new Promise((r) => setTimeout(r, 700));

    setStatus("sent");
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden lg:h-dvh lg:overflow-hidden">
      {/* background (matched to your hero theme) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.90),rgba(2,6,12,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl min-h-0 flex-col px-4 pb-16 pt-24 sm:px-6 lg:h-full lg:pb-6">
        {/* header */}
        <div className="mb-8 flex flex-col gap-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Contact us
          </h1>

          <p className="max-w-2xl text-sm text-white/60 md:text-base">
            Questions, catering, or feedback — send a message and we’ll reply
            soon.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:min-h-0 lg:flex-1 lg:grid-cols-5 lg:overflow-hidden">
          {/* left info */}
          <div className="lg:col-span-2 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            <div className="grid gap-4">
              <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-white">Visit</p>
                  <p className="mt-2 text-sm text-white/60">
                    Your Street, Your City <br />
                    Kathmandu, Nepal
                  </p>
                  <Separator className="my-4 bg-white/10" />
                  <div className="flex flex-wrap gap-2">
                    <AppButton
                      href="https://maps.app.goo.gl/xqPxUpzzyJQXQdvn9"
                      linkProps={{
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }}
                      variant="outline"
                    >
                      Show on Map
                    </AppButton>
                    {/* <Button asChild className="rounded-2xl">
                      <Link href="/order">Go to menu</Link>
                    </Button> */}
                    <AppButton href="/menu" variant="destructive">
                      Go to menu
                    </AppButton>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-white">Contact</p>

                  <div className="mt-3 space-y-2 text-sm text-white/65">
                    <p className="space-x-2">
                      Phone:{" "}
                      <span className="text-white/80">+977-98461911983</span>
                      <AppButton variant="secondary" href="tel:+9779861911983">
                        Call Now
                      </AppButton>
                    </p>
                    <p className="space-x-2">
                      Email:{" "}
                      <span className="text-white/80">
                        amittamang421@gmail.com
                      </span>
                      <AppButton
                        variant="secondary"
                        href="mailto:amittamang421@gmail.com"
                      >
                        Email Now
                      </AppButton>
                    </p>
                  </div>

                  <Separator className="my-4 bg-white/10" />

                  <p className="text-sm font-semibold text-white">Hours</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/65">
                    <p>Sun–Thu</p>
                    <p className="text-right text-white/80">11:00 – 22:30</p>
                    <p>Fri–Sat</p>
                    <p className="text-right text-white/80">11:00 – 23:00</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-white">Social</p>
                  <p className="mt-2 text-sm text-white/60">
                    Follow for new momo drops and specials.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* social media buttons */}
                    {socialMediaLinks.map((link) => (
                      <AppButton
                        variant="outline"
                        key={link.platform}
                        linkProps={{
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }}
                        href={link.href}
                      >
                        {link.platform}
                      </AppButton>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* right form */}
          <div className="lg:col-span-3 lg:min-h-0">
            <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:h-full lg:min-h-0">
              <CardContent className="p-6 lg:h-full lg:min-h-0 lg:overflow-y-auto">
                <div className="mb-5">
                  <p className="text-sm font-semibold text-white">
                    Send a message
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    We usually respond within 24 hours.
                  </p>
                </div>

                {status === "sent" && (
                  <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
                    ✅ Message sent! We’ll get back to you soon.
                  </div>
                )}

                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-white/80" htmlFor="name">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={onChange("name")}
                      className={cn(
                        "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
                        errors.name && "border-red-300/40",
                      )}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                    <FieldError msg={errors.name} />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label className="text-white/80" htmlFor="email">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={form.email}
                        onChange={onChange("email")}
                        className={cn(
                          "h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
                          errors.email && "border-red-300/40",
                        )}
                        placeholder="you@example.com"
                        autoComplete="email"
                        inputMode="email"
                      />
                      <FieldError msg={errors.email} />
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-white/80" htmlFor="phone">
                        Phone (optional)
                      </Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={onChange("phone")}
                        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
                        placeholder="+977..."
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-white/80" htmlFor="message">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={onChange("message")}
                      className={cn(
                        "min-h-[140px] rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45",
                        errors.message && "border-red-300/40",
                      )}
                      placeholder="Tell us what you need… (catering, reservation, feedback)"
                    />
                    <FieldError msg={errors.message} />
                  </div>

                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-white/45">
                      By sending, you agree we can contact you back.
                    </p>

                    <Button
                      className="rounded-2xl"
                      type="submit"
                      variant="outline"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
