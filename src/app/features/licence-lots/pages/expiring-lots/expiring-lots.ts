import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, interval, map, takeUntil } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExpiringLot, ExtendableLot } from '@/core/models';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { ExpiringLotsActions } from '../../state/actions/expiring-lots.actions';
import {
    selectExpiringLots,
    selectExpiringLotsError,
    selectExpiringLotsLoading
} from '../../state/selectors/expiring-lots.selectors';
import { ExtendLotDialogComponent } from '../../components/extend-lot-dialog/extend-lot-dialog';
import { PROFILE_LABELS, URGENCY_META, daysLeftClass, groupByUrgency } from '../../utils/licence-lot.utils';

const AUTO_REFRESH_MS = 5 * 60 * 1000;

@Component({
    standalone: true,
    selector: 'app-expiring-lots',
    templateUrl: './expiring-lots.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        RouterLink,
        TableModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        MessageModule,
        SkeletonModule,
        TagModule,
        ConfirmDialogModule,
        DateColombiaPipe,
        ExtendLotDialogComponent
    ],
    providers: [MessageService, ConfirmationService]
})
export class ExpiringLotsComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private destroy$ = new Subject<void>();

    readonly profileLabels = PROFILE_LABELS;
    readonly urgencyMeta = URGENCY_META;
    readonly daysLeftClass = daysLeftClass;
    readonly skeletonRows = Array.from({ length: 4 });

    groups$ = this.store.select(selectExpiringLots).pipe(map((lots) => groupByUrgency(lots)));
    loading$ = this.store.select(selectExpiringLotsLoading);
    error$ = this.store.select(selectExpiringLotsError);

    displayExtendDialog = false;
    selectedCompanyId = 0;
    selectedLot: ExtendableLot | null = null;

    ngOnInit(): void {
        this.load();
        interval(AUTO_REFRESH_MS)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.load());
    }

    load(): void {
        this.store.dispatch(ExpiringLotsActions.loadExpiringLots());
    }

    openExtend(item: ExpiringLot): void {
        this.selectedCompanyId = item.companyId;
        this.selectedLot = {
            id: item.lotId,
            roleTypeProfile: item.roleTypeProfile,
            userCount: item.userCount,
            endDate: item.endDate,
            status: item.status
        };
        this.displayExtendDialog = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
