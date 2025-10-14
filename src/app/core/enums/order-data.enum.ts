export enum OrderType {
    ASC = 'asc',
    DESC = 'desc'
}
export function sortByOrder<T>(data: T[], key: keyof T, order: OrderType = OrderType.ASC): T[] {
    return [...data].sort((a, b) => {
        if (a[key] < b[key]) return order === OrderType.ASC ? -1 : 1;
        if (a[key] > b[key]) return order === OrderType.ASC ? 1 : -1;
        return 0;
    });
}
