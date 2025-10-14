import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Company } from '@/core/models';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as companyActions from '../../state/actions/company-360.actions';
import * as fromCompany from '../../state/selectors/company-360.selectors';

@Component({
    selector: 'app-company-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './company-info.html'
})
export class CompanyInfoComponent implements OnInit, OnDestroy, OnChanges {
    private destroy$ = new Subject<void>();
    @Input() company?: Company;
   
   
    ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
       
    }

   

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
