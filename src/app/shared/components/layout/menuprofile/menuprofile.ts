import { Component, computed, effect, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as userActions from '../../../../features/users/state/actions/user.actions';
import * as fromUser from '../../../../features/users/state/selectors/user.selectors';
import { animate, style, transition, trigger } from '@angular/animations';
import { LayoutService } from '../services/layout.service';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { Subscription } from 'rxjs';

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
    user$ = this.store.select(fromUser.selectCurrentUser);
    loading$ = this.store.select(fromUser.selectUsersLoading);

    renderer = inject(Renderer2);

    el = inject(ElementRef);

    isHorizontal = computed(() => this._layoutService.isHorizontal() && this._layoutService.isDesktop());

    menuProfileActive = computed(() => this._layoutService.layoutState().menuProfileActive);

    menuProfilePosition = computed(() => this._layoutService.layoutConfig().menuProfilePosition);

    isTooltipDisabled = computed(() => !this._layoutService.isSlim());

    subscription!: Subscription;

    outsideClickListener: any;

    constructor() {
        // Simula sesión: carga el usuario con id 1 al inicializar el menú
        this.store.dispatch(userActions.loadUser({ id: 2 }));

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

    toggleMenu() {
        this._layoutService.onMenuProfileToggle();
    }
}
