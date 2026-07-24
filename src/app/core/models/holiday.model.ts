export interface HolidayCalendar {
    id: number;
    holidayDate: string; // "2026-01-01"
    name: string;
    countryCode: string; // "CO"
    isActive: boolean;
    createdAt: string;
}

export interface HolidayCalendarList {
    holidays: HolidayCalendar[];
    totalActiveInYear: number;
}

export interface CreateHolidayDto {
    holidayDate: string;
    name: string;
    countryCode?: string;
}

export interface UpdateHolidayDto {
    holidayDate: string;
    name: string;
    countryCode?: string;
    isActive: boolean;
}

export interface BatchImportHolidayItem {
    holidayDate: string;
    name: string;
}

export interface BatchImportDto {
    holidays: BatchImportHolidayItem[];
    countryCode: string;
    overwrite: boolean;
}

export interface BatchImportError {
    row: number;
    field: string;
    message: string;
}

export interface BatchImportConflict {
    row: number;
    holidayDate: string;
    name: string;
    existingName: string;
}

export interface BatchImportResult {
    created: number;
    skipped: number;
    overwritten: number;
    errors: BatchImportError[];
    conflicts?: BatchImportConflict[];
}
