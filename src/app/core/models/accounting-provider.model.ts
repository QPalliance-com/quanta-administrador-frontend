/** Campo del formulario de credenciales que declara cada proveedor en su credentialSchema. */
export interface CredentialField {
    key: string;
    label: string;
    type: 'text' | 'password';
    secret: boolean;
    required: boolean;
}

export interface CredentialSchema {
    fields: CredentialField[];
}

/** Proveedor del catálogo (GET admin/accounting-providers). */
export interface AccountingProviderOption {
    id: number;
    code: string;
    name: string;
    authType: string;
    hasTestEnv: boolean;
    credentialSchema: CredentialSchema | null;
}

/** Configuración del facturador de una empresa (GET companies/{id}/accounting-provider); nunca trae secretos. */
export interface AccountingProviderConfig {
    id: number;
    companyId: number;
    provider: AccountingProviderOption;
    // string abierto: los valores distintos de 'active' no están definidos todavía
    status: string;
    testConnected: boolean;
    testConnectedAt: string | null;
    prodConnected: boolean;
    prodConnectedAt: string | null;
}

/** Ambientes del facturador; literales del backend (AccountingEnvironmentEnum). */
export type AccountingEnvironment = 'test' | 'prod';

export interface SaveCredentialsRequest {
    providerId: number;
    environment: AccountingEnvironment;
    credentials: Record<string, string>;
}

export interface SaveCredentialsResult {
    id: number;
    status: string;
    testConnected: boolean;
    testConnectedAt: string | null;
    prodConnected: boolean;
    prodConnectedAt: string | null;
}
