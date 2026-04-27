import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubscriptionPlanService } from '@/core/services/subscription-plan.service';
import { DashboardActions } from '../actions';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private subscriptionPlanService = inject(SubscriptionPlanService);

  loadSubscriptionPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadSubscriptionPlan),
      switchMap(() =>
        this.subscriptionPlanService.getPlan().pipe(
          map((response) => DashboardActions.loadSubscriptionPlanSuccess({ plan: response.data })),
          catchError((error) => of(DashboardActions.loadSubscriptionPlanFailure({ error: error.message ?? 'Error al cargar el plan' })))
        )
      )
    )
  );
}
