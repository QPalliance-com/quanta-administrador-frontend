import { DocumentType } from '../enums/document-type.enum';
export interface Company {
    id: number;
    logoUrl: string; // obligatorio, se imprime en reportes
    companyName: string;
    legalType: 'natural' | 'juridical'; // persona natural o jurídica
    documentType: DocumentType;
    numberIdentification: string;
    verificationDigit: string;
    email: string;
    rutFileUrl: string; // archivo cargado
    certificateFile: string; // certificado de existencia y representación legal
    taxRegime: string; // desplegable
    taxResponsibility: string; // desplegable
    identificationType?: string;
    providerCustomerPmId?: string;
    identifyProvider?: string;
    tenantSlug?: string;
    rutUrl?: string;
    sector?: string; // sector económico
    website: string;
    currency: string; // moneda principal de transacción
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
