/** Returns auth token when running in the browser. */
export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  return Boolean(getAuthToken());
}
