import { Component, computed, effect, ElementRef, inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { LayoutService } from '../services/layout.service';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AuthService } from '@/core/services/auth.service';
import { UserService } from '@/core/services/user.service';
import { User } from '@/core/models/user.model';

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
export class MenuprofileComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    _layoutService = inject(LayoutService);
    private authService = inject(AuthService);
    private userService = inject(UserService);

    renderer = inject(Renderer2);
    el = inject(ElementRef);

    user = signal<User | null>(null);
    loading = signal(false);

    avatarUrl = computed(() => {
        const u = this.user();
        if (!u) return 'assets/images/avatar.png';
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(`${u.names} ${u.lastNames}`)}&background=random`;
    });

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

    ngOnInit(): void {
        const token = this.authService.token();
        if (!token) return;

        const userId = this.extractUserIdFromToken(token);
        if (!userId) return;

        this.loading.set(true);
        this.userService.getUser(userId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (response) => {
                if (response.data) this.user.set(response.data as User);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    private extractUserIdFromToken(token: string): number | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const id = payload.id ?? payload.sub ?? payload.userId ?? null;
            return id !== null ? Number(id) : null;
        } catch {
            return null;
        }
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
        this.authService.logout().subscribe();
    }

    toggleMenu() {
        this._layoutService.onMenuProfileToggle();
    }
}
