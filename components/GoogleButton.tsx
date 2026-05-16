"use client";

import { FaGoogle } from "react-icons/fa6";
import AppButton from "@/components/AppButton";
import { startGoogleAuth } from "@/lib/auth-client";

export function GoogleButton() {
  async function handleGoogleContinue() {
    await startGoogleAuth();
  }

  return (
    <AppButton
      onClick={handleGoogleContinue}
      variant="outline"
      className="w-full"
    >
      <FaGoogle />
      Continue with Google
    </AppButton>
  );
}
