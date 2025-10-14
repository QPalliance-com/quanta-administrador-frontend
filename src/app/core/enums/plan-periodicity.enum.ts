export enum PlanPeriodicity {
    daily = 'daily',
    weekly = 'weekly'
}

export const PLAN_PERIODICITY_LABELS: Record<PlanPeriodicity, string> = {
    [PlanPeriodicity.daily]: 'Diario',
    [PlanPeriodicity.weekly]: 'Semanal'
};
