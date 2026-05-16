import { getAccessToken, setAccessToken } from "./token";

export async function apiFetch(url: string, options: RequestInit = {}) {
  let token = getAccessToken();

  //attach token
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });

  //token expired
  if (res.status === 401) {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (refreshResponse.status === 401) {
      window.location.replace("/");
      throw new Error("Session expired. Please login");
    }

    const result = await refreshResponse.json();
    setAccessToken(result.accessToken);

    // retry fetch
    return await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    });
  }
  return res;
}
