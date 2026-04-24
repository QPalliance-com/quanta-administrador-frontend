

export enum roleTypeProfile {
    system_admin = 'system_admin',
    user = 'user',
    guest = 'guest'
}
export const roleTypeProfileLabels: Record<roleTypeProfile, string> = {
    [roleTypeProfile.system_admin]: 'Administrador',
    [roleTypeProfile.user]: 'Usuario',
    [roleTypeProfile.guest]: 'Invitado'
};
export interface User {
    id: number;
    names: string; // Nombres del usuario
    lastNames: string; // Apellidos del usuario
    username: string; // Nombre de usuario
    password?: string; // Contraseña (opcional para edición)
    email: string; // Correo electrónico
    phone: string; // Teléfono
    status: 'active' | 'inactive'; // Estado
    roleTypeProfile: roleTypeProfile; // Assigned Role
    position: string; // Specific position (non-editable)
}
