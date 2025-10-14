import { Component, computed, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { HeaderComponent } from '../header/header';
import { SidebarComponent } from '../sidebar/sidebar';
import { LayoutService } from '../services/layout.service';
import { MessageService } from 'primeng/api';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb';
import { Toast } from 'primeng/toast';
import { ConfiguratorComponent } from '../configurator/configurator';
@Component({
    selector: 'app-main-layout',
    imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, SidebarComponent, BreadcrumbComponent, ConfiguratorComponent],
    templateUrl: './main-layout.html',
    providers: [MessageService],
    styleUrl: './main-layout.scss',
    standalone: true
})
export class MainLayoutComponent implements OnDestroy {
    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;
    menuScrollListener: any;

    @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;
    @ViewChild(HeaderComponent) appTopbar!: HeaderComponent;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    const isOutsideClicked = !(
                        this.appSidebar.appMenu.el.nativeElement.isSameNode(event.target) ||
                        this.appSidebar.appMenu.el.nativeElement.contains(event.target) ||
                        this.appTopbar.menuButton.nativeElement.isSameNode(event.target) ||
                        this.appTopbar.menuButton.nativeElement.contains(event.target)
                    );
                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if ((this.layoutService.isSlim() || this.layoutService.isSlimPlus()) && !this.menuScrollListener) {
                this.menuScrollListener = this.renderer.listen(this.appSidebar.appMenu.menuContainer.nativeElement, 'scroll', (event) => {
                    if (this.layoutService.isDesktop()) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        this.layoutService.reset();
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }

        if (this.menuScrollListener) {
            this.menuScrollListener();
            this.menuScrollListener = null;
        }

        this.unblockBodyScroll();
    }

    containerClass = computed(() => {
        const layoutConfig = this.layoutService.layoutConfig();
        const layoutState = this.layoutService.layoutState();

        return {
            'layout-overlay': layoutConfig.menuMode === 'overlay',
            'layout-static': layoutConfig.menuMode === 'static',
            'layout-slim': layoutConfig.menuMode === 'slim',
            'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
            'layout-horizontal': layoutConfig.menuMode === 'horizontal',
            'layout-reveal': layoutConfig.menuMode === 'reveal',
            'layout-drawer': layoutConfig.menuMode === 'drawer',
            'layout-sidebar-dark': layoutConfig.darkTheme,
            'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
            'layout-overlay-active': layoutState.overlayMenuActive,
            'layout-mobile-active': layoutState.staticMenuMobileActive,
            'layout-topbar-menu-active': layoutState.topbarMenuActive,
            'layout-menu-profile-active': layoutState.rightMenuActive,
            'layout-sidebar-active': layoutState.sidebarActive,
            'layout-sidebar-anchored': layoutState.anchored,
            [`layout-topbar-${layoutConfig.topbarTheme}`]: true,
            [`layout-menu-${layoutConfig.menuTheme}`]: true,
            [`layout-menu-profile-${layoutConfig.menuProfilePosition}`]: true
        };
    });

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
