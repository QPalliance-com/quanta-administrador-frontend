import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseUrl = `${environment.adminApiUrl}admin-user`;

    constructor(private http: HttpClient) {}

    getUsers(): Observable<ApiResponse<User[]>> {
        return this.http.get<ApiResponse<User[]>>(this.baseUrl);
    }

    getUser(id: number): Observable<ApiResponse<User | undefined>> {
        return this.http.get<ApiResponse<User>>(`${this.baseUrl}/${id}`);
    }

    createUser(user: Partial<User>): Observable<ApiResponse<User>> {
        return this.http.post<ApiResponse<User>>(this.baseUrl, user);
    }

    updateUser(id: number, user: Partial<User>): Observable<ApiResponse<User>> {
        return this.http.put<ApiResponse<User>>(`${this.baseUrl}/${id}`, user);
    }

    updateUserStatus(id: number, status: 'active' | 'inactive'): Observable<ApiResponse<User>> {
        return this.http.patch<ApiResponse<User>>(`${this.baseUrl}/${id}/status`, { status });
    }

    deleteUser(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
    }

    searchUsers(query: string): Observable<ApiResponse<User[]>> {
        return this.http.get<ApiResponse<User[]>>(this.baseUrl, { params: { search: query } });
    }
}
