"use client";

import type { User } from "@/lib/types/profile";
import React, { createContext, use, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthLoading: boolean;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // fetch user
  useEffect(() => {
    //get user from backedn
    async function getUser() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: "GET",
            credentials: "include",

            cache: "no-store",
          },
        );

        if (!res.ok) {
          setUser(null);
          setAccessToken(null);

          return;
        }

        const { user, accessToken } = await res.json();
        setUser(user);
        setAccessToken(accessToken);
      } catch (error) {
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthLoading, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = use(AuthContext);
  if (context === null) throw new Error("context out of range");
  return context;
}

export { AuthProvider, useAuth };
