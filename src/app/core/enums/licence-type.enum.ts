export enum LicenceType {
    basic = 'basic',
    professional = 'professional',
    enterprise = 'enterprise'
}

export const LICENCE_TYPE_LABELS: Record<LicenceType, string> = {
    [LicenceType.basic]: 'Básica',
    [LicenceType.professional]: 'Profesional',
    [LicenceType.enterprise]: 'Empresarial'
};

export const licenceType = LicenceType;
