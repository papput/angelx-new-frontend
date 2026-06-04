/** Format INR rate for display; avoids treating 0 as missing. */
export function getDisplayRate(userPrice, basePrice, isFetching) {
  if (isFetching) return null;

  const user = Number(userPrice);
  const base = Number(basePrice);

  if (!Number.isNaN(user) && user > 0) return user;
  if (!Number.isNaN(base) && base > 0) return base;

  return "—";
}
