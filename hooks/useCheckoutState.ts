"use client";

import * as React from "react";
import { isEmptyAddress } from "@/lib/types/checkout.types";
import { normalizeNepalPhone } from "@/lib/validators/auth";
import type {
  PaymentMethod,
  CheckoutAddressForm,
} from "../lib/types/checkout.types";
import type { User } from "../lib/types/profile";
import type { Address } from "../lib/types/profile";
export function useCheckoutState(user: User, cartCount: number) {
  const isLoggedIn = Boolean(user);
  const savedAddresses = React.useMemo<Address[]>(
    () => user?.addresses ?? [],
    [user],
  );

  const [addressMode, setAddressMode] = React.useState<"saved" | "temporary">(
    savedAddresses.length > 0 ? "saved" : "temporary",
  );
  const [selectedSavedId, setSelectedSavedId] = React.useState<string>(
    savedAddresses[0]?._id ?? "",
  );

  const [tempAddress, setTempAddress] = React.useState<CheckoutAddressForm>({
    label: "Home",
    addressLine: "",
    city: "",
    notes: "",
    phone: "",
    fullName: "",
  });

  const [guestAddress, setGuestAddress] = React.useState<CheckoutAddressForm>({
    label: "Home",
    addressLine: "",
    city: "",
    notes: "",
    phone: "",
    fullName: "",
  });

  const [payment, setPayment] = React.useState<PaymentMethod>("cod");

  React.useEffect(() => {
    if (!isLoggedIn) return;

    if (savedAddresses.length === 0) {
      setAddressMode("temporary");
      setSelectedSavedId("");
      return;
    }

    if (!selectedSavedId) {
      setSelectedSavedId(savedAddresses[0]!._id);
      setAddressMode("saved");
    }
  }, [isLoggedIn, savedAddresses, selectedSavedId]);

  const chosenAddress = React.useMemo<Address | null>(() => {
    if (!isLoggedIn) return null;

    if (addressMode === "saved") {
      return savedAddresses.find((a) => a._id === selectedSavedId) ?? null;
    }

    return {
      _id: "temporary",
      label: tempAddress.label,
      addressLine: tempAddress.addressLine,
      city: tempAddress.city,
      notes: tempAddress.notes,
    };
  }, [addressMode, isLoggedIn, savedAddresses, selectedSavedId, tempAddress]);

  const chosenPhone = React.useMemo(() => {
    if (isLoggedIn)
      return normalizeNepalPhone(tempAddress.phone || user?.phone || "");
    return normalizeNepalPhone(guestAddress.phone);
  }, [guestAddress.phone, isLoggedIn, tempAddress.phone, user?.phone]);

  const canSubmit = React.useMemo(() => {
    if (cartCount === 0) return false;

    if (isLoggedIn) {
      if (addressMode === "saved") return Boolean(chosenAddress);
      return !isEmptyAddress(tempAddress);
    }

    return !isEmptyAddress(guestAddress) && chosenPhone.length >= 7;
  }, [
    addressMode,
    cartCount,
    chosenAddress,
    chosenPhone.length,
    guestAddress,
    isLoggedIn,
    tempAddress,
  ]);

  return {
    isLoggedIn,
    savedAddresses,
    addressMode,
    setAddressMode,
    selectedSavedId,
    setSelectedSavedId,
    tempAddress,
    setTempAddress,
    guestAddress,
    setGuestAddress,
    chosenAddress,
    chosenPhone,
    payment,
    setPayment,
    canSubmit,
  };
}
