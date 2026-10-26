import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IdentificationType } from '@/core/models/identification-type.model';

/**
 * Valida el número de identificación contra el validationRegex del tipo seleccionado.
 * - Match completo (anclado) y sobre el valor en MAYÚSCULAS, igual que normaliza el formulario antes de enviar.
 * - Sin tipo o validationRegex null => sin validación de formato.
 * - Regex inválido (dialecto Java no soportado en JS) => sin validación en cliente; el backend decide (422).
 */
export function buildNumberValidator(type: IdentificationType | null | undefined): ValidatorFn {
    const regex = compileRegex(type?.validationRegex);
    return (control: AbstractControl): ValidationErrors | null => {
        if (!regex) return null;
        const value = control.value;
        if (value === null || value === undefined || value === '') return null; // required se encarga de vacíos
        return regex.test(String(value).toUpperCase()) ? null : { pattern: true };
    };
}

function compileRegex(source: string | null | undefined): RegExp | null {
    if (!source) return null;
    try {
        return new RegExp(`^(?:${source})$`);
    } catch {
        return null;
    }
}
