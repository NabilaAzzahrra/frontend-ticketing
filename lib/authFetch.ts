// lib/authFetch.ts
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const res = await fetch("http://localhost:3001/api/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "lp3i-api-key": "aEof9XqcH34k3g6IbJcQLxGY",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);
  return data.accessToken;
}

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = localStorage.getItem("accessToken");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // ⛔ ACCESS TOKEN EXPIRED
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      localStorage.clear();
      window.location.href = "/";
      throw new Error("Session expired");
    }

    // 🔁 ULANG REQUEST DENGAN TOKEN BARU
    res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res;
}
