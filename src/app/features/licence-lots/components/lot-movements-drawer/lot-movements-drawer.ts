import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { LicenceLot, LicenceLotMovement } from '@/core/models';
import { LicenceLotService } from '@/core/services/licence-lot.service';
import { MOVEMENT_META, PROFILE_LABELS, formatMoney } from '../../utils/licence-lot.utils';

@Component({
    standalone: true,
    selector: 'app-lot-movements-drawer',
    templateUrl: './lot-movements-drawer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, DrawerModule, ButtonModule, MessageModule, SkeletonModule, TagModule]
})
export class LotMovementsDrawerComponent implements OnChanges {
    private service = inject(LicenceLotService);

    @Input() visible = false;
    @Input({ required: true }) companyId!: number;
    @Input() lot: LicenceLot | null = null;
    @Output() closed = new EventEmitter<void>();

    readonly profileLabels: Record<string, string> = PROFILE_LABELS;
    readonly movementMeta = MOVEMENT_META;
    readonly formatMoney = formatMoney;
    readonly skeletonRows = Array.from({ length: 3 });

    movements = signal<LicenceLotMovement[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);

    ngOnChanges(changes: SimpleChanges): void {
        // Se consulta cada vez que el drawer se abre: el historial cambia con cada extensión o ampliación
        if ((changes['visible'] || changes['lot']) && this.visible && this.lot) this.load();
    }

    load(): void {
        if (!this.lot) return;
        this.loading.set(true);
        this.error.set(null);
        this.movements.set([]);
        this.service.getMovements(this.companyId, this.lot.id).subscribe({
            next: (response) => {
                this.movements.set(response.data ?? []);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err?.error?.message ?? 'No se pudo cargar el historial del lote.');
                this.loading.set(false);
            }
        });
    }

    onVisibleChange(visible: boolean): void {
        if (!visible) this.closed.emit();
    }
}
