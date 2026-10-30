import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccountingEnvironment, AccountingProviderConfig, AccountingProviderOption, SaveCredentialsRequest } from '@/core/models';

export const AccountingProviderActions = createActionGroup({
    source: 'Accounting Provider',
    events: {
        'Load Config': props<{ companyId: number }>(),
        'Load Config Success': props<{ companyId: number; config: AccountingProviderConfig | null }>(),
        'Load Config Failure': props<{ error: string }>(),

        'Load Providers': emptyProps(),
        'Load Providers Success': props<{ providers: AccountingProviderOption[] }>(),
        'Load Providers Failure': props<{ error: string }>(),

        'Save Credentials': props<{ companyId: number; request: SaveCredentialsRequest }>(),
        'Save Credentials Success': props<{ companyId: number; environment: AccountingEnvironment }>(),
        // inline: error de negocio/validación (422) que se pinta en el formulario; el resto va por toast
        'Save Credentials Failure': props<{ environment: AccountingEnvironment; message: string; inline: boolean }>(),

        Reset: emptyProps()
    }
});
