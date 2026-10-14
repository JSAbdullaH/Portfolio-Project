const TOKEN = "site14_token";
const USER = "site14_user";

export type StoredUser = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

export function saveSession(token: string, user: StoredUser) {
  try {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));
  } catch {
    // private windows can refuse storage; the page still works for this visit
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN);
  } catch {
    return null;
  }
}

export function getUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(USER);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  } catch {
    // nothing to do
  }
}