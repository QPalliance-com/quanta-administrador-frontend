
export interface User {
    id: number;
    names: string; // Nombres del usuario
    lastNames: string; // Apellidos del usuario
    email: string; // Correo electrónico
    phone: string; // Teléfono
    status: 'active' | 'inactive'; // Estado
    roleId: string; // Assigned Role
    userType: string; // Tipo de usuario (non-editable)
    position: string; // Specific position (non-editable)
    imageUrl?: string; // Profile picture
    language?: 'es' | 'en'; // Language
}
