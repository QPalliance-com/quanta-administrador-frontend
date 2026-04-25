import { inject, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectDepartmentNameById, selectCityNameById } from '@/core/state/selectors/department-city.selectors';

@Pipe({ name: 'locationName', standalone: true })
export class LocationNamePipe implements PipeTransform {
    private store = inject(Store);

    transform(id: number | string | null | undefined, type: 'department' | 'city'): Observable<string> {
        if (id == null || id === '') return of('—');
        const selector = type === 'department' ? selectDepartmentNameById(id) : selectCityNameById(id);
        return this.store.select(selector);
    }
}
