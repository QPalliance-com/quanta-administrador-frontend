import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Company } from '@/core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
