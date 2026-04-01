import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth.service';

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
    private authService = inject(AuthService);
    
    email: string = '';
    password: string = '';
    loading = this.authService.loading;
    error = this.authService.error;

    onSubmit() {
        if (this.isFormValid()) {
            this.authService.login(this.email, this.password).subscribe({
                next: () => {
                    this.email = '';
                    this.password = '';
                },
                error: () => {
                    // Error is handled by service and displayed via MessageService
                }
            });
        }
    }

    isFormValid(): boolean {
        return this.isEmailValid(this.email) && this.password.length >= 6;
    }

    isEmailValid(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
