import type { LoginForm, SignupForm } from "@/lib/types/auth";
import { setAccessToken } from "./authorization/token";
import type { User } from "./types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}
export async function startGoogleAuth() {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  // return;
}

export async function registerUser(payload: SignupForm) {
  try {
    // console.log("API_URL:", API_URL);

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // console.log("after fetch");
    // console.log("status:", response.status);

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    // console.log("response data:", data);

    return data;
  } catch (error) {
    console.error("registerUser failed:", error);
    throw error;
  }
}

export async function loginUser(payload: LoginForm) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Login failed");
  }

  setAccessToken(data.accessToken);

  return data;
}

export async function logoutUser(
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  setUser(null);
  window.location.replace("/");
}

export async function forgotPasswordStarter(email: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Login failed");
    }

    return data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function resetPasswordHandler() {}
