export enum DocumentType {
    NIT = 'NIT',
    CC = 'CC',
    CE = 'CE',
    PASSPORT = 'PASSPORT',
    OTHER = 'OTHER'
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
    [DocumentType.NIT]: 'NIT - Número de Identificación Tributaria',
    [DocumentType.CC]: 'Cédula de Ciudadanía',
    [DocumentType.CE]: 'Cédula de Extranjería',
    [DocumentType.PASSPORT]: 'Pasaporte',
    [DocumentType.OTHER]: 'Otro'
};
