import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentCityState, departmentAdapter, cityAdapter } from '../reducers/department-city.reducer';

export const selectDepartmentCityState = createFeatureSelector<DepartmentCityState>('departmentCity');

export const {
    selectAll: selectAllDepartments,
    selectEntities: selectDepartmentEntities,
    selectIds: selectDepartmentIds
} = departmentAdapter.getSelectors(createSelector(selectDepartmentCityState, (state) => state.departments));

export const {
    selectAll: selectAllCities,
    selectEntities: selectCityEntities,
    selectIds: selectCityIds
} = cityAdapter.getSelectors(createSelector(selectDepartmentCityState, (state) => state.cities));

export const selectDepartmentsLoaded = createSelector(
    selectDepartmentCityState,
    (state) => state.departmentsLoaded
);

export const selectCitiesLoaded = createSelector(
    selectDepartmentCityState,
    (state) => state.citiesLoaded
);

export const selectDepartmentCityLoading = createSelector(
    selectDepartmentCityState,
    (state) => state.loading
);

export const selectDepartmentCityError = createSelector(
    selectDepartmentCityState,
    (state) => state.error
);

export const selectCitiesByDepartment = (departmentId: number | string) =>
    createSelector(selectAllCities, (cities) =>
        cities.filter((c) => c.departmentId == departmentId)
    );

export const selectDepartmentNameById = (id: number | string) =>
    createSelector(selectDepartmentEntities, (entities) => entities[id]?.name ?? '');

export const selectCityNameById = (id: number | string) =>
    createSelector(selectCityEntities, (entities) => entities[id]?.name ?? '');
