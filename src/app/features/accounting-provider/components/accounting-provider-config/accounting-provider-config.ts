import { Component, DestroyRef, Input, OnDestroy, OnInit, ChangeDetectionStrategy, computed, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AccountingEnvironment, CredentialField } from '@/core/models';
import { AccountingProviderActions } from '../../state/actions/accounting-provider.actions';
import {
    selectAccountingConfig,
    selectAccountingLoading,
    selectAccountingLoadingProviders,
    selectAccountingProviders,
    selectAccountingSaveError,
    selectAccountingSaving,
    selectConfigStatus,
    selectProviderLocked
} from '../../state/selectors/accounting-provider.selectors';

@Component({
    standalone: true,
    selector: 'app-accounting-provider-config',
    templateUrl: './accounting-provider-config.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule, TagModule, TooltipModule]
})
export class AccountingProviderConfigComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private actions$ = inject(Actions);
    private fb = inject(FormBuilder);
    private destroyRef = inject(DestroyRef);

    @Input({ required: true }) companyId!: number;

    providers = toSignal(this.store.select(selectAccountingProviders), { initialValue: [] });
    config = toSignal(this.store.select(selectAccountingConfig), { initialValue: null });
    status = toSignal(this.store.select(selectConfigStatus), { initialValue: 'unconfigured' });
    locked = toSignal(this.store.select(selectProviderLocked), { initialValue: false });
    loading = toSignal(this.store.select(selectAccountingLoading), { initialValue: false });
    loadingProviders = toSignal(this.store.select(selectAccountingLoadingProviders), { initialValue: false });
    saving = toSignal(this.store.select(selectAccountingSaving), { initialValue: null });
    saveError = toSignal(this.store.select(selectAccountingSaveError), { initialValue: null });

    // Proveedor elegido en el selector; si la empresa ya tiene config, se toma de ahí
    selectedProviderId = signal<number | null>(null);
    // Ambiente cuyas credenciales ya existen y el usuario decidió reemplazar
    replacing = signal<Record<AccountingEnvironment, boolean>>({ test: false, prod: false });

    providerId = computed(() => this.selectedProviderId() ?? this.config()?.provider?.id ?? null);
    provider = computed(() => {
        const id = this.providerId();
        if (id === null) return null;
        return this.providers().find((p) => p.id === id) ?? (this.config()?.provider?.id === id ? this.config()!.provider : null);
    });
    fields = computed<CredentialField[]>(() => this.provider()?.credentialSchema?.fields ?? []);
    hasTestEnv = computed(() => this.provider()?.hasTestEnv ?? true);
    testConnected = computed(() => this.config()?.testConnected ?? false);
    prodConnected = computed(() => this.config()?.prodConnected ?? false);
    // Producción se habilita solo con pruebas conectadas (o si el proveedor no tiene ambiente de pruebas)
    prodEnabled = computed(() => !this.hasTestEnv() || this.testConnected());

    // Los secretos viven solo en estos FormGroup; se limpian tras guardar y nunca llegan al store
    forms: Record<AccountingEnvironment, FormGroup> = { test: this.fb.group({}), prod: this.fb.group({}) };

    constructor() {
        effect(() => {
            const fields = this.fields();
            untracked(() => this.buildForms(fields));
        });

        this.actions$.pipe(ofType(AccountingProviderActions.saveCredentialsSuccess), takeUntilDestroyed(this.destroyRef)).subscribe(({ environment }) => {
            this.buildForms(this.fields(), environment);
            this.replacing.update((r) => ({ ...r, [environment]: false }));
        });
    }

    ngOnInit(): void {
        this.store.dispatch(AccountingProviderActions.reset());
        this.store.dispatch(AccountingProviderActions.loadConfig({ companyId: this.companyId }));
        this.store.dispatch(AccountingProviderActions.loadProviders());
    }

    ngOnDestroy(): void {
        this.store.dispatch(AccountingProviderActions.reset());
    }

    onProviderChange(providerId: number | null): void {
        this.selectedProviderId.set(providerId);
    }

    private buildForms(fields: CredentialField[], only?: AccountingEnvironment): void {
        const build = () => this.fb.group(Object.fromEntries(fields.map((f) => [f.key, ['', f.required ? Validators.required : []]])));
        if (!only || only === 'test') this.forms.test = build();
        if (!only || only === 'prod') this.forms.prod = build();
    }

    isConnected(env: AccountingEnvironment): boolean {
        return env === 'test' ? this.testConnected() : this.prodConnected();
    }

    /** Con credenciales ya guardadas los campos quedan bloqueados hasta pulsar "Reemplazar". */
    isEditable(env: AccountingEnvironment): boolean {
        return !this.isConnected(env) || this.replacing()[env];
    }

    startReplace(env: AccountingEnvironment): void {
        this.buildForms(this.fields(), env);
        this.replacing.update((r) => ({ ...r, [env]: true }));
    }

    cancelReplace(env: AccountingEnvironment): void {
        this.buildForms(this.fields(), env);
        this.replacing.update((r) => ({ ...r, [env]: false }));
    }

    inputType(field: CredentialField): 'text' | 'password' {
        return field.secret || field.type === 'password' ? 'password' : 'text';
    }

    placeholder(field: CredentialField, env: AccountingEnvironment): string {
        return this.isConnected(env) && !this.replacing()[env] ? 'Reingresa para reemplazar' : '';
    }

    canSave(env: AccountingEnvironment): boolean {
        return this.providerId() !== null && this.isEditable(env) && this.forms[env].valid && this.saving() === null && (env === 'test' || this.prodEnabled());
    }

    envError(env: AccountingEnvironment): string | null {
        const err = this.saveError();
        return err && err.environment === env ? err.message : null;
    }

    save(env: AccountingEnvironment): void {
        const providerId = this.providerId();
        if (providerId === null || !this.canSave(env)) {
            this.forms[env].markAllAsTouched();
            return;
        }
        const raw = this.forms[env].getRawValue() as Record<string, string>;
        const credentials: Record<string, string> = {};
        for (const f of this.fields()) {
            const value = raw[f.key]?.trim();
            if (value) credentials[f.key] = value;
        }
        this.store.dispatch(AccountingProviderActions.saveCredentials({ companyId: this.companyId, request: { providerId, environment: env, credentials } }));
    }

    /** Valores de status que escribe el backend (AdminSaveAccountingCredentialsService). */
    statusLabel(status: string): string {
        switch (status) {
            case 'unconfigured': return 'Sin configurar';
            case 'test_connected': return 'Pruebas conectadas';
            case 'prod_connected': return 'Producción conectada';
            case 'active': return 'Activo';
            default: return status;
        }
    }

    statusSeverity(status: string): 'info' | 'success' | 'secondary' {
        switch (status) {
            case 'test_connected': return 'info';
            case 'prod_connected':
            case 'active': return 'success';
            default: return 'secondary';
        }
    }
}
