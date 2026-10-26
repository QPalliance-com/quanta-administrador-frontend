import type { ReconciliationStatus } from '@/core/models';

export type TagSeverity = 'success' | 'warn' | 'danger' | 'secondary' | 'info';

export const RECONCILIATION_META: Record<
    ReconciliationStatus,
    { label: string; severity: TagSeverity; needsAttention: boolean; explanation: string }
> = {
    IN_SYNC: {
        label: 'Conciliado',
        severity: 'success',
        needsAttention: false,
        explanation: 'MercadoPago y Quanta coinciden.'
    },
    IN_PROGRESS: {
        label: 'En proceso',
        severity: 'secondary',
        needsAttention: false,
        explanation: 'Ambos siguen pendientes: no hay nada que hacer hasta que MercadoPago cierre el pago.'
    },
    PENDING_LOCAL_UPDATE: {
        label: 'Pendiente de actualizar',
        severity: 'warn',
        needsAttention: true,
        explanation: 'MercadoPago ya cerró el pago y Quanta lo tiene pendiente. Es la señal de un webhook perdido.'
    },
    MISSING_LOCAL: {
        label: 'Sin registro en Quanta',
        severity: 'danger',
        needsAttention: true,
        explanation: 'MercadoPago tiene el pago y Quanta no tiene ningún registro de él.'
    },
    MISMATCH: {
        label: 'Inconsistente',
        severity: 'danger',
        needsAttention: true,
        explanation: 'MercadoPago y Quanta tienen resultados contradictorios para este pago.'
    }
};

export const MP_STATUS_META: Record<string, { label: string; severity: TagSeverity }> = {
    approved: { label: 'Aprobado', severity: 'success' },
    authorized: { label: 'Autorizado', severity: 'success' },
    pending: { label: 'Pendiente', severity: 'warn' },
    in_process: { label: 'En proceso', severity: 'warn' },
    in_mediation: { label: 'En mediación', severity: 'warn' },
    rejected: { label: 'Rechazado', severity: 'danger' },
    cancelled: { label: 'Cancelado', severity: 'secondary' },
    refunded: { label: 'Reembolsado', severity: 'secondary' },
    charged_back: { label: 'Contracargo', severity: 'danger' }
};

export const STATUS_FILTER_OPTIONS: { label: string; value: string | null }[] = [
    { label: 'Todos los estados', value: null },
    { label: 'Aprobado', value: 'approved' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'En proceso', value: 'in_process' },
    { label: 'Rechazado', value: 'rejected' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Reembolsado', value: 'refunded' }
];

/** MercadoPago no pagina más allá del resultado 10 000. */
export const MAX_MP_RESULTS = 10_000;

export const PAGE_SIZE_OPTIONS = [10, 20, 50];

/** Última página que se puede pedir (regla de la tarea): floor(10000 / pageSize) + 1. */
export function lastAllowedPage(pageSize: number): number {
    return Math.floor(MAX_MP_RESULTS / pageSize) + 1;
}

/** Total que se ofrece al paginador: nunca permite navegar más allá de la última página permitida. */
export function reachableRecords(total: number, pageSize: number): number {
    return Math.min(total, lastAllowedPage(pageSize) * pageSize);
}

/** Rango por defecto: los últimos 7 días, hasta hoy inclusive. */
export function defaultDateRange(today: Date = new Date()): Date[] {
    const begin = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return [begin, new Date(today.getFullYear(), today.getMonth(), today.getDate())];
}

/** Estado de MercadoPago con texto en español; un estado desconocido se muestra tal cual. */
export function mpStatus(status: string): { label: string; severity: TagSeverity } {
    return MP_STATUS_META[status] ?? { label: status, severity: 'secondary' };
}
