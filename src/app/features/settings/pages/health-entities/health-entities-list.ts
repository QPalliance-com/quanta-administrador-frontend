import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { BehaviorSubject, Subject, combineLatest, map, switchMap, takeUntil } from 'rxjs';
import { HealthEntity } from '@/core/models';
import { HealthEntityTypeActions } from '@/core/state/actions/health-entity-type.actions';
import { selectHealthEntityTypesByCountry } from '@/core/state/selectors/health-entity-type.selectors';
import { CountriesActions } from '@/features/companies/state/actions/countries.actions';
import { selectAllCountries } from '@/features/companies/state/selectors/countries.selectors';
import { HealthEntitiesActions } from '../../state/actions/health-entities.actions';
import {
    selectAllHealthEntities,
    selectHealthEntitiesLoading,
    selectHealthEntitiesError
} from '../../state/selectors/health-entities.selectors';
import { HealthEntityDrawerComponent } from '../../components/health-entity-drawer/health-entity-drawer';

@Component({
    standalone: true,
    selector: 'app-health-entities-list',
    templateUrl: './health-entities-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        CardModule,
        SelectModule,
        InputTextModule,
        TagModule,
        ToastModule,
        TooltipModule,
        DialogModule,
        HealthEntityDrawerComponent
    ],
    providers: [MessageService]
})
export class HealthEntitiesListComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private actions$ = inject(Actions);
    private destroy$ = new Subject<void>();
    private country$ = new BehaviorSubject<string | null>(null);

    countries$ = this.store.select(selectAllCountries);
    entityTypes$ = this.country$.pipe(switchMap((code) => this.store.select(selectHealthEntityTypesByCountry(code))));
    healthEntities$ = this.store.select(selectAllHealthEntities);
    loading$ = this.store.select(selectHealthEntitiesLoading);
    error$ = this.store.select(selectHealthEntitiesError);
    private search$ = new BehaviorSubject<string>('');
    vm$ = combineLatest([this.healthEntities$, this.loading$, this.search$]).pipe(
        map(([items, loading, term]) => ({ items: term ? items.filter((entity) => this.matches(entity, term)) : items, loading }))
    );

    selectedCountry: string | null = null;
    selectedEntityTypeId: number | null = null;
    searchTerm = '';

    displayDrawer = false;
    drawerMode: 'create' | 'edit' = 'create';
    selectedHealthEntity: HealthEntity | null = null;

    displayDeleteDialog = false;
    entityToDelete: HealthEntity | null = null;

    ngOnInit(): void {
        this.store.dispatch(CountriesActions.loadCountries());

        this.actions$.pipe(ofType(HealthEntitiesActions.deleteSuccess, HealthEntitiesActions.deleteFailure), takeUntil(this.destroy$)).subscribe(() => {
            this.displayDeleteDialog = false;
            this.entityToDelete = null;
        });
    }

    onCountryChange(countryCode: string | null): void {
        this.selectedCountry = countryCode;
        this.selectedEntityTypeId = null;
        this.country$.next(countryCode);

        if (!countryCode) {
            this.store.dispatch(HealthEntitiesActions.resetState());
            return;
        }
        this.store.dispatch(HealthEntityTypeActions.loadHealthEntityTypes({ countryCode }));
        this.loadList();
    }

    onEntityTypeChange(): void {
        this.loadList();
    }

    onSearchChange(term: string): void {
        this.searchTerm = term;
        this.search$.next(term.trim().toLowerCase());
    }

    private matches(entity: HealthEntity, term: string): boolean {
        return [entity.name, entity.externalCode, entity.nit, entity.entityTypeName].some((value) => value?.toLowerCase().includes(term));
    }

    loadList(): void {
        if (!this.selectedCountry) return;
        this.store.dispatch(
            HealthEntitiesActions.loadList({
                query: { countryCode: this.selectedCountry, entityTypeId: this.selectedEntityTypeId }
            })
        );
    }

    openCreateDrawer(): void {
        this.drawerMode = 'create';
        this.selectedHealthEntity = null;
        this.displayDrawer = true;
    }

    openEditDrawer(entity: HealthEntity): void {
        this.drawerMode = 'edit';
        this.selectedHealthEntity = entity;
        this.displayDrawer = true;
    }

    isActive(entity: HealthEntity): boolean {
        return entity.recordState?.toLowerCase() === 'active';
    }

    confirmDelete(entity: HealthEntity): void {
        this.entityToDelete = entity;
        this.displayDeleteDialog = true;
    }

    deleteConfirmed(): void {
        if (!this.entityToDelete) return;
        this.store.dispatch(HealthEntitiesActions.delete({ id: this.entityToDelete.id, countryCode: this.entityToDelete.countryCode }));
    }

    ngOnDestroy(): void {
        this.store.dispatch(HealthEntitiesActions.resetState());
        this.destroy$.next();
        this.destroy$.complete();
    }
}
