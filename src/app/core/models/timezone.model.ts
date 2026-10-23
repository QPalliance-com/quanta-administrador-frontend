export interface Timezone {
    id: number;
    countryCode: string;
    ianaId: string; // valor que se guarda en admin_company.time_zone, p. ej. America/Bogota
    displayName: string;
    utcOffset: string;
    isDefault: boolean; // zona preseleccionada del país
}
