import { DocumentType } from '../enums/document-type.enum';

export interface Company {
    id: number;
    logoUrl: string; // obligatorio, se imprime en reportes
    companyName: string;
    legalType?: 'natural' | 'juridical'; // persona natural o jurídica
    documentType?: DocumentType;
    identificationType: DocumentType;
    numberIdentification: string;
    verificationDigit: string;
    email: string;
    rutFileUrl?: string; // archivo cargado
    rutUrl?: string;
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
    identificationType: DocumentType;
    numberIdentification: string;
    providerCustomerPmId: string;
    identifyProvider: string;
    verificationDigit: string;
    email: string;
    tenantSlug: string;
    rutUrl: string;
    website: string;
    address: string;
    departmentId: number;
    cityId: number;
    names?: string;
    lastNames?: string;
    phone?: string;
    onBoardingComplete: boolean;
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
