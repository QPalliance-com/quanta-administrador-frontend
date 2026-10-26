export interface IdentificationType {
    id: number;
    countryCode: string;
    code: string;
    displayName: string;
    validationRegex: string | null; // null => sin validación de formato en cliente
    hasVerificationDigit: boolean;
}
