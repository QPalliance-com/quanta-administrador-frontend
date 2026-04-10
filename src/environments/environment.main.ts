import { createEnvironment } from './environment.base';

export const environment = createEnvironment({
    baseUrl: 'https://api.quantapro.com.co',
    production: true,
    environmentName: 'main',
    cognitoRedirectUrl: 'https://app.quantapro.com.co/auth/callback'
});
