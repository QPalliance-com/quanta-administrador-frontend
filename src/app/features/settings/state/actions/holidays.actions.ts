import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    HolidayCalendar,
    HolidayCalendarList,
    CreateHolidayDto,
    UpdateHolidayDto,
    BatchImportDto,
    BatchImportResult
} from '@/core/models/holiday.model';

export const HolidaysActions = createActionGroup({
    source: 'Holidays',
    events: {
        'Load List': props<{ year: number }>(),
        'Load List Success': props<{ data: HolidayCalendarList }>(),
        'Load List Failure': props<{ error: string }>(),

        Create: props<{ payload: CreateHolidayDto }>(),
        'Create Success': props<{ item: HolidayCalendar }>(),
        'Create Failure': props<{ error: string }>(),

        Update: props<{ id: number; payload: UpdateHolidayDto }>(),
        'Update Success': props<{ item: HolidayCalendar }>(),
        'Update Failure': props<{ error: string }>(),

        Delete: props<{ id: number }>(),
        'Delete Success': props<{ id: number }>(),
        'Delete Failure': props<{ error: string }>(),

        'Import Batch': props<{ payload: BatchImportDto }>(),
        'Import Batch Success': props<{ result: BatchImportResult }>(),
        'Import Batch Failure': props<{ error: string }>(),

        'Set Selected Year': props<{ year: number }>(),
        'Clear Error': emptyProps()
    }
});
