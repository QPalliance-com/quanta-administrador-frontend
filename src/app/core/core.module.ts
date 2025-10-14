import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { departmentCityReducer } from './state/reducers/department-city.reducer';
import { DepartmentCityEffects } from './state/effects/department-city.effects';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule.forFeature('departmentCity', departmentCityReducer), EffectsModule.forFeature([DepartmentCityEffects])],
    providers: [DepartmentCityEffects]
})
export class CoreModule {}
