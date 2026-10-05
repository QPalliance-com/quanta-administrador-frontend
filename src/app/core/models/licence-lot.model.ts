export type LicenceProfile = 'administrator' | 'premium' | 'standard';

export type LicenceLotStatus = 'active' | 'expiring' | 'grace_period' | 'expired';

export interface PaymentTypeCatalog {
    id: number;
    name: string;
    displayName: string;
    allowsAutoRenewal: boolean;
    country: string | null;
}

export interface PeriodCatalog {
    id: number;
    name: string;
    displayName: string;
    durationDays: number;
    discountPct: number;
}

export interface PaymentTypeRef {
    id: number;
    displayName: string;
}

export interface PeriodRef {
    id: number;
    displayName: string;
    durationDays: number;
}

export interface LicenceExpiryAlert {
    alertType: string; // "30_days" | "15_days" | "8_days"
    notifiedAt: string;
}

export interface LicenceLot {
    id: number;
    roleTypeProfile: LicenceProfile;
    userCount: number;
    startDate: string; // "2026-09-01"
    endDate: string;
    daysRemaining: number;
    status: LicenceLotStatus;
    paymentType: PaymentTypeRef;
    period: PeriodRef;
    scheduledMigrationTo: PaymentTypeRef | null;
    activatedByUserId: number | null;
    activationNotes: string | null;
    alertsSent: LicenceExpiryAlert[];
}

export interface ProfileSummary {
    profile: LicenceProfile;
    totalLicences: number;
    inUse: number;
}

export interface LicenceLotList {
    profileSummary: ProfileSummary[];
    lots: LicenceLot[];
}
