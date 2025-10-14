export enum MaterialDistributionDestinationType {
    internal = 'internal',
    external = 'external'
}

export const MATERIAL_DISTRIBUTION_DESTINATION_TYPE_LABELS: Record<MaterialDistributionDestinationType, string> = {
    [MaterialDistributionDestinationType.internal]: 'Interno',
    [MaterialDistributionDestinationType.external]: 'Externo'
};
export const MaterialDistributionDestinationTypeColors: Record<MaterialDistributionDestinationType, string> = {
    [MaterialDistributionDestinationType.internal]: '#e85a9b', // mrp-primary-light
    [MaterialDistributionDestinationType.external]: '#d62974' // mrp-primary
};
export enum MaterialDistributionStatus {
    pending = 'pending',
    partial = 'partial',
    completed = 'completed'
}
export const MATERIAL_DISTRIBUTION_STATUS_LABELS: Record<MaterialDistributionStatus, string> = {
    [MaterialDistributionStatus.pending]: 'Pendiente',
    [MaterialDistributionStatus.partial]: 'Parcial',
    [MaterialDistributionStatus.completed]: 'Completa'
};
export const MaterialDistributionStatusColors: Record<MaterialDistributionStatus, string> = {
    [MaterialDistributionStatus.pending]: '#e85a9b', // mrp-primary-light
    [MaterialDistributionStatus.partial]: '#d62974', // mrp-primary
    [MaterialDistributionStatus.completed]: '#22c55e' // green-500
};
