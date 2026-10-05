import type { LicenceLot, LicenceLotStatus, LicenceProfile } from '@/core/models';

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

/** "2026-10-01" -> Date local (sin pasar por UTC, que correría el día en Colombia). */
export function fromIsoDate(value: string): Date {
    const [year, month, day] = value.slice(0, 10).split('-').map(Number);
    return new Date(year, month - 1, day);
}

export function toIsoDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/** Misma regla del backend: fecha fin = fecha inicio + duración del periodo en días. */
export function addDays(date: Date, days: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Regla opción C: se fusiona con un lote vigente del mismo perfil y el mismo periodo. */
export function findMergeableLot(
    lots: LicenceLot[],
    profile: LicenceProfile | null,
    periodId: number | null
): LicenceLot | null {
    if (!profile || !periodId) return null;
    return (
        lots.find(
            (lot) =>
                lot.roleTypeProfile === profile &&
                lot.period.id === periodId &&
                (lot.status === 'active' || lot.status === 'expiring')
        ) ?? null
    );
}
