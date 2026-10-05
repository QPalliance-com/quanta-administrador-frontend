import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    AddLicencesDto,
    AddLicencesResult,
    ApiResponse,
    CreateLicenceLotDto,
    CreatedLicenceLot,
    ExpiringLot,
    ExtendLicenceLotDto,
    ExtendLicenceLotResult,
    GeneratePseLinkDto,
    LicenceLotList,
    PseCheckoutResult,
    ScheduleMigrationDto,
    ScheduleMigrationResult
} from '@/core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LicenceLotService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}companies`;

    /** Panel cross-empresa (F06). Endpoint dedicado pendiente de backend: ninguna tarea B01-B18 lo cubre. */
    getExpiring(): Observable<ApiResponse<ExpiringLot[]>> {
        return this.http.get<ApiResponse<ExpiringLot[]>>(`${environment.adminApiUrl}licence-lots/expiring`);
    }

    private lotsUrl(companyId: number): string {
        return `${this.apiUrl}/${companyId}/licence-lots`;
    }

    getByCompany(companyId: number): Observable<ApiResponse<LicenceLotList>> {
        return this.http.get<ApiResponse<LicenceLotList>>(this.lotsUrl(companyId));
    }

    create(companyId: number, payload: CreateLicenceLotDto): Observable<ApiResponse<CreatedLicenceLot>> {
        return this.http.post<ApiResponse<CreatedLicenceLot>>(this.lotsUrl(companyId), { data: payload });
    }

    addLicences(companyId: number, payload: AddLicencesDto): Observable<ApiResponse<AddLicencesResult>> {
        return this.http.post<ApiResponse<AddLicencesResult>>(`${this.lotsUrl(companyId)}/add`, { data: payload });
    }

    extend(companyId: number, lotId: number, payload: ExtendLicenceLotDto): Observable<ApiResponse<ExtendLicenceLotResult>> {
        return this.http.put<ApiResponse<ExtendLicenceLotResult>>(`${this.lotsUrl(companyId)}/${lotId}/extend`, { data: payload });
    }

    generatePseCheckout(companyId: number, payload: GeneratePseLinkDto): Observable<ApiResponse<PseCheckoutResult>> {
        return this.http.post<ApiResponse<PseCheckoutResult>>(`${this.lotsUrl(companyId)}/checkout-pse`, { data: payload });
    }

    scheduleMigration(companyId: number, lotId: number, payload: ScheduleMigrationDto): Observable<ApiResponse<ScheduleMigrationResult>> {
        return this.http.put<ApiResponse<ScheduleMigrationResult>>(`${this.lotsUrl(companyId)}/${lotId}/schedule-migration`, { data: payload });
    }
}
