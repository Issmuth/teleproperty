type ShortNumberSuffix = {
  threshold: number;
  label: string;
};

const SHORT_SUFFIXES: ShortNumberSuffix[] = [
  { threshold: 1_000_000_000_000, label: "tril" },
  { threshold: 1_000_000_000, label: "bil" },
  { threshold: 1_000_000, label: "mil" },
  { threshold: 1_000, label: "k" },
];

function trimTrailingZeros(value: string): string {
  return value.replace(/\.0+$|(?<=\.\d*[1-9])0+$/g, "");
}

export function toShortNumber(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  const sign = value < 0 ? "-" : "";
  const absolute = Math.abs(value);

  for (const suffix of SHORT_SUFFIXES) {
    if (absolute >= suffix.threshold) {
      const shortened = absolute / suffix.threshold;
      const fixed = trimTrailingZeros(shortened.toFixed(decimals));
      return `${sign}${fixed} ${suffix.label}`;
    }
  }

  return `${sign}${trimTrailingZeros(absolute.toFixed(0))}`;
}

export function shortenPriceLabel(value: string): string {
  const raw = value.trim();
  if (!raw) {
    return value;
  }

  // Keep existing short labels untouched (e.g. "ETB 8.4M", "9.2 bil").
  if (/\b(k|m|b|t|mil|bil|tril)\b/i.test(raw)) {
    return raw;
  }

  const match = raw.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return raw;
  }

  const [, prefix, numericText, suffix] = match;
  const numeric = Number.parseFloat(numericText.replace(/,/g, ""));

  if (!Number.isFinite(numeric)) {
    return raw;
  }

  const shortened = toShortNumber(numeric);
  return `${prefix}${shortened}${suffix}`.replace(/\s+/g, " ").trim();
}
