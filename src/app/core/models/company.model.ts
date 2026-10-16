export interface Company {
    id: number;
    logoUrl: string; // obligatorio, se imprime en reportes
    companyName: string;
    legalType?: 'natural' | 'juridical'; // persona natural o jurídica
    documentType?: string;
    identificationType: string; // code del tipo según el país (catálogo identification-types)
    numberIdentification: string;
    verificationDigit: string;
    email: string;
    emailBilling?: string; // email para facturación
    rutFileUrl?: string; // archivo cargado
    taxRegistrationDocUrl?: string;
    certificateFile?: string; // certificado de existencia y representación legal
    taxRegime?: string; // desplegable
    taxResponsibility?: string; // desplegable
    providerCustomerPmId: string;
    identifyProvider: string;
    tenantSlug: string;
    sector?: string; // sector económico
    website: string;
    currency?: string; // moneda principal de transacción
    orgChartFile?: string; // archivo pdf organigrama
    address: string;
    departmentId: number;
    cityId: number;
    countryCode?: string; // país de la compañía, inmutable tras la creación
    names?: string;
    lastNames?: string;
    phone?: string;
    onBoardingComplete?: boolean;
    collaboratorsCount?: number; // asignado automáticamente desde Talento Humano
}

/**
 * Interfaz para peticiones POST y PUT de Companies
 * Define los campos que se envían al backend
 */
export interface CompanyRequest {
    id?: number; // Presente en PUT, ausente en POST
    logoUrl: string;
    companyName: string;
    identificationType: string;
    numberIdentification: string;
    providerCustomerPmId: string;
    identifyProvider: string;
    verificationDigit?: string; // solo si el tipo tiene hasVerificationDigit
    email: string;
    tenantSlug: string;
    taxRegistrationDocUrl: string;
    website: string;
    address: string;
    departmentId: number;
    cityId: number;
    countryCode?: string; // obligatorio en POST, se omite en PUT (inmutable)
    names?: string;
    lastNames?: string;
    phone?: string;
    onBoardingComplete: boolean;
     postalCode?: string;
    fullNameBilling?: string; // nombre completo para facturación, se imprime en reportes
    emailBilling?: string; // email para facturación, se imprime en reportes
    contactPhoneBilling?: string; // teléfono de contacto para facturación, se imprime en reportes
    collaboratorsCount?: number; // asignado automáticamente desde Talento Humano
}

/**
 * Generar tenantSlug a partir del nombre de la compañía
 * Convierte espacios a guiones y todo a minúsculas
 * @param companyName - Nombre de la compañía
 * @returns tenantSlug formateado
 */
export function generateTenantSlug(companyName: string): string {
    return companyName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''); // elimina caracteres especiales
}
