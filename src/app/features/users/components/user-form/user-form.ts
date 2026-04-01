import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@/core/services/user.service';
import { User } from '@/core/models';

@Component({
    standalone: true,
    selector: 'app-user-form',
    templateUrl: './user-form.html',
    imports: [CommonModule, ToastModule, TooltipModule, InputTextModule, SelectModule, ButtonModule, ReactiveFormsModule]
})
export class UserFormComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private userService = inject(UserService);
    private destroy$ = new Subject<void>();

    form!: FormGroup;
    isEditMode = false;
    userName = signal<string>('');
    userId!: number;

    roles = [
        { label: 'Administrador', value: 'admin' },
        { label: 'Supervisor', value: 'supervisor' },
        { label: 'Operario', value: 'user' }
    ];

    statuses = [
        { label: 'Activo', value: 'active' },
        { label: 'Inactivo', value: 'inactive' }
    ];

    ngOnInit(): void {
        this.buildForm();

        // Detectar modo edición y cargar usuario
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.userId = +id;
            this.userService.getUser(this.userId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (response) => {
                        if (response.data) {
                            this.userName.set(`${response.data.names} ${response.data.lastNames}`);
                            this.form.patchValue(response.data);
                        }
                    },
                    error: (err) => {
                        console.error('Error loading user', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo cargar el usuario'
                        });
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
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            status: ['active', Validators.required],
            roleId: [null, Validators.required],
            userType: [''],
            position: [''],
            imageUrl: [''],
            language: ['es']
        });
    }

    isInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getError(fieldName: string): string {
        const control = this.form.get(fieldName);
        if (!control || !control.errors) {
            return '';
        }

        if (control.errors['required']) {
            return 'Este campo es requerido';
        }
        if (control.errors['email']) {
            return 'Ingresa un correo válido';
        }
        if (control.errors['minlength']) {
            return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
        }

        return 'Este campo es inválido';
    }

    onSubmit(): void {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach((key) => {
                const control = this.form.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        const user: User = this.form.value;

        if (this.isEditMode) {
            this.userService.updateUser(this.userId, user)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Usuario actualizado correctamente'
                        });
                        this.router.navigate(['/settings/users']);
                    },
                    error: (err) => {
                        console.error('Error updating user', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo actualizar el usuario'
                        });
                    }
                });
        } else {
            this.userService.createUser(user)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Usuario creado correctamente'
                        });
                        this.router.navigate(['/settings/users']);
                    },
                    error: (err) => {
                        console.error('Error creating user', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo crear el usuario'
                        });
                    }
                });
        }
    }

    cancel(): void {
        this.router.navigate(['/users']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
