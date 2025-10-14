export enum PurchaseOrderStatus {
    Solicited = 'solicited',
    Sent = 'sent',
    Approved = 'approved',
    Rejected = 'rejected',
    Closed = 'closed'
}

export const PURCHASE_ORDER_STATUS_LABELS: Record<PurchaseOrderStatus, string> = {
    [PurchaseOrderStatus.Solicited]: 'Solicitada',
    [PurchaseOrderStatus.Sent]: 'Enviada',
    [PurchaseOrderStatus.Approved]: 'Aprobada',
    [PurchaseOrderStatus.Rejected]: 'Rechazada',
    [PurchaseOrderStatus.Closed]: 'Cerrada'
};

export const PURCHASE_ORDER_STATUS_COLORS: Record<PurchaseOrderStatus, string> = {
    [PurchaseOrderStatus.Solicited]: 'blue',
    [PurchaseOrderStatus.Sent]: 'yellow',
    [PurchaseOrderStatus.Approved]: 'green',
    [PurchaseOrderStatus.Rejected]: 'red',
    [PurchaseOrderStatus.Closed]: 'gray'
};
