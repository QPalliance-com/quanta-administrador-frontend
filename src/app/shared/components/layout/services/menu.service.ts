import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private readonly baseUrl = `${environment.apiUrl}sys/menu`;
    private menuItemsSignal = signal<MenuItem[]>([]);
    private isLoadingSubject = new BehaviorSubject<boolean>(false);

    menuItems = this.menuItemsSignal.asReadonly();
    isLoading$ = this.isLoadingSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadMenuItems();
    }

    private loadMenuItems() {
        this.isLoadingSubject.next(true);
        this.getMenu().subscribe({
            next: (response) => {
                this.menuItemsSignal.set(response.data || []);
                this.isLoadingSubject.next(false);
            },
            error: () => {
                this.isLoadingSubject.next(false);
            }
        });
    }

    getMenuItems(): MenuItem[] {
        return this.menuItemsSignal();
    }

    getMenu(): Observable<ApiResponse<MenuItem[]>> {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<MenuItem[]>>('data/menu/menu.json');
        }
        return this.http.get<ApiResponse<MenuItem[]>>(this.baseUrl);
    }
}
