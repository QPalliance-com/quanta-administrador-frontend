export enum ProductionStatus {
    waiting = 'waiting',
    in_progress = 'in_progress',
    finished = 'finished',
    interrupted = 'interrupted'
}

export const PRODUCTION_STATUS_LABELS: Record<ProductionStatus, string> = {
    [ProductionStatus.waiting]: 'En Espera',
    [ProductionStatus.in_progress]: 'En Progreso',
    [ProductionStatus.finished]: 'Finalizado',
    [ProductionStatus.interrupted]: 'Interrumpido'
};

export enum ProductionOrderTaskStatus {
    pending = 'pending',
    in_progress = 'in_progress',
    finished = 'finished'
}
export const PRODUCTION_ORDER_TASK_STATUS_LABELS: Record<ProductionOrderTaskStatus, string> = {
    [ProductionOrderTaskStatus.pending]: 'Pendiente',
    [ProductionOrderTaskStatus.in_progress]: 'En Progreso',
    [ProductionOrderTaskStatus.finished]: 'Finalizado'
};
export const PRODUCTION_STATUS_COLORS: Record<ProductionStatus, string> = {
    [ProductionStatus.waiting]: '#e85a9b', // mrp-primary-light
    [ProductionStatus.in_progress]: '#d62974', // mrp-primary
    [ProductionStatus.finished]: '#22c55e', // green-500
    [ProductionStatus.interrupted]: '#a81e5a' // mrp-primary-dark
};

export const PRODUCTION_ORDER_TASK_STATUS_COLORS: Record<ProductionOrderTaskStatus, string> = {
    [ProductionOrderTaskStatus.pending]: '#e85a9b', // mrp-primary-light
    [ProductionOrderTaskStatus.in_progress]: '#d62974', // mrp-primary
    [ProductionOrderTaskStatus.finished]: '#22c55e' // green-500
};
