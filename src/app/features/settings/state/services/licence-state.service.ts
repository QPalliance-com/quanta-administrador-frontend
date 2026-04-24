import { Injectable, signal, computed, inject } from '@angular/core';
import { Licence } from '@/core/models';
import { LicenceService } from '@/core/services/licence.service';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class LicenceStateService {
    private licenceService = inject(LicenceService);
    private messageService = inject(MessageService);

    // Signals
    licences = signal<Licence[]>([]);
    selectedLicence = signal<Licence | null>(null);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    // Computed
    licencesCount = computed(() => this.licences().length);

    /**
     * Carga todas las licencias
     */
    loadLicences(): void {
        this.loading.set(true);
        this.error.set(null);

        this.licenceService.getLicences().subscribe({
            next: (response) => {
                this.licences.set(response.data);
                this.loading.set(false);
            },
            error: (err) => {
                const errorMessage = 'No se pudieron cargar las licencias';
                this.error.set(errorMessage);
                this.loading.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage
                });
            }
        });
    }

    /**
     * Obtiene una licencia por ID
     */
    getLicence(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        this.licenceService.getLicence(id).subscribe({
            next: (response) => {
                this.selectedLicence.set(response.data);
                this.loading.set(false);
            },
            error: (err) => {
                const errorMessage = 'No se pudo cargar la licencia';
                this.error.set(errorMessage);
                this.loading.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage
                });
            }
        });
    }

    /**
     * Crea una nueva licencia
     */
    createLicence(licence: Licence): void {
        this.loading.set(true);
        this.error.set(null);

        this.licenceService.createLicence(licence).subscribe({
            next: (response) => {
                this.licences.update((licences) => [...licences, response.data]);
                this.loading.set(false);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Licencia creada correctamente'
                });
            },
            error: (err) => {
                const errorMessage = 'No se pudo crear la licencia';
                this.error.set(errorMessage);
                this.loading.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage
                });
            }
        });
    }

    /**
     * Actualiza una licencia
     */
    updateLicence(id: number, licence: Licence): void {
        this.loading.set(true);
        this.error.set(null);

        this.licenceService.updateLicence(id, licence).subscribe({
            next: (response) => {
                this.licences.update((licences) =>
                    licences.map((l) => (l.id === id ? response.data : l))
                );
                if (this.selectedLicence()?.id === id) {
                    this.selectedLicence.set(response.data);
                }
                this.loading.set(false);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Licencia actualizada correctamente'
                });
            },
            error: (err) => {
                const errorMessage = 'No se pudo actualizar la licencia';
                this.error.set(errorMessage);
                this.loading.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage
                });
            }
        });
    }

    /**
     * Elimina una licencia
     */
    deleteLicence(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        this.licenceService.deleteLicence(id).subscribe({
            next: () => {
                this.licences.update((licences) =>
                    licences.filter((l) => l.id !== id)
                );
                if (this.selectedLicence()?.id === id) {
                    this.selectedLicence.set(null);
                }
                this.loading.set(false);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Licencia eliminada correctamente'
                });
            },
            error: (err) => {
                const errorMessage = 'No se pudo eliminar la licencia';
                this.error.set(errorMessage);
                this.loading.set(false);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage
                });
            }
        });
    }

    /**
     * Limpia el estado
     */
    clearState(): void {
        this.licences.set([]);
        this.selectedLicence.set(null);
        this.loading.set(false);
        this.error.set(null);
    }
}
