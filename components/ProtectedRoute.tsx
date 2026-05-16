"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return children;
}

export default ProtectedRoute;
