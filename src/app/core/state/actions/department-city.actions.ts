import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Department, City } from '@/core/models/department-city.model';

export const DepartmentCityActions = createActionGroup({
    source: 'Department/City',
    events: {
        // Load Departments
        'Load Departments': emptyProps(),
        'Load Departments Success': props<{ departments: Department[] }>(),
        'Load Departments Failure': props<{ error: string }>(),

        // Load Cities by Department
        'Load Cities': props<{ departmentId: number | string }>(),
        'Load Cities Success': props<{ cities: City[] }>(),
        'Load Cities Failure': props<{ error: string }>()
    }
});
