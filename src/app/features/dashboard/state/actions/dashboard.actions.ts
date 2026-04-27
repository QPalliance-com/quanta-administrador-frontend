import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { SubscriptionPlan } from '@/core/models/subscription-plan.model';

export const DashboardActions = createActionGroup({
  source: '[Dashboard]',
  events: {
    'Load Subscription Plan': emptyProps(),
    'Load Subscription Plan Success': props<{ plan: SubscriptionPlan }>(),
    'Load Subscription Plan Failure': props<{ error: string }>(),
  }
});
