import { Component, Input } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-global-toast',
    standalone: true,
    imports: [ToastModule],
    templateUrl: './global-toast.component.html'
})
export class GlobalToastComponent {}
