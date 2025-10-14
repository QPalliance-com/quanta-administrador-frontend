import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderService } from './loader.service';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule, ProgressSpinnerModule],
    templateUrl: './loader.html',
    styleUrls: ['./loader.scss']
})
export class LoaderComponent {
    private loader = inject(LoaderService);
    loading = computed(() => this.loader.loading());
}
