import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: { navigate: jest.fn() }
        },
        {
          provide: MessageService,
          useValue: { add: jest.fn() }
        }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  // ============================================================
  // TEST 1: Verificar que el servicio se crea correctamente
  // ============================================================
  describe('Creación del servicio', () => {
    it('debe crear el servicio AuthService', () => {
      expect(service).toBeTruthy();
    });
  });

  // ============================================================
  // TEST 2: Probar setSession - actualiza signals y sessionStorage
  // ============================================================
  describe('setSession', () => {
    it('debe actualizar session signal y guardar en sessionStorage', () => {
      const mockSession = {
        userCompany: null,
        userMenu: [],
        userPermissions: [],
        userData: {
          id: 1,
          email: 'test@example.com',
          token: 'test-token-123',
          expiredsAt: Math.floor(Date.now() / 1000) + 3600  // Válido por 1 hora
        }
      };

      service.setSession(mockSession);

      // Verificar que session signal fue actualizado
      expect(service.session()).toEqual(mockSession);

      // Verificar que se guardó en sessionStorage
      const stored = sessionStorage.getItem('auth_session');
      expect(stored).toBe(JSON.stringify(mockSession));
    });
  });

  // ============================================================
  // TEST 3: Probar clearSession - limpia datos
  // ============================================================
  describe('clearSession', () => {
    it('debe limpiar session signal y sessionStorage', () => {
      // Primero establecer una sesión
      const mockSession = {
        userCompany: null,
        userMenu: [],
        userPermissions: [],
        userData: {
          id: 1,
          email: 'test@example.com',
          token: 'test-token-123',
          expiredsAt: Math.floor(Date.now() / 1000) + 3600
        }
      };

      service.setSession(mockSession);
      expect(service.session()).not.toBeNull();

      // Ahora limpiar la sesión
      service.clearSession();

      // Verificar que session signal está null
      expect(service.session()).toBeNull();

      // Verificar que sessionStorage fue limpio
      const stored = sessionStorage.getItem('auth_session');
      expect(stored).toBeNull();
    });
  });

  // ============================================================
  // TEST 4: Probar login exitoso
  // ============================================================
  describe('login exitoso', () => {
    it('debe hacer login exitoso, actualizar session y navegar a dashboard', (done) => {
      const email = 'test@example.com';
      const password = 'password123';

      const mockResponse = {
        success: true,
        message: 'Login successful',
        data: {
          token: 'jwt-token-123',
          expiredAt: Math.floor(Date.now() / 1000) + 3600,
          userData: {
            id: 1,
            email: 'test@example.com',
            name: 'Test User'
          }
        }
      };

      service.login(email, password).subscribe({
        next: (response) => {
          // Verificar que la sesión se estableció
          expect(service.session()).not.toBeNull();
          expect(service.session()?.userData.token).toBe('jwt-token-123');

          // Verificar sessionStorage
          const stored = sessionStorage.getItem('auth_session');
          expect(stored).toBeTruthy();

          // Verificar que loadingSignal es false
          expect(service.loading()).toBe(false);

          // Verificar que errorSignal es null
          expect(service.error()).toBeNull();

          // Verificar que se navegó a dashboard
          expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);

          // Verificar que se mostró mensaje de éxito
          expect(messageService.add).toHaveBeenCalled();
          const successCall = (messageService.add as jest.Mock).mock.calls[0][0];
          expect(successCall.severity).toBe('success');
          expect(successCall.summary).toBe('Éxito');

          done();
        },
        error: (err) => {
          done();
        }
      });

      const req = httpMock.expectOne((request) =>
        request.url.includes('admin/login')
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  // ============================================================
  // TEST 5: Probar login fallido
  // ============================================================
  describe('login fallido', () => {
    it('debe manejar error en login y mostrar mensaje de error', (done) => {
      const email = 'test@example.com';
      const password = 'wrongpassword';

      const errorResponse = {
        message: 'Credenciales inválidas'
      };

      service.login(email, password).subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          // Verificar que loadingSignal es false
          expect(service.loading()).toBe(false);

          // Verificar que errorSignal tiene el mensaje
          expect(service.error()).toBe('Credenciales inválidas');

          // Verificar que NO se estableció sesión
          expect(service.session()).toBeNull();

          // Verificar que NO se navegó a dashboard
          expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard']);

          // Verificar que se mostró mensaje de error
          expect(messageService.add).toHaveBeenCalled();
          const errorCall = (messageService.add as jest.Mock).mock.calls[0][0];
          expect(errorCall.severity).toBe('error');
          expect(errorCall.summary).toBe('Error');

          done();
        }
      });

      const req = httpMock.expectOne((request) =>
        request.url.includes('admin/login')
      );
      expect(req.request.method).toBe('POST');
      // Enviar error HTTP 401
      req.flush(errorResponse, { status: 401, statusText: 'Unauthorized' });
    });
  });
});
