import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-server-down',
    imports: [ButtonModule],
    templateUrl: './server-down.html',
    styleUrl: './server-down.scss'
})
export class ServerDownComponent {
    constructor(private router: Router) {}
    goToHome() {
        this.router.navigate(['/']);
    }
}
