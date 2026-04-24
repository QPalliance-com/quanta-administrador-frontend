import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-export-toolbar',
    standalone: true,
    imports: [CommonModule, SelectModule, ButtonModule, FormsModule, DialogModule, MultiSelectModule, TableModule],
    templateUrl: './export-toolbar.html'
})
export class ExportToolbarComponent {
    /** Deshabilita el select y el botón */
    @Input() disabled = false;
    /** Datos a exportar */
    @Input() exportData: any[] = [];
    /** Nombre del archivo a exportar */
    @Input() exportFileName: string = 'export';
    /** Columnas con label en español, recibidas del padre */
    @Input() exportColumns: { field: string; header: string }[] = [];
    @Output() exportFormat = new EventEmitter<'csv'>();

    exportFormats = [{ label: 'CSV', value: 'csv' }];
    selectedExportFormat: 'csv' | null = null;

    // Modal de exportación
    exportDialogVisible = false;
    exportSuccess = false;

    // Columnas seleccionadas

    selectedColumns: string[] = [];

    /**
     * Devuelve las columnas con label en español, usando exportColumns si está definido
     */
    get columns(): { field: string; label: string }[] {
        if (this.exportColumns && this.exportColumns.length > 0) {
            // Normaliza a { field, label }
            return this.exportColumns.map((col) => ({ field: col.field, label: col.header }));
        }
        if (!this.exportData || this.exportData.length === 0) return [];
        const keyToLabel = (key: string) => {
            // Mapeo rápido de claves a labels legibles
            const map: Record<string, string> = {
                id: 'ID',
                name: 'Nombre',
                description: 'Descripción',
                code: 'Código',
                status: 'Estado',
                createdAt: 'Creado',
                updatedAt: 'Actualizado',
                email: 'Correo',
                phone: 'Teléfono',
                address: 'Dirección',
                version: 'Versión',
                productId: 'Producto',
                items: 'N° Insumos'
                // Agrega más mapeos según tus modelos
            };
            // Si no está en el mapeo, capitaliza la clave
            return map[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
        };
        return Object.keys(this.exportData[0]).map((key) => ({ field: key, label: keyToLabel(key) }));
    }

    get selectedColumnDefs() {
        return this.columns.filter((col) => this.selectedColumns.includes(col.field));
    }

    // Preview de la data filtrada por columnas seleccionadas
    get previewData(): any[] {
        if (!this.exportData) return [];
        if (!this.selectedColumns.length) return this.exportData;
        return this.exportData.map((row) => {
            const filtered: any = {};
            this.selectedColumns.forEach((col) => (filtered[col] = row[col]));
            return filtered;
        });
    }

    openExportDialog() {
        this.selectedColumns = this.columns.map((col) => col.field);
        this.selectedExportFormat = null;
        this.exportDialogVisible = true;
    }

    selectAllColumns() {
        this.selectedColumns = this.columns.map((col) => col.field);
    }

    deselectAllColumns() {
        this.selectedColumns = [];
    }

    closeExportDialog() {
        this.exportDialogVisible = false;
    }

    /**
     * Exporta solo las columnas seleccionadas (previewData)
     */
    onExport() {
        if (this.selectedExportFormat) {
            this.exportToCsv(this.previewData, this.exportFileName);
            this.exportFormat.emit(this.selectedExportFormat);
            this.exportSuccess = true;
            setTimeout(() => {
                this.exportSuccess = false;
            }, 2500);
        }
    }

    /** Exporta los datos filtrados a CSV usando los labels en español de cols/exportColumns */
    exportToCsv(data: any[], fileName: string) {
        if (!data || !data.length) return;
        // Usa el orden y los labels de las columnas seleccionadas
        const columns = this.selectedColumnDefs.length > 0 ? this.selectedColumnDefs : this.columns;
        const header = columns.map((col) => col.label);
        const fields = columns.map((col) => col.field);
        const csvRows = [header.join(',')];
        for (const row of data) {
            const values = fields.map((col) => {
                const val = row[col] ?? '';
                // Escapa comillas y separadores
                return '"' + String(val).replace(/"/g, '""') + '"';
            });
            csvRows.push(values.join(','));
        }
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
