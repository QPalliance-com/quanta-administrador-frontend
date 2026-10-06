/**
 * Conciliación entre el pago en MercadoPago y el registro de Quanta:
 * IN_SYNC coinciden · IN_PROGRESS ambos pendientes · PENDING_LOCAL_UPDATE MP lo cerró y Quanta sigue pendiente
 * · MISSING_LOCAL MP lo tiene y Quanta no · MISMATCH resultados contradictorios.
 */
export type ReconciliationStatus = 'IN_SYNC' | 'IN_PROGRESS' | 'PENDING_LOCAL_UPDATE' | 'MISSING_LOCAL' | 'MISMATCH';

/** Transacción que Quanta registró para el pago; es null cuando no hay registro. */
export interface MercadoPagoLocalPayment {
    transactionId: number;
    engineStatus: string; // CHARGED_OK, ...
    companyId: number;
    companyName: string;
    invoiceId: number | null;
}

export interface MercadoPagoPayment {
    paymentId: string;
    status: string; // approved, rejected, in_process, pending...
    statusDetail: string | null;
    amount: number;
    currency: string;
    paymentMethodId: string | null; // visa, master, pse...
    paymentTypeId: string | null; // credit_card, bank_transfer...
    description: string | null;
    payerEmail: string | null;
    dateCreated: string; // ISO con offset de Bogotá
    dateApproved: string | null;
    dateLastUpdated: string | null;
    externalReference: string | null; // los pagos de lotes usan QUANTA-LOT-{id}
    lotId: number | null;
    reconciliation: ReconciliationStatus;
    local: MercadoPagoLocalPayment | null;
}

export interface MercadoPagoPaymentsPage {
    total: number;
    page: number;
    pageSize: number;
    results: MercadoPagoPayment[];
}

export interface MercadoPagoPaymentFilters {
    beginDate?: string; // YYYY-MM-DD, incluye el día completo (hora de Bogotá)
    endDate?: string;
    status?: string;
    externalReference?: string; // coincidencia exacta
    paymentMethodId?: string;
    page: number; // desde 1
    pageSize: number; // 1 a 50
}
