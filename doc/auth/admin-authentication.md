# Autenticación de Super Administrador - Quanta Admin Frontend

## Descripción General

Este módulo implementa un sistema de autenticación simplificado para el panel de super administración de Quanta. A diferencia del frontend principal que soporta múltiples compañías y métodos de autenticación (OAuth, OIDC), este sistema está diseñado exclusivamente para administradores con autenticación interna (email + password).

## Flujo de Autenticación

```
┌─────────────┐
│ /auth/login │ ──────┐
└─────────────┘       │
                      ▼
              ┌──────────────┐
              │ Login Form   │
              │ (email +     │
              │  password)   │
              └──────────────┘
                      │
                      │ dispatch(login)
                      ▼
              ┌──────────────┐
              │ AuthService  │
              │ login()      │
              └──────────────┘
                      │
                      │ POST /admin/login
                      ▼
              ┌──────────────┐
              │ Backend API  │
              │ (or Mock)    │
              └──────────────┘
                      │
                      │ LoginResponse
                      ▼
              ┌──────────────┐
              │ loginSuccess │
              │ action       │
              └──────────────┘
                      │
                      │ Update State
                      │ + Save Session
                      ▼
              ┌──────────────┐
              │ Navigate to  │
              │ Dashboard    │
              └──────────────┘
```

## Estructura de Archivos

```
src/app/
├── core/
│   ├── guards/
│   │   ├── auth.guard.ts           # Protección de rutas
│   │   └── index.ts
│   ├── interceptors/
│   │   ├── auth.interceptor.ts     # Agregar Bearer token
│   │   ├── http-error.interceptor.ts
│   │   └── loading.interceptor.ts
│   ├── models/
│   │   ├── auth.model.ts           # Modelos de autenticación
│   │   ├── login-response.model.ts # Response del login
│   │   ├── permission.model.ts     # Permisos
│   │   ├── menu.model.ts          # Menú del usuario
│   │   └── index.ts
│   └── services/
│       ├── auth.service.ts         # Servicio de autenticación
│       └── index.ts
├── features/
│   └── auth/
│       ├── state/
│       │   ├── actions/
│       │   │   └── auth.actions.ts
│       │   ├── reducers/
│       │   │   └── auth.reducer.ts
│       │   ├── selectors/
│       │   │   └── auth.selectors.ts
│       │   ├── effects/
│       │   │   └── auth.effects.ts
│       │   └── index.ts
│       ├── layout/
│       │   ├── auth-layout.component.ts
│       │   ├── auth-layout.component.html
│       │   └── auth-layout.component.scss
│       ├── components/
│       │   ├── login-form.component.ts
│       │   └── login-form.component.html
│       └── auth.routes.ts
└── assets/
    └── data/
        └── auth/
            ├── login-success.json        # Mock response exitoso
            ├── login-error.json          # Mock response error
            ├── test-credentials.json     # Credenciales de prueba
            ├── logout-success.json       # Mock logout
            └── refresh-token-success.json # Mock refresh
```

## Credenciales de Prueba

Para desarrollo y pruebas con Mock API:

```typescript
// Email: admin@quanta.com
// Password: Admin123!

// Email: superadmin@quanta.com
// Password: SuperAdmin123!
```

## Uso del Feature

### 1. Login desde el componente

```typescript
import { Store } from '@ngrx/store';
import * as AuthActions from '@/features/auth/state/actions/auth.actions';

constructor(private store: Store) {}

login(email: string, password: string) {
  this.store.dispatch(AuthActions.login({ email, password }));
}
```

### 2. Obtener estado de autenticación

```typescript
import { Store } from '@ngrx/store';
import { 
  selectIsAuthenticated, 
  selectLoggedUser,
  selectAuthLoading 
} from '@/features/auth/state/selectors/auth.selectors';

constructor(private store: Store) {
  this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  this.loggedUser$ = this.store.select(selectLoggedUser);
  this.loading$ = this.store.select(selectAuthLoading);
}
```

### 3. Logout

```typescript
import { Store } from '@ngrx/store';
import * as AuthActions from '@/features/auth/state/actions/auth.actions';

constructor(private store: Store) {}

logout() {
  this.store.dispatch(AuthActions.logout());
}
```

### 4. Proteger rutas

```typescript
import { authGuard } from '@/core/guards';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    component: AdminComponent
  }
];
```

### 5. Verificar permisos

```typescript
import { AuthService } from '@/core/services/auth.service';

constructor(private authService: AuthService) {}

checkPermission() {
  const hasPermission = this.authService.hasPermission('users.edit');
  const hasModuleAccess = this.authService.hasModuleAccess('billing');
}
```

## Configuración de Entorno

En `environment.ts` y `environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.quanta.com',
  useMockApi: true  // Cambiar a false en producción
};
```

## NgRx State

### AuthReducerState

```typescript
{
  loggedUser: LoggedUser | null;
  userCompany: Company | null;
  userPermissions: Permission[];
  userMenu: AppMenu[];
  loading: boolean;
  error: string | null;
}
```

### Actions Principales

- `login` - Iniciar sesión
- `loginSuccess` - Login exitoso
- `loginFailure` - Error en login
- `logout` - Cerrar sesión
- `autoLogin` - Login automático desde localStorage
- `setSession` - Establecer sesión
- `clearSession` - Limpiar sesión

### Selectors Principales

- `selectIsAuthenticated` - Estado de autenticación
- `selectLoggedUser` - Usuario logueado
- `selectAuthToken` - Token JWT
- `selectUserPermissions` - Permisos del usuario
- `selectUserMenu` - Menú del usuario
- `selectAuthLoading` - Estado de carga
- `selectAuthError` - Errores de auth

## API Endpoints

### Login
```
POST /admin/login
Body: { email: string, password: string }
Response: LoginResponse
```

### Logout
```
POST /admin/logout
Headers: Authorization: Bearer {token}
Response: ApiResponse
```

### Refresh Token
```
POST /admin/refresh
Headers: Authorization: Bearer {token}
Response: RefreshTokenResponse
```

## Seguridad

- **JWT Token**: Almacenado en localStorage
- **Expiration**: Verificación de expiración en cada navegación
- **Interceptor**: Token agregado automáticamente en headers
- **Guard**: Protección de rutas administrativas
- **Session Validation**: Validación de sesión en `isAuthenticated()`

## Testing

Para probar el flujo completo:

1. Iniciar servidor de desarrollo:
   ```bash
   cd quanta-admin-frontend
   npm start
   ```

2. Navegar a: `http://localhost:4200/#/auth/login`

3. Ingresar credenciales de prueba

4. Verificar:
   - Login exitoso
   - Redirección a dashboard
   - Estado en NgRx DevTools
   - Token en localStorage
   - Menú cargado

5. Probar logout:
   - Click en logout
   - Limpieza de sesión
   - Redirección a login

## Troubleshooting

### Error: "No hay sesión válida"
- Verificar que `localStorage` tenga `auth_session`
- Revisar expiración del token (`expiredsAt`)

### Error: "Credenciales inválidas"
- Verificar email y password en `test-credentials.json`
- Asegurarse que `useMockApi: true` en environment

### Error: "Token no válido"
- Verificar que el interceptor esté registrado
- Revisar formato del token en headers

### Rutas no protegidas
- Verificar que `authGuard` esté en `canActivate`
- Revisar selector `selectIsAuthenticated`

## Próximas Mejoras

- [ ] Implementar refresh token automático
- [ ] Agregar recordar sesión (checkbox)
- [ ] Implementar recuperación de contraseña
- [ ] Agregar 2FA para super admins
- [ ] Logs de auditoría de accesos
- [ ] Rate limiting en login attempts

---

**Última actualización**: 27 de noviembre de 2025
**Versión**: 1.0.0
