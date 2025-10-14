import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    private _loading = signal(false);
    readonly loading: Signal<boolean> = this._loading.asReadonly();

    private timer: any;

    show() {
        clearTimeout(this.timer);
        this._loading.set(true);
    }

    hide() {
        // 🕑 Esperar mínimo 2 segundos antes de ocultar
        this.timer = setTimeout(() => {
            this._loading.set(false);
        }, 1000);
    }
}
