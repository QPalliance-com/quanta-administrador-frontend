import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAuthLoading, selectAuthError } from '../state/selectors/auth.selectors';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        ProgressBarModule,
        MessageModule,
        ButtonModule
    ],
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
    private store = inject(Store);

    loading = toSignal(this.store.select(selectAuthLoading), { initialValue: false });
    error = toSignal(this.store.select(selectAuthError), { initialValue: null });
    currentYear = new Date().getFullYear();
}
