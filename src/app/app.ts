import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoaderComponent } from './shared/components/ui/loader/loader';
import * as AuthActions from './features/auth/state/actions/auth.actions';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoaderComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
    private store = inject(Store);

    ngOnInit(): void {
        this.store.dispatch(AuthActions.initializeAuth());
    }
}
