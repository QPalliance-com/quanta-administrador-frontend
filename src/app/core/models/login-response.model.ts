import { AppMenu } from './menu.model';
import { Company } from './company.model';
import { Permission } from './permission.model';
import { ApiResponse } from './api-response.model';
import { LoggedUser } from './auth.model';

export interface LoginData {
    userCompany: Company | null;
    userMenu: AppMenu[];
    userPermissions: Permission[];
    userData: LoggedUser;
}

export interface LoginResponse extends ApiResponse<LoginData> {
    traceId?: string;
}
