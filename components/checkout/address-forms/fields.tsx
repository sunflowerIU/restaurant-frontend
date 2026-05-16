"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function LabelField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-white/80" htmlFor={id}>
        Label
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
        placeholder="Street, area"
      />
    </div>
  );
}
export function NameField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-white/80" htmlFor={id}>
        Full Name
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
        placeholder="Your Name"
      />
    </div>
  );
}
export function AddressLineField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-white/80" htmlFor={id}>
        Address line
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
        placeholder="Street, area"
      />
    </div>
  );
}

export function CityField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-white/80" htmlFor={id}>
        City
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
        placeholder="Kathmandu"
      />
    </div>
  );
}

export function PhoneField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-white/80" htmlFor={id}>
        Phone
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
        placeholder="+977..."
        inputMode="tel"
        autoComplete="tel"
      />
    </div>
  );
}

export function NotesField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-white/80" htmlFor={id}>
        Notes (optional)
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[110px] rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45"
        placeholder="Landmark, gate, instructions…"
      />
    </div>
  );
}
