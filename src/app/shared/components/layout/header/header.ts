import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { MenuItem } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MegaMenuModule } from 'primeng/megamenu';
import { BadgeModule } from 'primeng/badge';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuSelectors, MenuActions } from '../../../state/layout';
import { OverlayBadge } from 'primeng/overlaybadge';
// import { Notification } from '@/features/settings/models/notification.model';
// import * as notificationSelectors from '@/features/settings/state/selectors/notification.selectors';
@Component({
    selector: '[app-header]',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, FormsModule, ButtonModule, MegaMenuModule, BadgeModule],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    host: {
        class: 'layout-topbar'
    }
})
export class HeaderComponent implements OnDestroy {
    private store = inject(Store);
    private router = inject(Router);
    _layoutService = inject(LayoutService);

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
    @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;
    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef<HTMLButtonElement>;

    items$ = this.store.select(MenuSelectors.selectMenuItems);
    loading$ = this.store.select(MenuSelectors.selectMenuLoading);
   
    constructor() {
        this.store.dispatch(MenuActions.loadMenu());
      
        // Suscribirse para recibir notificaciones nuevas en tiempo real
       
    }

    toggleDarkMode() {
        this._layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
    onMenuButtonClick() {
        this._layoutService.onMenuToggle();
    }

    onRightMenuButtonClick() {
        this._layoutService.openRightMenu();
    }

    toggleConfigSidebar() {
        let layoutState = this._layoutService.layoutState();

        if (this._layoutService.isSidebarActive()) {
            layoutState.overlayMenuActive = false;
            layoutState.overlaySubmenuActive = false;
            layoutState.staticMenuMobileActive = false;
            layoutState.menuHoverActive = false;
            layoutState.configSidebarVisible = false;
        }
        layoutState.configSidebarVisible = !layoutState.configSidebarVisible;
        this._layoutService.layoutState.set({ ...layoutState });
    }

    focusSearchInput() {
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 150);
    }

    onTopbarMenuToggle() {
        this._layoutService.layoutState.update((val) => ({ ...val, topbarMenuActive: !val.topbarMenuActive }));
    }
    goToNotifications() {
        this.router.navigate(['/settings/notifications']);
    }

    ngOnDestroy() {
       
    }
}
