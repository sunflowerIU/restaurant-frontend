"use client";

import * as React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Address } from "../../../lib/types/profile";

export function SavedAddressList({
  addresses,
  selectedId,
  onSelect,
}: {
  addresses: Address[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  if (addresses.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/60">
        No saved addresses. Use the Temporary tab.
      </div>
    );
  }

  return (
    <RadioGroup
      value={selectedId}
      onValueChange={onSelect}
      className="grid gap-3"
    >
      {addresses.map((a) => (
        <SavedAddressOption
          key={a._id}
          address={a}
          selected={selectedId === a._id}
        />
      ))}
    </RadioGroup>
  );
}

function SavedAddressOption({
  address,
  selected,
}: {
  address: Address;
  selected: boolean;
}) {
  const id = `saved-${address._id}`;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        selected
          ? "border-white/20 bg-white/[0.06]"
          : "border-white/10 bg-white/[0.02]",
      )}
    >
      <div className="flex items-start gap-3">
        <RadioGroupItem
          id={id}
          value={address._id}
          className="mt-1 border-white/30 text-white"
        />
        <Label htmlFor={id} className="cursor-pointer">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">
              {address.label || "Saved address"}
            </p>
            <p className="mt-1 text-sm text-white/65">{address.addressLine}</p>
            <p className="text-sm text-white/65">{address.city}</p>
            {address.notes ? (
              <p className="mt-1 text-xs text-white/50">{address.notes}</p>
            ) : null}
          </div>
        </Label>
      </div>
    </div>
  );
}
