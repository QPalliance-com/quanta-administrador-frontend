import { createEnvironment } from './environment.base';

export const environment = createEnvironment({
    baseUrl: 'http://localhost:4200',
    production: false,
    environmentName: 'localhost'
});
