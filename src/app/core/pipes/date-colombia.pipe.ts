import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formatea una fecha calendario (ISO "YYYY-MM-DD" o "YYYY-MM-DDTHH:mm:ss") a "dd/MM/yyyy"
 * operando sobre el string, no sobre un `Date`. El pipe `date` nativo parsea la fecha como
 * UTC y la reconvierte a la zona horaria local, lo que corre un día hacia atrás cualquier
 * fecha calendario en Colombia (UTC-5). Este pipe evita ese shift por diseño.
 */
@Pipe({ name: 'dateColombia', standalone: true })
export class DateColombiaPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '—';

        const [year, month, day] = value.slice(0, 10).split('-');
        if (!year || !month || !day) return '—';

        return `${day}/${month}/${year}`;
    }
}
