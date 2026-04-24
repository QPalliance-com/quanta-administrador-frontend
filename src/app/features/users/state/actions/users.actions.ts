import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@/core/models/user.model';

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'Load Users': emptyProps(),
        'Load Users Success': props<{ users: User[] }>(),
        'Load Users Failure': props<{ error: string }>(),

        'Load User': props<{ id: number }>(),
        'Load User Success': props<{ user: User }>(),
        'Load User Failure': props<{ error: string }>(),

        'Create User': props<{ user: Partial<User> }>(),
        'Create User Success': props<{ user: User }>(),
        'Create User Failure': props<{ error: string }>(),

        'Update User': props<{ id: number; user: Partial<User> }>(),
        'Update User Success': props<{ user: User }>(),
        'Update User Failure': props<{ error: string }>(),

        'Update User Status': props<{ id: number; status: 'active' | 'inactive' }>(),
        'Update User Status Success': props<{ user: User }>(),
        'Update User Status Failure': props<{ error: string }>(),

        'Delete User': props<{ id: number }>(),
        'Delete User Success': props<{ id: number }>(),
        'Delete User Failure': props<{ error: string }>(),

        'Clear Selected User': emptyProps(),
        'Clear Error': emptyProps()
    }
});
