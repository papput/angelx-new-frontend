/**
 * Next.js resolves static image imports to { src, width, height }.
 * CRA returned a plain string URL. This helper normalizes both.
 */
export function isStaticImageImport(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.src === "string" &&
    typeof value.width === "number" &&
    typeof value.height === "number"
  );
}

export function getImageSrc(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (isStaticImageImport(value)) return value.src;
  if (typeof value === "object" && typeof value.src === "string") {
    return value.src;
  }
  if (typeof value === "object" && typeof value.default === "string") {
    return value.default;
  }
  if (
    typeof value === "object" &&
    value.default &&
    typeof value.default.src === "string"
  ) {
    return value.default.src;
  }
  return "";
}
