import { Component, computed, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';

import { MenuprofileComponent } from '../menuprofile/menuprofile';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../services/layout.service';
import { MenuComponent } from '../menu/menu';
@Component({
    selector: '[app-sidebar]',
    imports: [MenuComponent, CommonModule, MenuprofileComponent],
    standalone: true,
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnDestroy {
    el = inject(ElementRef);

    _layoutService = inject(LayoutService);

    @ViewChild(MenuComponent) appMenu!: MenuComponent;

    @ViewChild('menuProfileStart') menuProfileStart!: MenuprofileComponent;

    @ViewChild('menuProfileEnd') menuProfileEnd!: MenuprofileComponent;

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    overlayMenuActive = computed(() => this._layoutService.layoutState().overlayMenuActive);

    menuProfilePosition = computed(() => this._layoutService.layoutConfig().menuProfilePosition);

    anchored = computed(() => this._layoutService.layoutState().anchored);

    timeout: any;

    resetOverlay() {
        if (this.overlayMenuActive()) {
            this._layoutService.layoutState.update((val) => ({ ...val, overlayMenuActive: false }));
        }
    }

    onMouseEnter() {
        if (!this.anchored()) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this._layoutService.layoutState.update((val) => ({ ...val, sidebarActive: true }));
        }
    }

    onMouseLeave() {
        if (!this.anchored()) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => this._layoutService.layoutState.update((val) => ({ ...val, sidebarActive: false })), 300);
            }
        }
    }

    anchor() {
        this._layoutService.layoutState.update((val) => ({ ...val, anchored: !val.anchored }));
    }

    ngOnDestroy() {
        this.resetOverlay();
    }
}
