import { POS_CONFIG } from "@/config/pos.config";

const { locale, prefix, fractionDigits } = POS_CONFIG.currency;

const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
});

export function formatMoney(value: number) {
    return `${prefix} ${formatter.format(value)}`; 
}