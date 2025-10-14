export enum ProductionPriority {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export const PRODUCTION_PRIORITY_LABELS: Record<ProductionPriority, string> = {
    [ProductionPriority.low]: 'Baja',
    [ProductionPriority.medium]: 'Media',
    [ProductionPriority.high]: 'Alta'
};
export const PRODUCTION_PRIORITY_COLORS: Record<ProductionPriority, string> = {
    [ProductionPriority.low]: '#f7b2d9', // mrp-accent
    [ProductionPriority.medium]: '#e85a9b', // mrp-primary-light
    [ProductionPriority.high]: '#d62974' // mrp-primary
};
