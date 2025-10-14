import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseUrl = `${environment.apiUrl}settings/users`;

    constructor(private http: HttpClient) {}

    getUsers(): Observable<ApiResponse<User[]>> {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<User[]>>('data/settings/users.json');
        }
        return this.http.get<ApiResponse<User[]>>(this.baseUrl);
    }

    getUser(id: number): Observable<ApiResponse<User | undefined>> {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<User[]>>('data/settings/users.json').pipe(
                map((resp) => ({
                    ...resp,
                    data: resp.data.find((u) => u.id === id)
                }))
            );
        }
        return this.http.get<ApiResponse<User>>(`${this.baseUrl}/${id}`);
    }

    createUser(user: Partial<User>): Observable<ApiResponse<User>> {
        if (environment.useMockApi) {
            return of({ success: true, message: 'Mock: usuario creado', data: user as User, traceId: 'mock-create' });
        }
        return this.http.post<ApiResponse<User>>(this.baseUrl, user);
    }

    updateUser(id: number, user: Partial<User>): Observable<ApiResponse<User>> {
        if (environment.useMockApi) {
            return of({ success: true, message: 'Mock: usuario actualizado', data: { ...user, id } as User, traceId: 'mock-update' });
        }
        return this.http.put<ApiResponse<User>>(`${this.baseUrl}/${id}`, user);
    }

    updateUserStatus(id: number, status: 'active' | 'inactive'): Observable<ApiResponse<User>> {
        if (environment.useMockApi) {
            // Simula actualización de estado en el mock
            return this.http.get<ApiResponse<User[]>>('data/settings/users.json').pipe(
                map((resp) => {
                    const user = resp.data.find((u) => u.id === id);
                    if (user) user.status = status;
                    return {
                        success: true,
                        message: 'Mock: estado actualizado',
                        data: user as User,
                        traceId: 'mock-update-status'
                    };
                })
            );
        }
        // En backend real, solo envía el campo status
        return this.http.patch<ApiResponse<User>>(`${this.baseUrl}/${id}/status`, { status });
    }

    deleteUser(id: number): Observable<ApiResponse<void>> {
        if (environment.useMockApi) {
            return of({ success: true, message: 'Mock: usuario eliminado', data: undefined, traceId: 'mock-delete' });
        }
        return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
    }

    searchUsers(query: string): Observable<ApiResponse<User[]>> {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<User[]>>('data/settings/users.json').pipe(
                map((resp) => ({
                    ...resp,
                    data: resp.data.filter((u) => u.names?.toLowerCase().includes(query.toLowerCase()) || u.email?.toLowerCase().includes(query.toLowerCase()))
                }))
            );
        }
        return this.http.get<ApiResponse<User[]>>(this.baseUrl, { params: { search: query } });
    }
}
