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
    private readonly baseUrl = `${environment.apiUrl}/admin/subscription-plan`;

    // Obtener el plan único del sistema
    getPlan(): Observable<ApiResponse<SubscriptionPlan>> {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<SubscriptionPlan[]>>('data/subscription/subscription-plans.json').pipe(
                map(response => ({
                    ...response,
                    data: response.data[0] // Obtener el primer (y único) plan
                }))
            );
        }
        return this.http.get<ApiResponse<SubscriptionPlan>>(this.baseUrl);
    }

    // Actualizar el plan único del sistema
    updatePlan(plan: UpdateSubscriptionPlanRequest): Observable<ApiResponse<SubscriptionPlan>> {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<SubscriptionPlan[]>>('data/subscription/subscription-plans.json').pipe(
                map(response => ({
                    ...response,
                    message: 'Plan actualizado exitosamente',
                    data: response.data[0]
                }))
            );
        }
        return this.http.put<ApiResponse<SubscriptionPlan>>(this.baseUrl, plan);
    }
}
