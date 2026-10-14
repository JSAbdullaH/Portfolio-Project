const BASE = "api/v1"; 

export type AuthResult = {
  access_token: string;
  user: { id: string; full_name: string; email: string; role: string };
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(BASE + path, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  if (res.status === 204) return undefined as T;

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      body?.error?.message ?? body?.message ?? `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return body as T;
}

export function register(input: {
  company_name: string;
  full_name: string;
  email: string;
  password: string;
}) {
  return request<AuthResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function login(input: { email: string; password: string }) {
  return request<AuthResult>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function me(token: string) {
  return request<AuthResult["user"]>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
