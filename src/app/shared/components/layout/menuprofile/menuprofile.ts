import { Component, computed, effect, ElementRef, inject, OnDestroy, Renderer2, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { LayoutService } from '../services/layout.service';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import * as AuthActions from '@/features/auth/state/actions/auth.actions';

@Component({
    selector: '[app-menu-profile]',
    standalone: true,
    imports: [CommonModule, TooltipModule, ButtonModule, RouterModule, SkeletonModule],

    templateUrl: './menuprofile.html',
    styleUrl: './menuprofile.scss',
    animations: [
        trigger('menu', [
            transition('void => inline', [style({ height: 0 }), animate('400ms cubic-bezier(0.86, 0, 0.07, 1)', style({ opacity: 1, height: '*' }))]),
            transition('inline => void', [animate('400ms cubic-bezier(0.86, 0, 0.07, 1)', style({ opacity: 0, height: '0' }))]),
            transition('void => overlay', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('.12s cubic-bezier(0, 0, 0.2, 1)')]),
            transition('overlay => void', [animate('.1s linear', style({ opacity: 0 }))])
        ])
    ],
    host: {
        class: 'layout-menu-profile'
    }
})
export class MenuprofileComponent implements OnDestroy {
    private destroy$ = new Subject<void>();
    _layoutService = inject(LayoutService);
    private store = inject(Store);

    renderer = inject(Renderer2);
    el = inject(ElementRef);

    // Placeholder user data - will be replaced when AuthService is implemented
    user$ = signal({ names: 'Admin', lastNames: 'User', imageUrl: 'assets/images/avatar.png', position: 'Administrador', id: 1 });
    loading$ = signal(false);

    isHorizontal = computed(() => this._layoutService.isHorizontal() && this._layoutService.isDesktop());
    menuProfileActive = computed(() => this._layoutService.layoutState().menuProfileActive);
    menuProfilePosition = computed(() => this._layoutService.layoutConfig().menuProfilePosition);
    isTooltipDisabled = computed(() => !this._layoutService.isSlim());

    subscription!: Subscription;
    outsideClickListener: any;

    constructor() {
        this.subscription = this._layoutService.overlayOpen$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (this.isHorizontal() && this.menuProfileActive()) {
                this._layoutService.layoutState.update((value) => ({ ...value, menuProfileActive: false }));
            }
        });

        effect(() => {
            if (this.isHorizontal() && this.menuProfileActive() && !this.outsideClickListener) {
                this.bindOutsideClickListener();
            }

            if (!this.menuProfileActive() && this.isHorizontal()) {
                this.unbindOutsideClickListener();
            }
        });
    }

    bindOutsideClickListener() {
        if (this.isHorizontal()) {
            this.outsideClickListener = this.renderer.listen(document, 'click', (event: MouseEvent) => {
                if (this.menuProfileActive()) {
                    const isOutsideClicked = !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target));
                    if (isOutsideClicked) {
                        this._layoutService.layoutState.update((value) => ({ ...value, menuProfileActive: false }));
                    }
                }
            });
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.subscription.unsubscribe();
        this.unbindOutsideClickListener();
    }

    logout() {
        console.log('🚪 Cerrando sesión desde menuprofile...');
        // Despachar la acción de logout que manejará todo el proceso
        this.store.dispatch(AuthActions.logout());
    }

    toggleMenu() {
        this._layoutService.onMenuProfileToggle();
    }
}
