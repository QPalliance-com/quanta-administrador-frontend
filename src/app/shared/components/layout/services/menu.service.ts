import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private readonly baseUrl = `${environment.apiUrl}sys/menu`;

    constructor(private http: HttpClient) {}

    getMenu(): Observable<ApiResponse<MenuItem[]>> {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<MenuItem[]>>('data/menu/menu.json');
        }
        return this.http.get<ApiResponse<MenuItem[]>>(this.baseUrl);
    }
}
