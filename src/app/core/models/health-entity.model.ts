export interface HealthEntity {
    id: number;
    countryCode: string;
    entityTypeId: number;
    entityType: string;
    entityTypeName: string;
    name: string;
    externalCode: string | null;
    mobilityCode: string | null;
    nit: string | null;
    scope: string | null;
    notes: string | null;
    recordState: string;
}

export interface HealthEntityFields {
    entityTypeId: number;
    name: string;
    externalCode: string | null;
    mobilityCode: string | null;
    nit: string | null;
    scope: string | null;
    notes: string | null;
}

export interface CreateHealthEntityDto extends HealthEntityFields {
    countryCode: string;
}

export type UpdateHealthEntityDto = HealthEntityFields;

export interface HealthEntityQuery {
    countryCode: string;
    entityTypeId?: number | null;
}

export interface HealthEntityIdResult {
    id: number;
}
