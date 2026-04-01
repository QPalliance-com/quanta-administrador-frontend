export interface UserPricing {
    userType: 'ADMIN' | 'OPERATIVE';
    monthlyPrice: number;
    annualPrice: number;
    description: string;
    features: string[];
}

export interface SubscriptionPlan {
    id: number;
    name: string;
    description: string;
    currency: string;
    trialDays: number;
    userPricing: UserPricing[];
    commonFeatures: string[];
    isActive: boolean;
}

export interface UpdateSubscriptionPlanRequest {
    id: number;
    name: string;
    description: string;
    currency: string;
    trialDays: number;
    userPricing: UserPricing[];
    commonFeatures: string[];
    isActive: boolean;
}
