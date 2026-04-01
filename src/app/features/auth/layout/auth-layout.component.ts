import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth.service';

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
    private authService = inject(AuthService);
    
    error = this.authService.error;
    loading = this.authService.loading;
    currentYear = new Date().getFullYear();
}
