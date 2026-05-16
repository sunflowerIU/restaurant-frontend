import { Address } from "./profile";

export type CheckoutAddressForm = {
  label: string;
  fullName: string;
  addressLine: string;
  city: string;
  notes?: string;
  phone: string;
};
export type PaymentMethod = "cod" | "prepaid";

export function isEmptyAddress(a: CheckoutAddressForm) {
  return !a.addressLine.trim() || !a.city.trim() || !a.phone.trim();
}

export function addressToString(a: Address) {
  const parts = [
    a.label ? `${a.label}:` : "",
    a.addressLine,
    a.city,
    a.notes ? `(${a.notes})` : "",
  ].filter(Boolean);
  return parts.join(" ");
}
