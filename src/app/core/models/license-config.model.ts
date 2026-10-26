export type LicenseConfigScope = 'global' | 'company';

export interface LicenseConfig {
    id: number;
    scope: LicenseConfigScope;
    companyId: number | null;
    gracePeriodDays: number;
    alertDays1: number;
    alertDays2: number;
    alertDays3: number;
}

export interface LicenseConfigOverride {
    id: number;
    companyId: number;
    companyName: string;
    gracePeriodDays: number;
    alertDays1: number;
    alertDays2: number;
    alertDays3: number;
}

export interface UpdateLicenseConfigDto {
    scope: LicenseConfigScope;
    companyId?: number; // solo para scope 'company'
    gracePeriodDays: number;
    alertDays1: number;
    alertDays2: number;
    alertDays3: number;
}

export interface UpdateLicenseConfigResult {
    id: number;
}
