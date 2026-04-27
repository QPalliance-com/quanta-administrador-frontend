import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { SubscriptionPlan, UpdateSubscriptionPlanRequest } from '../models/subscription-plan.model';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionPlanService {
    private http = inject(HttpClient);
    private readonly baseUrl = `${environment.adminApiUrl}subscription/plan`;

    // Obtener el plan único del sistema
    getPlan(): Observable<ApiResponse<SubscriptionPlan>> {
        return this.http.get<ApiResponse<SubscriptionPlan>>(this.baseUrl);
    }

    // Actualizar el plan único del sistema
    updatePlan(plan: UpdateSubscriptionPlanRequest): Observable<ApiResponse<SubscriptionPlan>> {
        return this.http.put<ApiResponse<SubscriptionPlan>>(this.baseUrl, plan);
    }
}
