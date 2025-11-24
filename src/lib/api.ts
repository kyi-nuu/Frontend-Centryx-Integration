// Register a new user
export async function registerUser({ email, firstName, lastName, phone }: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}) {
  // Username: part before @ in email
  const username = email.split('@')[0];
  // Generate a strong random password (min 8 chars, upper, lower, digit, special)
  function generateStrongPassword(length = 12) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specials = '!@#$%^&*()-_=+[]{};:,.<>?';
    const all = upper + lower + digits + specials;
    let password = [
      upper[Math.floor(Math.random() * upper.length)],
      lower[Math.floor(Math.random() * lower.length)],
      digits[Math.floor(Math.random() * digits.length)],
      specials[Math.floor(Math.random() * specials.length)]
    ];
    for (let i = password.length; i < length; i++) {
      password.push(all[Math.floor(Math.random() * all.length)]);
    }
    // Shuffle password
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }
    return password.join('');
  }
  const randomPassword = generateStrongPassword(12);
  const payload = {
    username,
    email,
    password1: randomPassword,
    password2: randomPassword,
    first_name: firstName,
    last_name: lastName,
    phone_number: phone,
  };
  const res = await fetch(BASE_URL + "auth/registration/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return await res.json();
}
// src/lib/api.ts
// Utility for backend API requests with JWT support


const BASE_URL = "https://frowsily-hunterlike-eneida.ngrok-free.dev/";

// Fetch all users (admin only)
export async function fetchAllUsers() {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") || localStorage.getItem("jwtToken") : null;
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };
  const res = await fetch(BASE_URL + "integration/users/", {
    method: "GET",
    headers,
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // Helper to get current access token
  function getAccessToken() {
    return typeof window !== "undefined" ? localStorage.getItem("accessToken") || localStorage.getItem("jwtToken") : null;
  }

  // Helper to refresh access token using refresh token
  async function refreshAccessToken() {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
    if (!refreshToken) return null;
    try {
      const res = await fetch(BASE_URL + "auth/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.access) {
        localStorage.setItem("accessToken", data.access);
        return data.access;
      }
      return null;
    } catch {
      return null;
    }
  }

  async function doRequest(token: string | null) {
    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    };
    return fetch(BASE_URL + endpoint, {
      ...options,
      headers,
      credentials: "include",
    });
  }

  let token = getAccessToken();
  let res = await doRequest(token);

  // If unauthorized, try to refresh and retry once
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      res = await doRequest(newToken);
    }
  }

  if (!res.ok) {
    throw new Error(await res.text());
  }
  // Handle 204 No Content (e.g., DELETE)
  if (res.status === 204) {
    return null;
  }
  // If response has content, parse as JSON
  const text = await res.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function login(username: string, password: string) {
  const res = await fetch(BASE_URL + "auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  // Persist tokens returned by the backend (support access/refresh or legacy `token`)
  try {
    if (typeof window !== 'undefined') {
      if (data.access) {
        localStorage.setItem('accessToken', data.access);
      }
      if (data.refresh) {
        localStorage.setItem('refreshToken', data.refresh);
      }
      if (data.token) {
        // legacy single token field
        localStorage.setItem('jwtToken', data.token);
      }
    }
  } catch (e) {
    // ignore storage errors
  }
  return data;
}

export function logout() {
  localStorage.removeItem("jwtToken");
}
