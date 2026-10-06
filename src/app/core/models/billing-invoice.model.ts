/**
 * Factura generada por un pago de lote (una por pago con monto). Contrato pendiente de backend:
 * GET companies/{companyId}/billing-invoices y GET billing-invoices/{id}/pdf.
 */
export interface BillingInvoice {
    id: number;
    issueDate: string; // "2026-10-06"
    status: string; // "CHARGED_OK" = cobrada
    currency: string; // "USD"
    totalAmount: number;
    description: string | null; // "Compra de licencias premium (10 usuarios)"
    provider: string | null; // forma de pago: manual_transfer, pse, recurring_card, mercadopago
    paymentReference: string | null;
    lotId: number | null;
}
