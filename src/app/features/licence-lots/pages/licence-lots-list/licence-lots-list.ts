import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, take } from 'rxjs';
import { LicenceLot, LicenceLotStatus, LicenceProfile } from '@/core/models';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { CompaniesActions } from '@/features/companies/state/actions/companies.actions';
import { selectAllCompanies, selectCompanyById } from '@/features/companies/state/selectors/companies.selectors';
import { LicenceLotsActions } from '../../state/actions/licence-lots.actions';
import { CatalogsActions } from '../../state/actions/catalogs.actions';
import {
    selectAllLicenceLots,
    selectLicenceLotsError,
    selectLicenceLotsLoading,
    selectProfileSummary
} from '../../state/selectors/licence-lots.selectors';
import { LotActivationDrawerComponent } from '../../components/lot-activation-drawer/lot-activation-drawer';
import { PROFILE_LABELS, PROFILE_OPTIONS, STATUS_META, daysLeftClass, usagePercent } from '../../utils/licence-lot.utils';

type StatusFilter = LicenceLotStatus | 'all';
type ProfileFilter = LicenceProfile | 'all';

@Component({
    standalone: true,
    selector: 'app-licence-lots-list',
    templateUrl: './licence-lots-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        TableModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        SelectModule,
        MessageModule,
        SkeletonModule,
        TagModule,
        InputTextModule,
        TooltipModule,
        ConfirmDialogModule,
        DateColombiaPipe,
        LotActivationDrawerComponent
    ],
    providers: [MessageService, ConfirmationService]
})
export class LicenceLotsListComponent implements OnInit {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private status$ = new BehaviorSubject<StatusFilter>('all');
    private profile$ = new BehaviorSubject<ProfileFilter>('all');

    companyId = Number(this.route.snapshot.paramMap.get('companyId'));

    readonly profileLabels = PROFILE_LABELS;
    readonly statusMeta = STATUS_META;
    readonly daysLeftClass = daysLeftClass;
    readonly usagePercent = usagePercent;
    readonly skeletonRows = Array.from({ length: 5 });
    readonly skeletonCols = Array.from({ length: 9 });

    readonly statusOptions: { label: string; value: StatusFilter }[] = [
        { label: 'Todos los estados', value: 'all' },
        ...(Object.keys(STATUS_META) as LicenceLotStatus[]).map((value) => ({ label: STATUS_META[value].label, value }))
    ];
    readonly profileOptions: { label: string; value: ProfileFilter }[] = [
        { label: 'Todos los perfiles', value: 'all' },
        ...PROFILE_OPTIONS
    ];
    statusFilter: StatusFilter = 'all';
    profileFilter: ProfileFilter = 'all';
    displayActivationDrawer = false;

    // El filtrado es del lado del cliente: el store conserva todos los lotes de la empresa,
    // que es lo que necesita F03 para detectar si hay un lote fusionable.
    lots$ = combineLatest([this.store.select(selectAllLicenceLots), this.status$, this.profile$]).pipe(
        map(([lots, status, profile]) =>
            lots.filter(
                (lot: LicenceLot) =>
                    (status === 'all' || lot.status === status) && (profile === 'all' || lot.roleTypeProfile === profile)
            )
        )
    );
    totalLots$ = this.store.select(selectAllLicenceLots).pipe(map((lots) => lots.length));
    summary$ = this.store.select(selectProfileSummary);
    loading$ = this.store.select(selectLicenceLotsLoading);
    error$ = this.store.select(selectLicenceLotsError);
    company$ = this.store.select(selectCompanyById(this.companyId));

    ngOnInit(): void {
        this.store.dispatch(CatalogsActions.load());
        this.load();

        // Si se entra por URL directa la lista de compañías puede no estar cargada todavía
        this.store
            .select(selectAllCompanies)
            .pipe(take(1))
            .subscribe((companies) => {
                if (!companies.length) this.store.dispatch(CompaniesActions.loadCompanies());
            });
    }

    load(): void {
        this.store.dispatch(LicenceLotsActions.loadList({ companyId: this.companyId }));
    }

    openActivationDrawer(): void {
        this.displayActivationDrawer = true;
    }

    onStatusChange(value: StatusFilter): void {
        this.status$.next(value);
    }

    onProfileChange(value: ProfileFilter): void {
        this.profile$.next(value);
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
