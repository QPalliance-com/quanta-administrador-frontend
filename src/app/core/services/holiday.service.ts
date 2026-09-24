import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    ApiResponse,
    HolidayCalendar,
    HolidayCalendarList,
    CreateHolidayDto,
    UpdateHolidayDto,
    BatchImportDto,
    BatchImportResult
} from '@/core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HolidayService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}holidays`;

    getByYear(year: number, countryCode = 'CO'): Observable<ApiResponse<HolidayCalendarList>> {
        return this.http.get<ApiResponse<HolidayCalendarList>>(this.apiUrl, {
            params: { year, country: countryCode }
        });
    }

    create(payload: CreateHolidayDto): Observable<ApiResponse<HolidayCalendar>> {
        return this.http.post<ApiResponse<HolidayCalendar>>(this.apiUrl, { data: payload });
    }

    update(id: number, payload: UpdateHolidayDto): Observable<ApiResponse<HolidayCalendar>> {
        return this.http.put<ApiResponse<HolidayCalendar>>(`${this.apiUrl}/${id}`, { data: payload });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    batchImport(payload: BatchImportDto): Observable<ApiResponse<BatchImportResult>> {
        return this.http.post<ApiResponse<BatchImportResult>>(`${this.apiUrl}/batch`, { data: payload });
    }
}
