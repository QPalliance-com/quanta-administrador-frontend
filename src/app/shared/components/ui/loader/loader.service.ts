import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    private _loading = signal(false);
    readonly loading: Signal<boolean> = this._loading.asReadonly();

    private pending = 0;
    private timer: any;

    show() {
        clearTimeout(this.timer);
        this.pending++;
        this._loading.set(true);
        document.body.classList.add('app-loading');
    }

    hide() {
        this.pending = Math.max(0, this.pending - 1);

        // Solo se agenda el ocultado cuando ya no quedan requests concurrentes pendientes
        if (this.pending === 0) {
            this.timer = setTimeout(() => {
                if (this.pending === 0) {
                    this._loading.set(false);
                    document.body.classList.remove('app-loading');
                }
            }, 1000);
        }
    }
}
