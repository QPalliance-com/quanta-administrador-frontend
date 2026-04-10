const apiVersion = 'v1';
const ms = (base: string, name: string) =>
    `${base}/quanta-ms-${name}/api/${apiVersion}/${name}/`;

export function createEnvironment(cfg: {
    baseUrl: string;
    production: boolean;
    environmentName: string;
    cognitoRedirectUrl?: string;
}) {
    const { baseUrl } = cfg;
    return {
        production: cfg.production,
        baseUrl,
        environmentName: cfg.environmentName,
        apiUrl: `${baseUrl}/api/${apiVersion}/`,
        authApiUrl:   ms(baseUrl, 'auth'),
        adminApiUrl:  ms(baseUrl, 'admin'),
        systemApiUrl: ms(baseUrl, 'system'),
        companiesApiUrl: ms(baseUrl, 'companies')
    };
}
