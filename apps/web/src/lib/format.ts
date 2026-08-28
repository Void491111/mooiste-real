import { POS_CONFIG } from "@/config/pos.config";

const { locale, prefix, fractionDigits } = POS_CONFIG.currency;

const moneyFormatter = new Intl.NumberFormat(locale, {
  minimumFractionDigits: fractionDigits,
  maximumFractionDigits: fractionDigits,
});

const timeFormatter = new Intl.DateTimeFormat(locale, {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatMoney(value: number) {
  return `${prefix} ${moneyFormatter.format(value)}`;
}

export function formatTime(iso: string) {
  return timeFormatter.format(new Date(iso));
}