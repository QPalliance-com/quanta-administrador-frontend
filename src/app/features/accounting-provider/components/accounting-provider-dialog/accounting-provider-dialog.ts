import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AccountingProviderConfigComponent } from '../accounting-provider-config/accounting-provider-config';

@Component({
    standalone: true,
    selector: 'app-accounting-provider-dialog',
    templateUrl: './accounting-provider-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, DialogModule, AccountingProviderConfigComponent]
})
export class AccountingProviderDialogComponent {
    @Input() visible = false;
    @Input() companyId: number | null = null;
    @Input() companyName = '';
    @Output() closed = new EventEmitter<void>();

    onVisibleChange(value: boolean): void {
        if (!value) this.closed.emit();
    }
}
