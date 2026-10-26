export interface Department {
    id: number;
    name: string;
    countryCode?: string;
}
export interface City {
    id: number;
    name: string;
    departmentId: number;
}
