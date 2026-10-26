import { AbstractControl, ValidationErrors } from '@angular/forms';

/** B17: alertDays1 > alertDays2 > alertDays3 > 0. Los campos vacíos los cubre `required`. */
export function alertDaysValidator(group: AbstractControl): ValidationErrors | null {
    const first = group.get('alertDays1')?.value;
    const second = group.get('alertDays2')?.value;
    const third = group.get('alertDays3')?.value;

    if (first == null || second == null || third == null) return null;
    return first > second && second > third && third > 0 ? null : { alertOrder: true };
}

export const ALERT_ORDER_MESSAGE = 'Los días de alerta deben ser decrecientes: primera alerta > segunda alerta > alerta urgente > 0.';
