"use client";

import { useAuth } from "@/app/_providers/AuthProvider";

export function useApiFetch() {
  const { accessToken, setAccessToken } = useAuth();

  async function apiFetch(url: string, options: RequestInit = {}) {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      credentials: "include",
    });

    if (res.status !== 401) {
      return res;
    }

    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!refreshResponse.ok) {
      setAccessToken(null);
      window.location.replace("/login");
      throw new Error("Session expired. Please login again.");
    }

    const result = await refreshResponse.json();
    const newAccessToken = result.accessToken;

    setAccessToken(newAccessToken);

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newAccessToken}`,
      },
      credentials: "include",
    });
  }

  return apiFetch;
}
