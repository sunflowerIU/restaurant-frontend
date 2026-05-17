"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "./Spinner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !isAuthLoading) {
      router.push("/login");
    }
  }, [user, router]);

  if (isAuthLoading) {
    return <Spinner />;
  }

  if (!user) return null;

  return children;
}

export default ProtectedRoute;
