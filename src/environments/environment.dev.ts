import { createEnvironment } from './environment.base';

export const environment = createEnvironment({
    baseUrl: 'https://dev.quantapro.com.co',
    production: false,
    environmentName: 'dev'
});
