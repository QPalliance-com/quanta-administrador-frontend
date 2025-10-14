import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DepartmentCityService {
    constructor(private httpClient: HttpClient) {}

    getDepartments() {
        return this.httpClient.get<any[]>('https://api-colombia.com/api/v1/Department');
    }
    getCitiesByDepartment(idDepartment: number | string) {
        return this.httpClient.get<any[]>(`https://api-colombia.com/api/v1/Department/${idDepartment}/cities`);
    }
    getAllCities() {
        return this.httpClient.get<any[]>('https://api-colombia.com/api/v1/City');
    }
}
