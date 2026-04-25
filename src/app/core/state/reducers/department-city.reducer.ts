import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Department, City } from '@/core/models/department-city.model';
import { DepartmentCityActions } from '../actions/department-city.actions';

export interface DepartmentCityState {
    departments: EntityState<Department>;
    cities: EntityState<City>;
    departmentsLoaded: boolean;
    citiesLoaded: boolean;
    loading: boolean;
    error: string | null;
}

export const departmentAdapter: EntityAdapter<Department> = createEntityAdapter<Department>();
export const cityAdapter: EntityAdapter<City> = createEntityAdapter<City>();

export const initialState: DepartmentCityState = {
    departments: departmentAdapter.getInitialState(),
    cities: cityAdapter.getInitialState(),
    departmentsLoaded: false,
    citiesLoaded: false,
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
        departmentsLoaded: true,
        loading: false
    })),
    on(DepartmentCityActions.loadDepartmentsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Load All Cities
    on(DepartmentCityActions.loadAllCities, (state) => ({
        ...state,
        loading: true
    })),
    on(DepartmentCityActions.loadAllCitiesSuccess, (state, { cities }) => ({
        ...state,
        cities: cityAdapter.setAll(cities, state.cities),
        citiesLoaded: true,
        loading: false
    })),
    on(DepartmentCityActions.loadAllCitiesFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Load Cities by Department (acumula sin reemplazar)
    on(DepartmentCityActions.loadCities, (state) => ({
        ...state,
        loading: true
    })),
    on(DepartmentCityActions.loadCitiesSuccess, (state, { cities }) => ({
        ...state,
        cities: cityAdapter.upsertMany(cities, state.cities),
        loading: false
    })),
    on(DepartmentCityActions.loadCitiesFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
