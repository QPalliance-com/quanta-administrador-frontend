import type { AbstractControl } from '@angular/forms';
import type { ExpiringLot, ExtendableLot, LicenceLot, LicenceLotStatus, LicenceProfile, PeriodCatalog, RenewalType } from '@/core/models';

export type TagSeverity = 'success' | 'warn' | 'danger' | 'secondary';

export const PROFILE_LABELS: Record<LicenceProfile, string> = {
    system_admin: 'Administrador',
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

export function formatIsoDate(iso: string): string {
    const [year, month, day] = iso.slice(0, 10).split('-');
    return `${day}/${month}/${year}`;
}

/** Lote vigente (active/expiring) = renovación anticipada; en gracia o vencido = reactivación. */
export function renewalTypeFor(status: LicenceLotStatus): RenewalType {
    return status === 'active' || status === 'expiring' ? 'early' : 'reactivation';
}

/** Anticipada suma días al vencimiento actual; reactivación cuenta desde hoy (regla de B11). */
export function calcNewEndDate(lot: ExtendableLot, durationDays: number, today: Date = new Date()): Date {
    const base = renewalTypeFor(lot.status) === 'early' ? fromIsoDate(lot.endDate) : today;
    return addDays(base, durationDays);
}

export type UrgencyKey = 'critical' | 'urgent' | 'upcoming';

export const URGENCY_META: Record<UrgencyKey, { label: string; severity: 'danger' | 'warn' | 'info' }> = {
    critical: { label: 'Crítico', severity: 'danger' },
    urgent: { label: 'Urgente', severity: 'warn' },
    upcoming: { label: 'Próximo', severity: 'info' }
};

/** Crítico: 8 días o menos, o ya en gracia. Urgente: 15 o menos. Próximo: 30 o menos. */
export function urgencyOf(lot: Pick<ExpiringLot, 'daysRemaining' | 'status'>): UrgencyKey | null {
    if (lot.status === 'grace_period' || lot.daysRemaining <= 8) return 'critical';
    if (lot.daysRemaining <= 15) return 'urgent';
    if (lot.daysRemaining <= 30) return 'upcoming';
    return null;
}

export interface UrgencyGroup {
    key: UrgencyKey;
    lots: ExpiringLot[];
}

/** Agrupa por urgencia (omite los grupos vacíos) y ordena cada grupo del más cercano al más lejano. */
export function groupByUrgency(lots: ExpiringLot[]): UrgencyGroup[] {
    return (['critical', 'urgent', 'upcoming'] as UrgencyKey[])
        .map((key) => ({
            key,
            lots: lots.filter((lot) => urgencyOf(lot) === key).sort((a, b) => a.daysRemaining - b.daysRemaining)
        }))
        .filter((group) => group.lots.length > 0);
}

/** Formatea un monto en la moneda indicada (USD por defecto: así se cargan los pagos de lotes). */
export function formatMoney(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount);
}

const DAYS_PER_MONTH = 30;
const MS_PER_DAY = 86_400_000;

/**
 * Precio en USD de UNA licencia por todo el periodo. Misma regla que `LicencePeriodPricing.unitPrice` del backend:
 * mensual × (días / 30) × (1 − descuento), redondeado al entero.
 */
export function unitPriceUsd(monthlyUsd: number, period: Pick<PeriodCatalog, 'durationDays' | 'discountPct'>): number {
    return Math.round(((monthlyUsd * period.durationDays) / DAYS_PER_MONTH) * ((100 - period.discountPct) / 100));
}

function daysBetween(from: Date, to: Date): number {
    return Math.round(
        (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) - Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) / MS_PER_DAY
    );
}

/** Días que le quedan al lote, acotados a [0, duración del periodo] (igual que `calculate_prorated_amount_v2`). */
export function remainingDays(today: Date, endDate: Date, totalPeriodDays: number): number {
    return Math.max(0, Math.min(daysBetween(today, endDate), totalPeriodDays));
}

/** Monto al sumar licencias a un lote vigente: precio del periodo prorrateado por los días restantes. */
export function proratedAmountUsd(unitPrice: number, quantity: number, daysRemaining: number, totalPeriodDays: number): number {
    return Math.round((unitPrice * daysRemaining * quantity) / totalPeriodDays);
}

/**
 * Rellena el monto calculado mientras el admin no lo haya tocado: si lo escribió a mano (dirty) se respeta.
 * `emitEvent: false` evita que el propio relleno vuelva a disparar el recálculo.
 */
export function syncCalculatedAmount(control: AbstractControl | null, calculated: number | null): void {
    if (!control || control.dirty) return;
    control.setValue(calculated, { emitEvent: false });
}

/**
 * Monto de un periodo completo: es el prorrateo con todos los días restantes. Así el backend cobra la activación,
 * el lote nuevo, la renovación y el checkout PSE, y todo el cálculo pasa por la misma función.
 */
export function fullPeriodAmountUsd(unitPrice: number, quantity: number, periodDays: number): number {
    return proratedAmountUsd(unitPrice, quantity, periodDays, periodDays);
}

/** ms-admin solo deja pagar por PSE perfiles comprables: system_admin es licencia de cortesía (APPLICATION - 41). */
export const PURCHASABLE_PROFILE_OPTIONS = PROFILE_OPTIONS.filter((option) => option.value !== 'system_admin');
