import type { LicenceLotStatus, LicenceProfile } from '@/core/models';

export type TagSeverity = 'success' | 'warn' | 'danger' | 'secondary';

export const PROFILE_LABELS: Record<LicenceProfile, string> = {
    administrator: 'Administrador',
    premium: 'Premium',
    standard: 'Estándar'
};

export const PROFILE_OPTIONS: { label: string; value: LicenceProfile }[] = (
    Object.keys(PROFILE_LABELS) as LicenceProfile[]
).map((value) => ({ label: PROFILE_LABELS[value], value }));

export const STATUS_META: Record<LicenceLotStatus, { label: string; severity: TagSeverity }> = {
    active: { label: 'Activo', severity: 'success' },
    expiring: { label: 'Por vencer', severity: 'warn' },
    grace_period: { label: 'En gracia', severity: 'danger' },
    expired: { label: 'Vencido', severity: 'secondary' }
};

/** Color del contador "Días restantes": rojo < 8, naranja < 15, amarillo < 30. */
export function daysLeftClass(days: number): string {
    if (days < 8) return 'text-red-600 dark:text-red-400';
    if (days < 15) return 'text-orange-600 dark:text-orange-400';
    if (days < 30) return 'text-yellow-700 dark:text-yellow-400';
    return 'text-surface-700 dark:text-surface-200';
}

/** Porcentaje de licencias en uso, acotado a 0-100 para pintar la barra. */
export function usagePercent(inUse: number, total: number): number {
    if (total <= 0) return 0;
    return Math.min(100, Math.round((inUse / total) * 100));
}
