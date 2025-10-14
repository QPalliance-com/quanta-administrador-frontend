import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@/core/models';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-profile-info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile-info.html'
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    @Input() user?: User;
    
    ngOnInit(): void {
      
    }

  
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
