import { createReducer, on } from '@ngrx/store';
import { SubscriptionPlan } from '@/core/models/subscription-plan.model';
import { DashboardActions } from '../actions';

export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  subscriptionPlan: SubscriptionPlan | null;
  loadingPlan: boolean;
  errorPlan: any;
}

const initialState: DashboardState = {
  subscriptionPlan: null,
  loadingPlan: false,
  errorPlan: null,
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadSubscriptionPlan, (state) => ({
    ...state,
    loadingPlan: true,
    errorPlan: null,
  })),
  on(DashboardActions.loadSubscriptionPlanSuccess, (state, { plan }) => ({
    ...state,
    subscriptionPlan: plan,
    loadingPlan: false,
  })),
  on(DashboardActions.loadSubscriptionPlanFailure, (state, { error }) => ({
    ...state,
    loadingPlan: false,
    errorPlan: error,
  }))
);
