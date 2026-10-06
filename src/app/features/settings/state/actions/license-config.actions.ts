import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LicenseConfig, LicenseConfigOverride, LicenseConfigScope, UpdateLicenseConfigDto } from '@/core/models';

export const LicenseConfigActions = createActionGroup({
    source: 'License Config',
    events: {
        'Load Global': emptyProps(),
        'Load Global Success': props<{ config: LicenseConfig }>(),
        'Load Global Failure': props<{ error: string }>(),

        'Load Overrides': emptyProps(),
        'Load Overrides Success': props<{ overrides: LicenseConfigOverride[] }>(),
        'Load Overrides Failure': props<{ error: string }>(),

        Update: props<{ payload: UpdateLicenseConfigDto }>(),
        'Update Success': props<{ scope: LicenseConfigScope }>(),
        'Update Failure': props<{ error: string }>()
    }
});
