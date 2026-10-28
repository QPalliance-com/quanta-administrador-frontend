import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    ApiResponse,
    HealthEntity,
    HealthEntityIdResult,
    HealthEntityQuery,
    CreateHealthEntityDto,
    UpdateHealthEntityDto
} from '@/core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HealthEntityService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}health-entities/management`;

    getAll(query: HealthEntityQuery): Observable<ApiResponse<HealthEntity[]>> {
        let params = new HttpParams().set('countryCode', query.countryCode);
        if (query.entityTypeId != null) {
            params = params.set('entityTypeId', query.entityTypeId);
        }
        return this.http.get<ApiResponse<HealthEntity[]>>(this.apiUrl, { params });
    }

    create(payload: CreateHealthEntityDto): Observable<ApiResponse<HealthEntityIdResult>> {
        return this.http.post<ApiResponse<HealthEntityIdResult>>(this.apiUrl, { data: payload });
    }

    update(id: number, countryCode: string, payload: UpdateHealthEntityDto): Observable<ApiResponse<HealthEntityIdResult>> {
        const params = new HttpParams().set('countryCode', countryCode);
        return this.http.put<ApiResponse<HealthEntityIdResult>>(`${this.apiUrl}/${id}`, { data: payload }, { params });
    }

    delete(id: number, countryCode: string): Observable<void> {
        const params = new HttpParams().set('countryCode', countryCode);
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { params });
    }
}
