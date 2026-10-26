import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from 'primeng/api';

const MENU_ITEMS: MenuItem[] = [
    {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                routerLink: ['/dashboard'],
                description: 'Panel principal del administrador'
            }
        ]
    },
    {
        label: 'Empresas',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'Listado de Empresas',
                icon: 'pi pi-list',
                routerLink: ['/companies/list'],
                description: 'Gestión de empresas registradas'
            }
        ]
    },
    {
        label: 'Facturación',
        icon: 'pi pi-fw pi-wallet',
        items: [
            {
                label: 'Licencias',
                icon: 'pi pi-id-card',
                routerLink: ['/settings/licences/list'],
                description: 'Configuración de las licencias de suscripción del sistema'
            },
            {
                label: 'Gracia y Alertas',
                icon: 'pi pi-bell',
                routerLink: ['/settings/licences/config'],
                description: 'Periodo de gracia y alertas de vencimiento de licencias'
            },
            {
                label: 'Pagos MercadoPago',
                icon: 'pi pi-credit-card',
                routerLink: ['/billing/mercadopago-payments'],
                description: 'Pagos de MercadoPago y su conciliación con Quanta'
            }
        ]
    },
    {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        items: [
            {
                label: 'Listado de Usuarios',
                icon: 'pi pi-list',
                routerLink: ['/users/list'],
                description: 'Gestión de usuarios del sistema'
            }
        ]
    },
    {
        label: 'Configuración',
        icon: 'pi pi-fw pi-cog',
        items: [
            {
                label: 'Días No Laborables',
                icon: 'pi pi-calendar-plus',
                routerLink: ['/settings/holidays/list'],
                description: 'Calendario de festivos nacionales para efectos de costeo'
            }
        ]
    }
];

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menuItemsSignal = signal<MenuItem[]>(MENU_ITEMS);
    private isLoadingSubject = new BehaviorSubject<boolean>(false);

    menuItems = this.menuItemsSignal.asReadonly();
    isLoading$ = this.isLoadingSubject.asObservable();

    constructor() {
        this.isLoadingSubject.next(false);
    }

    getMenuItems(): MenuItem[] {
        return this.menuItemsSignal();
    }
}
