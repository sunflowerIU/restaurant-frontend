"use client";

import type { User } from "@/lib/types/profile";
import React, { createContext, use, useEffect, useState } from "react";
import { setAccessToken } from "../../lib/authorization/token";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({
  children,
  initialUser,
  initialToken,
}: {
  children: React.ReactNode;
  initialUser: User | null;
  initialToken: string | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  //store accessToken
  useEffect(() => {
    if (initialToken) {
      setAccessToken(initialToken);
    }
  }, [initialToken]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
