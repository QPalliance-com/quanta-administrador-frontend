// Estado de las tareas del plan de producción
export enum PlanTaskState {
    Pending = 'pending',
    InProgress = 'in_progress',
    Finished = 'finished',
    Interrupted = 'interrupted'
}

export const PLAN_TASK_STATE_LABELS: Record<PlanTaskState, string> = {
    [PlanTaskState.Pending]: 'Pendiente',
    [PlanTaskState.InProgress]: 'En progreso',
    [PlanTaskState.Finished]: 'Finalizada',
    [PlanTaskState.Interrupted]: 'Interrumpida'
};

// Paleta MRP
// $mrp-primary: #d62974;
// $mrp-primary-light: #e85a9b;
// $mrp-primary-dark: #a81e5a;
// $mrp-accent: #f7b2d9;
// $mrp-contrast: #fff;
// $mrp-text: #22223b;
export const PLAN_TASK_STATE_COLORS: Record<PlanTaskState, string> = {
    [PlanTaskState.Pending]: '#e85a9b', // mrp-primary-light
    [PlanTaskState.InProgress]: '#d62974', // mrp-primary
    [PlanTaskState.Finished]: '#22c55e', // green-500 (éxito)
    [PlanTaskState.Interrupted]: '#a81e5a' // mrp-primary-dark
};
// Enums para ProductionPlan centralizados en core/enums

export enum ProductionPlanType {
    AUTO = 'auto',
    MANUAL = 'manual'
}

export enum ProductionPlanPeriodicity {
    DAILY = 'daily',
    WEEKLY = 'weekly'
}

export enum ProductionPlanStatus {
    CREATED = 'created',
    IN_PROGRESS = 'in_progress',
    FINISHED = 'finished'
}

export const PRODUCTION_PLAN_TYPE_LABELS: Record<ProductionPlanType, string> = {
    [ProductionPlanType.AUTO]: 'Automático',
    [ProductionPlanType.MANUAL]: 'Manual'
};

export const PRODUCTION_PLAN_TYPE_COLORS: Record<ProductionPlanType, string> = {
    [ProductionPlanType.AUTO]: '#d62974', // mrp-primary
    [ProductionPlanType.MANUAL]: '#a81e5a' // mrp-primary-dark
};

export const PRODUCTION_PLAN_PERIODICITY_LABELS: Record<ProductionPlanPeriodicity, string> = {
    [ProductionPlanPeriodicity.DAILY]: 'Diario',
    [ProductionPlanPeriodicity.WEEKLY]: 'Semanal'
};

export const PRODUCTION_PLAN_PERIODICITY_COLORS: Record<ProductionPlanPeriodicity, string> = {
    [ProductionPlanPeriodicity.DAILY]: '#22c55e', // green-500
    [ProductionPlanPeriodicity.WEEKLY]: '#f7b2d9' // mrp-accent
};

export const PRODUCTION_PLAN_STATUS_LABELS: Record<ProductionPlanStatus, string> = {
    [ProductionPlanStatus.CREATED]: 'Creado',
    [ProductionPlanStatus.IN_PROGRESS]: 'En progreso',
    [ProductionPlanStatus.FINISHED]: 'Finalizado'
};

export const PRODUCTION_PLAN_STATUS_COLORS: Record<ProductionPlanStatus, string> = {
    [ProductionPlanStatus.CREATED]: '#e85a9b', // mrp-primary-light
    [ProductionPlanStatus.IN_PROGRESS]: '#d62974', // mrp-primary
    [ProductionPlanStatus.FINISHED]: '#22c55e' // green-500
};
