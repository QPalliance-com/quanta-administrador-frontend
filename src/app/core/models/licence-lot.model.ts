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

export interface CreateLicenceLotDto {
    roleTypeProfile: LicenceProfile;
    userCount: number;
    paymentTypeCatalogId: number;
    periodCatalogId: number;
    startDate: string;
    amountCharged: number | null;
    paymentReference: string | null;
    activationNotes: string | null;
}

export interface CreatedLicenceLot {
    id: number;
    roleTypeProfile: LicenceProfile;
    userCount: number;
    startDate: string;
    endDate: string;
    status: LicenceLotStatus;
    paymentType: PaymentTypeRef;
    period: PeriodRef;
}

export interface AddLicencesDto {
    roleTypeProfile: LicenceProfile;
    quantityToAdd: number;
    paymentTypeCatalogId: number;
    periodCatalogId: number;
    amountCharged: number | null;
    paymentReference: string | null;
}

export type AddLicencesAction = 'merged' | 'new_lot';

/** `merged`: trae previous/newUserCount y proratedAmount. `new_lot`: trae userCount, startDate y reason. */
export interface AddLicencesResult {
    action: AddLicencesAction;
    lotId: number;
    endDate: string;
    previousUserCount?: number;
    newUserCount?: number;
    proratedAmount?: number;
    userCount?: number;
    startDate?: string;
    reason?: string;
}

/** Campos mínimos de un lote para poder extenderlo (los comparten el listado F01 y el panel F06). */
export type ExtendableLot = Pick<LicenceLot, 'id' | 'roleTypeProfile' | 'userCount' | 'endDate' | 'status'>;

export interface ExtendLicenceLotDto {
    periodCatalogId: number;
    amountCharged: number | null;
    paymentReference: string | null;
}

export type RenewalType = 'early' | 'reactivation';

export interface ExtendLicenceLotResult {
    lotId: number;
    previousEndDate: string;
    newEndDate: string;
    renewalType: RenewalType;
}

export interface ScheduleMigrationDto {
    newPaymentTypeCatalogId: number;
}

export interface ScheduleMigrationResult {
    lotId: number;
    currentPaymentType: PaymentTypeRef;
    scheduledMigrationTo: PaymentTypeRef;
    effectiveAt: string;
}

export interface GeneratePseLinkDto {
    roleTypeProfile: LicenceProfile;
    userCount: number;
    periodCatalogId: number;
}

export interface PseCheckoutResult {
    paymentUrl: string;
    preferenceId: string;
    totalAmount: number;
    discountApplied: number;
    period: PeriodRef;
}
