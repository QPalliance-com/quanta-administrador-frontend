export enum MaterialReceptionStatus {
    pending = 'Pendiente',
    partial = 'Parcial',
    completed = 'Completa'
}
export const MaterialReceptionStatusColors: Record<MaterialReceptionStatus, string> = {
    [MaterialReceptionStatus.pending]: '#e85a9b', // mrp-primary-light
    [MaterialReceptionStatus.partial]: '#d62974', // mrp-primary
    [MaterialReceptionStatus.completed]: '#22c55e' // green-500
};
