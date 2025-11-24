// src/lib/auth.ts

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('accessToken') || localStorage.getItem('jwtToken');
  return !!token;
}

export function requireAuth(redirectTo = '/'): void {
  if (typeof window === 'undefined') return;
  if (!isAuthenticated()) {
    window.location.href = redirectTo;
  }
}
