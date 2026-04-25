import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import * as AuthActions from '../state/actions/auth.actions';
import { selectAuthLoading, selectAuthError } from '../state/selectors/auth.selectors';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule
    ],
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
    private store = inject(Store);

    email = '';
    password = '';
    loading = toSignal(this.store.select(selectAuthLoading), { initialValue: false });
    error = toSignal(this.store.select(selectAuthError), { initialValue: null });

    onSubmit(): void {
        if (this.isFormValid()) {
            this.store.dispatch(AuthActions.login({ email: this.email, password: this.password }));
        }
    }

    isFormValid(): boolean {
        return this.isEmailValid(this.email) && this.password.length >= 6;
    }

    isEmailValid(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
