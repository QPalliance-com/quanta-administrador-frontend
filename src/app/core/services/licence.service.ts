import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Licence } from '@/core/models';
import { ApiResponse } from '@/core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LicenceService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}subscription/plans`;

    /**
     * Obtiene todos los planes de suscripción/licencias
     */
    getLicences(): Observable<ApiResponse<Licence[]>> {
        return this.http.get<ApiResponse<Licence[]>>(this.apiUrl);
    }

    /**
     * Obtiene un plan de suscripción por ID
     */
    getLicence(id: number): Observable<ApiResponse<Licence>> {
        return this.http.get<ApiResponse<Licence>>(`${this.apiUrl}/${id}`);
    }

    /**
     * Crea un nuevo plan de suscripción
     */
    createLicence(licence: Licence): Observable<ApiResponse<Licence>> {
        return this.http.post<ApiResponse<Licence>>(this.apiUrl, licence);
    }

    /**
     * Actualiza un plan de suscripción existente
     */
    updateLicence(id: number, licence: Licence): Observable<ApiResponse<Licence>> {
        return this.http.put<ApiResponse<Licence>>(`${this.apiUrl}/${id}`, licence);
    }

    /**
     * Elimina un plan de suscripción
     */
    deleteLicence(id: number): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
    }
}
