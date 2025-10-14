import { Component, inject } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { ButtonModule } from 'primeng/button';
@Component({
    selector: '[app-footer]',
    imports: [ButtonModule],
    templateUrl: './footer.html',
    styleUrl: './footer.scss'
})
export class FooterComponent {
    Year: number = new Date().getFullYear();
    _layoutService = inject(LayoutService);
}
