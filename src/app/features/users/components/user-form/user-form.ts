import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '@/core/models';
import * as userActions from '../../state/actions/user.actions';
import * as fromUser from '../../state/selectors/user.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, SelectModule, SelectModule, ToastModule],
    templateUrl: './user-form.html'
})
export class UserFormComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    isEditMode = false;
    userId!: number;
    user$!: Observable<User | null | undefined>;
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.buildForm();
        this.user$ = this.store.select(fromUser.selectCurrentUser);

        // Detectar modo edición y cargar usuario
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.userId = +id;
            this.store.dispatch(userActions.loadUser({ id: this.userId }));
            this.user$
                .pipe(
                    takeUntil(this.destroy$),
                    filter((user) => !!user)
                )
                .subscribe((user) => {
                    this.form.patchValue(user!);
                });
        }
    }

    buildForm(): void {
        this.form = this.fb.group({
            names: ['', Validators.required],
            lastNames: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            status: ['active', Validators.required],
            roleId: [null, Validators.required],
            userType: [''],
            position: [''],
            imageUrl: [''],
            language: ['es']
        });
    }

    submit(): void {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach((key) => {
                const control = this.form.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }
        const user: Partial<User> = this.form.value;
        if (this.isEditMode) {
            this.store.dispatch(userActions.updateUser({ id: this.userId, user }));
        } else {
            this.store.dispatch(userActions.createUser({ user }));
        }
        this.router.navigate(['/users/list']);
    }

    cancel(): void {
        this.router.navigate(['/users/list']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
