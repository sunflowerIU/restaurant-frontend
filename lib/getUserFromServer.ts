// import { cookies } from "next/headers";

"use client";

export async function getUserFromServer() {
  // const cookieStore = await cookies();
  // const refreshToken = cookieStore.get("refreshToken");

  // if (!refreshToken) return { user: null, accessToken: null };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "GET",
    credentials: "include",
    // headers: {
    //   Cookie: `refreshToken=${refreshToken.value}`,
    // },

    cache: "no-store",
  });

  if (!res.ok) {
    return { user: null, accessToken: null };
  }

  const { user, accessToken } = await res.json();

  return { user, accessToken };
}
