"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { apiFetch } from "@/lib/authorization/api";
import type {
  Address,
  NewAddressInput,
  PasswordState,
  UpdateProfile,
} from "@/lib/types/profile";
import * as React from "react";
import { toast } from "sonner";

export function useProfilePage() {
  const { user, setUser } = useAuth();
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [savingPassword, setSavingPassword] = React.useState(false);

  const [password, setPassword] = React.useState<PasswordState>({
    current: "",
    new: "",
    confirm: "",
  });

  const [pwdError, setPwdError] = React.useState<string | null>(null);

  const [updatingAddress, setUpdatingAddress] = React.useState(false);
  const [addresses, setAddresses] = React.useState<Address[]>(
    user?.addresses ?? [],
  );
  const [newAddress, setNewAddress] = React.useState<NewAddressInput>({
    label: "Home",
    addressLine: "",
    city: "",
    notes: "",
  });

  async function saveProfile(payload: UpdateProfile) {
    setSavingProfile(true);

    try {
      const response = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json().catch(() => null);
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      toast.success("Profile updated");
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error updating password.",
      );
      console.error(error);
      return false;
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwdError(null);

    if (!password.current.trim()) {
      setPwdError("Current password is required.");
      return;
    }

    if (password.new.length < 8) {
      setPwdError("New password must be at least 8 characters.");
      return;
    }

    if (password.new !== password.confirm) {
      setPwdError("Passwords do not match.");
      return;
    }

    setSavingPassword(true);

    try {
      const response = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: password.new,
            oldPassword: password.current,
          }),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success("Password updated");
      setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error updating password.",
      );
    } finally {
      setSavingPassword(false);
    }
  }

  /////add new address
  async function addAddress(e: React.FormEvent) {
    e.preventDefault();
    if (addresses.length >= 2) {
      return toast.error("maximum two address allowed.");
    }
    if (!newAddress.addressLine.trim() || !newAddress.city.trim()) return;

    //keep old addresses list as reference
    const previousAddresses = addresses;

    //immidately change to new one
    setAddresses((prev) => [{ _id: `${Date.now()}`, ...newAddress }, ...prev]);

    // startTransition(() => {
    //   updateOptimisticAddress({
    //     type: "add",
    //     address: { _id: `${Date.now()}`, ...newAddress },
    //   });
    // });
    setUpdatingAddress(true);
    try {
      const response = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/create-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAddress),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setUpdatingAddress(false);
        return toast.error(data.message);
      }
      setAddresses(data.addresses);
      toast.success("Address Updated");
      setNewAddress({ label: "Home", addressLine: "", city: "", notes: "" });
      setUpdatingAddress(false);
    } catch (error) {
      setUpdatingAddress(false);
      toast.error(
        error instanceof Error ? error.message : "Error updating address.",
      );
      setAddresses(previousAddresses);
    }
  }

  async function removeAddress(id: string) {
    const previousAddresses = addresses;
    setAddresses((prev) => prev.filter((address) => address._id !== id));
    // startTransition(() => {
    //   updateOptimisticAddress({ type: "remove", id });
    // });

    try {
      const response = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/remove-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ addressId: id }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        return toast.error(data.message);
      }

      setAddresses(data.addresses);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error updating address.",
      );
      setAddresses(previousAddresses);
    }
  }

  return {
    user,
    setUser,
    savingProfile,
    saveProfile,
    savingPassword,
    password,
    setPassword,
    pwdError,
    changePassword,
    addresses,
    newAddress,
    setNewAddress,
    addAddress,
    removeAddress,
    updatingAddress,
  };
}
