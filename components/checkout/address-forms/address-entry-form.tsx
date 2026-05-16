"use client";

import * as React from "react";

import {
  AddressLineField,
  CityField,
  LabelField,
  NameField,
  NotesField,
  PhoneField,
} from "./fields";
import type { CheckoutAddressForm } from "../../../lib/types/checkout.types";

export function AddressEntryForm({
  value,
  onChange,
}: {
  value: CheckoutAddressForm;
  onChange: (next: CheckoutAddressForm) => void;
}) {
  const uid = React.useId();
  const ids = {
    label: `label-${uid}`,
    fullName: `fullName-${uid}`,
    addressLine: `addressLine-${uid}`,
    city: `city-${uid}`,
    phone: `phone-${uid}`,
    notes: `notes-${uid}`,
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LabelField
          id={ids.label}
          value={value.label}
          onChange={(v) => onChange({ ...value, label: v })}
        />
        <NameField
          id={ids.fullName}
          value={value.fullName}
          onChange={(v) => onChange({ ...value, fullName: v })}
        />
      </div>
      <AddressLineField
        id={ids.addressLine}
        value={value.addressLine}
        onChange={(v) => onChange({ ...value, addressLine: v })}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CityField
          id={ids.city}
          value={value.city}
          onChange={(v) => onChange({ ...value, city: v })}
        />
        <PhoneField
          id={ids.phone}
          value={value.phone}
          onChange={(v) => onChange({ ...value, phone: v })}
        />
      </div>

      <NotesField
        id={ids.notes}
        value={value.notes || ""}
        onChange={(v) => onChange({ ...value, notes: v })}
      />
    </div>
  );
}
