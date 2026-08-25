export const POS_CONFIG = {
    currency: { locale: "id-ID", prefix: "Rp", fractionDigits: 0 },
    tax: { rate: 0.1, label: "Tax" },
    stock: { lowThreshold: 10 },
    grid: { cardWidth: 210, cardHeight: 0 },
} as const;



export const CATEGORIES = [
    { value: "ALL", label: "Semua" },
    { value: "COFFEE", label: "Coffee" },
    { value: "NON_COFFEE", label: "Non Coffee" },
    { value: "FOOD", label: "Food" },
    { value: "SNACK", label: "Snack"},
] as const;