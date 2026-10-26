export interface CountryCatalog {
    code: string; // ISO 3166-1 alpha-2, ej. CO
    name: string;
    phonePrefix: string;
    currencyCode: string;
}

// Países con departamentos/ciudades disponibles en el backend
export const SUPPORTED_COUNTRY_CODES = ['CO', 'MX'] as const;
