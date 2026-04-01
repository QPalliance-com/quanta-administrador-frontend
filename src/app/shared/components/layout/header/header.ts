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
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from '../services/menu.service';
import { OverlayBadge } from 'primeng/overlaybadge';

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
    private router = inject(Router);
    _layoutService = inject(LayoutService);
    private menuService = inject(MenuService);

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
    @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;
    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef<HTMLButtonElement>;

    items = this.menuService.menuItems;
    loading$ = this.menuService.isLoading$;
   
    constructor() {
        // Menu loading handled by service
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
