import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '@/core/models/api-response.model';
import { Department, City } from '@/core/models/department-city.model';

@Injectable({ providedIn: 'root' })
export class DepartmentCityService {
    private http = inject(HttpClient);
    private readonly baseUrl = environment.adminApiUrl;

    getDepartments() {
        return this.http.get<ApiResponse<Department[]>>(`${this.baseUrl}departments`);
    }

    getCitiesByDepartment(idDepartment: number | string) {
        return this.http.get<ApiResponse<City[]>>(`${this.baseUrl}cities/department/${idDepartment}`);
    }

    getAllCities() {
        return this.http.get<ApiResponse<City[]>>(`${this.baseUrl}cities`);
    }
}
