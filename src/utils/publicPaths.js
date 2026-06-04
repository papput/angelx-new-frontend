/** Routes anyone can visit without logging in */
const PUBLIC_EXACT = new Set([
  "/",
  "/exchange",
  "/about-us",
  "/contact-us",
  "/disclaimer",
  "/refund-policy",
  "/privacy-policy",
  "/terms-conditions",
  "/terms&conditions",
  "/login",
  "/blogs",
]);

const PUBLIC_PREFIXES = ["/blogs/"];

export function isPublicPath(pathname) {
  if (!pathname) return false;
  if (PUBLIC_EXACT.has(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
