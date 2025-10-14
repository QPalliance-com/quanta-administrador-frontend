export enum ProductType {
    input = 'input',
    final_product = 'final_product'
}
export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
    [ProductType.input]: 'Insumo',
    [ProductType.final_product]: 'Producto final'
};
