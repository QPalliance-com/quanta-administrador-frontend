import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { Subject, takeUntil } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { roleTypeProfile, roleTypeProfileLabels, User } from '@/core/models';
import { UsersActions } from '../../state/actions/users.actions';
import { selectSelectedUser, selectUsersLoading } from '../../state/selectors/users.selectors';

@Component({
    standalone: true,
    selector: 'app-user-form',
    templateUrl: './user-form.html',
    imports: [CommonModule, ToastModule, TooltipModule, InputTextModule, SelectModule, ButtonModule, ReactiveFormsModule]
})
export class UserFormComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    form!: FormGroup;
    isEditMode = false;
    userName = signal<string>('');
    userId!: number;

    loading$ = this.store.select(selectUsersLoading);

    roleTypeProfiles = Object.values(roleTypeProfile).map((model) => ({
        label: roleTypeProfileLabels[model],
        value: model
    }));

    statuses = [
        { label: 'Activo', value: 'active' },
        { label: 'Inactivo', value: 'inactive' }
    ];

    ngOnInit(): void {
        this.buildForm();

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.userId = +id;
            this.store.dispatch(UsersActions.loadUser({ id: this.userId }));

            this.store.select(selectSelectedUser)
                .pipe(takeUntil(this.destroy$))
                .subscribe((user) => {
                    if (user) {
                        this.userName.set(`${user.names} ${user.lastNames}`);
                        this.form.patchValue(user);
                    }
                });
        }
    }

    private buildForm(): void {
        this.form = this.fb.group({
            id: [null],
            names: ['', Validators.required],
            lastNames: ['', Validators.required],
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: [''],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            status: ['active', Validators.required],
            roleTypeProfile: ['user', Validators.required],
            position: ['', Validators.required]
        });
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getError(fieldName: string): string {
        const control = this.form.get(fieldName);
        if (!control || !control.errors) return '';

        if (control.errors['required']) return 'Este campo es requerido';
        if (control.errors['email']) return 'Ingresa un correo válido';
        if (control.errors['minlength'])
            return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;

        return 'Este campo es inválido';
    }

    onSubmit(): void {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key)?.markAsTouched();
            });
            return;
        }

        const user: User = this.form.value;

        if (this.isEditMode) {
            this.store.dispatch(UsersActions.updateUser({ id: this.userId, user }));
        } else {
            this.store.dispatch(UsersActions.createUser({ user }));
        }
    }

    cancel(): void {
        this.router.navigate(['/users/list']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
