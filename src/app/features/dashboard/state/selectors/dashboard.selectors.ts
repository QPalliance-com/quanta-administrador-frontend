import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState, dashboardFeatureKey } from '../reducers/dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectSubscriptionPlan = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.subscriptionPlan
);

export const selectLoadingPlan = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.loadingPlan
);

export const selectErrorPlan = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.errorPlan
);

export const selectAdminPricing = createSelector(
  selectSubscriptionPlan,
  (plan) => plan?.userPricing.find((p) => p.userType === 'ADMIN') ?? null
);

export const selectOperativePricing = createSelector(
  selectSubscriptionPlan,
  (plan) => plan?.userPricing.find((p) => p.userType === 'OPERATIVE') ?? null
);
