export enum ProductionType {
    make_to_order = 'make_to_order',
    make_to_stock = 'make_to_stock',
    hybrid = 'hybrid'
}

export const PRODUCTION_TYPE_LABELS: Record<ProductionType, string> = {
    [ProductionType.make_to_order]: 'Make to Order',
    [ProductionType.make_to_stock]: 'Make to Stock',
    [ProductionType.hybrid]: 'Híbrido'
};
