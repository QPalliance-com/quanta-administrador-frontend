// Unificación de efectos de settings
import { UserEffects } from './effects/user.effects';

export const SettingsEffects = [ UserEffects];
/**
 * Feature State Index
 * Este archivo exporta todo lo relacionado con el state del módulo Settings
 */ 

import { ActionReducerMap } from '@ngrx/store';

// System Modules imports


// Feature key
export const settingsFeatureKey = 'settings';

// Importar los states adicionales
import { UserState, userReducer } from './reducers/user.reducer';


// Feature interface
export interface SettingsState {
    users: UserState;
}

// Feature reducer
import { combineReducers } from '@ngrx/store';

export const settingsReducer = combineReducers<SettingsState>({
   users: userReducer,
  });



// Export User
export * from './effects/user.effects';
export { userReducer } from './reducers/user.reducer';
export type { UserState } from './reducers/user.reducer';

