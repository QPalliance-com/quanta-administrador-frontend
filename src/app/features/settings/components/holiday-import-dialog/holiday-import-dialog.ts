import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import Papa from 'papaparse';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { BatchImportConflict } from '@/core/models';
import { HolidaysActions } from '../../state/actions/holidays.actions';

interface PreviewRow {
    row: number;
    holidayDate: string;
    name: string;
    status: 'ok' | 'error' | 'conflict';
    detail?: string;
}

const HEADER_KEYWORDS = ['fecha', 'date', 'nombre', 'name'];
const MAX_ROWS = 366;

@Component({
    standalone: true,
    selector: 'app-holiday-import-dialog',
    templateUrl: './holiday-import-dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, DialogModule, ButtonModule, TableModule, TagModule, MessageModule, CheckboxModule]
})
export class HolidayImportDialogComponent implements OnChanges, OnDestroy {
    private store = inject(Store);
    private actions$ = inject(Actions);
    private destroy$ = new Subject<void>();

    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();

    fileName: string | null = null;
    rows: PreviewRow[] = [];
    hasConflicts = false;
    overwrite = false;
    submitting = false;
    resultSummary: string | null = null;
    errorBanner: string | null = null;
    isDragging = false;

    constructor() {
        this.actions$
            .pipe(ofType(HolidaysActions.importBatchSuccess), takeUntil(this.destroy$))
            .subscribe(({ result }) => {
                this.submitting = false;

                if (result.conflicts?.length) {
                    this.applyConflicts(result.conflicts);
                    return;
                }

                const overwrittenText = result.overwritten ? `, ${result.overwritten} sobrescritos` : '';
                this.resultSummary = `${result.created} días no laborables importados${overwrittenText}.`;
                setTimeout(() => this.close(), 2000);
            });

        this.actions$
            .pipe(ofType(HolidaysActions.importBatchFailure), takeUntil(this.destroy$))
            .subscribe(({ error }) => {
                this.submitting = false;
                this.errorBanner = error;
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.resetState();
        }
    }

    get hasBlockingErrors(): boolean {
        return this.rows.some((row) => row.status === 'error');
    }

    get canImport(): boolean {
        return this.rows.length > 0 && !this.hasBlockingErrors && !this.hasConflicts;
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave(): void {
        this.isDragging = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
        const file = event.dataTransfer?.files?.[0];
        if (file) this.handleFile(file);
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) this.handleFile(file);
        input.value = '';
    }

    downloadTemplate(): void {
        const csvContent = '2027-01-01,Año Nuevo\n2027-01-11,Día de los Reyes Magos\n2027-03-22,Día de San José\n';
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'plantilla-festivos.csv';
        link.click();
        URL.revokeObjectURL(url);
    }

    submitImport(): void {
        if (!this.canImport && !(this.hasConflicts && this.overwrite)) return;

        this.errorBanner = null;
        this.resultSummary = null;
        this.submitting = true;

        this.store.dispatch(
            HolidaysActions.importBatch({
                payload: {
                    holidays: this.rows.map((row) => ({ holidayDate: row.holidayDate, name: row.name })),
                    countryCode: 'CO',
                    overwrite: this.overwrite
                }
            })
        );
    }

    onDialogVisibleChange(value: boolean): void {
        this.visible = value;
        this.visibleChange.emit(value);
        if (!value) this.resetState();
    }

    close(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.resetState();
    }

    private handleFile(file: File): void {
        if (!file.name.toLowerCase().endsWith('.csv')) {
            this.errorBanner = 'El archivo debe tener extensión .csv';
            return;
        }

        this.errorBanner = null;
        this.resultSummary = null;
        this.hasConflicts = false;
        this.overwrite = false;
        this.fileName = file.name;

        Papa.parse<string[]>(file, {
            skipEmptyLines: true,
            complete: (results) => this.processRows(results.data)
        });
    }

    private processRows(data: string[][]): void {
        let rows = data;
        const [first] = rows;
        const looksLikeHeader =
            !!first && first.some((cell) => HEADER_KEYWORDS.includes(cell?.trim().toLowerCase()));
        if (looksLikeHeader) rows = rows.slice(1);

        if (rows.length > MAX_ROWS) {
            this.errorBanner = `El archivo tiene ${rows.length} filas. Máximo permitido: ${MAX_ROWS}.`;
            this.fileName = null;
            return;
        }

        const seenDates = new Set<string>();
        const duplicateDates = new Set<string>();
        rows.forEach(([date]) => {
            const value = date?.trim();
            if (value) {
                if (seenDates.has(value)) duplicateDates.add(value);
                seenDates.add(value);
            }
        });

        this.rows = rows.map((cells, index) => this.buildPreviewRow(index + 1, cells, duplicateDates));
    }

    private buildPreviewRow(rowNumber: number, cells: string[], duplicateDates: Set<string>): PreviewRow {
        const holidayDate = (cells[0] ?? '').trim();
        const name = (cells[1] ?? '').trim();

        if (!this.isValidIsoDate(holidayDate)) {
            return { row: rowNumber, holidayDate, name, status: 'error', detail: 'Formato de fecha inválido (use YYYY-MM-DD)' };
        }
        if (!name) {
            return { row: rowNumber, holidayDate, name, status: 'error', detail: 'El nombre es obligatorio' };
        }
        if (name.length > 100) {
            return { row: rowNumber, holidayDate, name, status: 'error', detail: 'Máximo 100 caracteres' };
        }
        if (duplicateDates.has(holidayDate)) {
            return { row: rowNumber, holidayDate, name, status: 'error', detail: 'Fecha duplicada en el archivo' };
        }

        return { row: rowNumber, holidayDate, name, status: 'ok' };
    }

    private isValidIsoDate(value: string): boolean {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        const [year, month, day] = value.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }

    private applyConflicts(conflicts: BatchImportConflict[]): void {
        const conflictByDate = new Map(conflicts.map((conflict) => [conflict.holidayDate, conflict]));
        this.rows = this.rows.map((row) => {
            const conflict = conflictByDate.get(row.holidayDate);
            return conflict ? { ...row, status: 'conflict' as const, detail: `Ya existe: ${conflict.existingName}` } : row;
        });
        this.hasConflicts = true;
    }

    resetState(): void {
        this.fileName = null;
        this.rows = [];
        this.hasConflicts = false;
        this.overwrite = false;
        this.submitting = false;
        this.resultSummary = null;
        this.errorBanner = null;
        this.isDragging = false;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
