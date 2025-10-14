import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Department, City } from '@/core/models/department-city.model';
import { DepartmentCityActions } from '../actions/department-city.actions';

export interface DepartmentCityState {
    departments: EntityState<Department>;
    cities: EntityState<City>;
    loading: boolean;
    error: string | null;
}

export const departmentAdapter: EntityAdapter<Department> = createEntityAdapter<Department>();
export const cityAdapter: EntityAdapter<City> = createEntityAdapter<City>();

export const initialState: DepartmentCityState = {
    departments: departmentAdapter.getInitialState(),
    cities: cityAdapter.getInitialState(),
    loading: false,
    error: null
};

export const departmentCityReducer = createReducer(
    initialState,
    // Load Departments
    on(DepartmentCityActions.loadDepartments, (state) => ({
        ...state,
        loading: true
    })),
    on(DepartmentCityActions.loadDepartmentsSuccess, (state, { departments }) => ({
        ...state,
        departments: departmentAdapter.setAll(departments, state.departments),
        loading: false
    })),
    on(DepartmentCityActions.loadDepartmentsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Load Cities
    on(DepartmentCityActions.loadCities, (state) => ({
        ...state,
        loading: true
    })),
    on(DepartmentCityActions.loadCitiesSuccess, (state, { cities }) => ({
        ...state,
        cities: cityAdapter.setAll(cities, state.cities),
        loading: false
    })),
    on(DepartmentCityActions.loadCitiesFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
