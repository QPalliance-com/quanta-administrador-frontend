export interface Licence {
    id: number;
    licences: string; // Tipo de licencia (standard, premium, system_admin, etc.)
    amountCop: number; // Monto en COP
    currency: string; // Moneda (USD, COP, etc.)
    amountUsd: number; // Monto en USD
    exchangeRate: number; // Tasa de cambio
}
