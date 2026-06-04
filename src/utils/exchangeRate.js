/**
 * Parse GET /exchange/rate response (supports tier-based and legacy single-rate payloads).
 */
export function parseExchangeRateResponse(responseData) {
  if (!responseData?.success || !responseData?.data) {
    return { rate: null, tiers: [] };
  }

  const payload = responseData.data;

  if (payload.rate != null && !Number.isNaN(Number(payload.rate))) {
    return {
      rate: Number(payload.rate),
      tiers: Array.isArray(payload.tiers) ? payload.tiers : [],
    };
  }

  const tiers = Array.isArray(payload.tiers) ? payload.tiers : [];
  if (tiers.length === 0) {
    return { rate: null, tiers: [] };
  }

  const baseTier =
    tiers.find((t) => String(t.levelName || "").toUpperCase() === "BASE") ||
    tiers[0];

  return {
    rate: Number(baseTier?.priceINR) || null,
    tiers,
  };
}

/** Format backend tiers for the Exchange tier table UI. */
export function formatTiersForDisplay(apiTiers) {
  if (!Array.isArray(apiTiers) || apiTiers.length === 0) {
    return null;
  }

  return apiTiers.map((tier) => {
    const min = tier.minUSDT ?? 0;
    const max = tier.maxUSDT;
    const label =
      max == null
        ? `>= ${min} USDT`
        : `>= ${min} and < ${max} USDT`;

    return {
      label,
      priceINR: Number(tier.priceINR),
      levelName: tier.levelName,
      processingType: tier.processingType,
    };
  });
}
