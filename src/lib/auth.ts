export function isProtectedRoute(pathname: string) {
  return pathname.startsWith("/dashboard");
}

