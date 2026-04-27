import {
  Component, AfterViewInit, OnDestroy, OnInit,
  ViewChild, ElementRef, ViewEncapsulation,
  inject, computed, effect
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';

import { selectAllCompanies, selectCompaniesLoading } from '@/features/companies/state/selectors/companies.selectors';
import { selectAllUsers, selectUsersLoading } from '@/features/users/state/selectors/users.selectors';
import { selectSubscriptionPlan, selectLoadingPlan, selectAdminPricing, selectOperativePricing } from '@/features/dashboard/state/selectors/dashboard.selectors';
import { CompaniesActions } from '@/features/companies/state/actions/companies.actions';
import { UsersActions } from '@/features/users/state/actions/users.actions';
import { DashboardActions } from '@/features/dashboard/state/actions/dashboard.actions';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './main-dashboard.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './main-dashboard.scss'
})
export class MainDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private store = inject(Store);

  // ── Companies ──────────────────────────────────────────────────────────────
  companies        = this.store.selectSignal(selectAllCompanies);
  loadingCompanies = this.store.selectSignal(selectCompaniesLoading);
  companiesCount   = computed(() => this.companies().length);

  // ── Users ──────────────────────────────────────────────────────────────────
  users         = this.store.selectSignal(selectAllUsers);
  loadingUsers  = this.store.selectSignal(selectUsersLoading);
  usersCount    = computed(() => this.users().length);
  activeUsers   = computed(() => this.users().filter(u => u.status === 'active').length);
  inactiveUsers = computed(() => this.users().filter(u => u.status === 'inactive').length);
  activeRatio   = computed(() => {
    const t = this.usersCount();
    return t > 0 ? Math.round((this.activeUsers() / t) * 100) : 0;
  });

  // ── Subscription plan ──────────────────────────────────────────────────────
  plan = this.store.selectSignal(selectSubscriptionPlan);
  loadingPlan = this.store.selectSignal(selectLoadingPlan);
  adminPricing = this.store.selectSignal(selectAdminPricing);
  opPricing = this.store.selectSignal(selectOperativePricing);

  // ── Derived company metrics ────────────────────────────────────────────────
  naturalCount    = computed(() => this.companies().filter(c => c.legalType === 'natural').length);
  juridicalCount  = computed(() => this.companies().filter(c => c.legalType === 'juridical').length);
  onboardingDone  = computed(() => this.companies().filter(c => c.onBoardingComplete).length);
  onboardingPct   = computed(() => {
    const t = this.companiesCount();
    return t > 0 ? Math.round((this.onboardingDone() / t) * 100) : 0;
  });
  naturalPct      = computed(() => {
    const t = this.companiesCount();
    return t > 0 ? Math.round((this.naturalCount() / t) * 100) : 0;
  });
  recentCompanies = computed(() => [...this.companies()].slice(-8).reverse());
  recentUsers     = computed(() => [...this.users()].slice(-6));

  @ViewChild('btLegalCanvas') legalRef!: ElementRef<HTMLCanvasElement>;
  private legalChart?: Chart;

  constructor() {
    effect(() => {
      const n = this.naturalCount();
      const j = this.juridicalCount();
      if (this.legalChart) {
        this.legalChart.data.datasets[0].data = [n, j];
        this.legalChart.update('none');
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(CompaniesActions.loadCompanies());
    this.store.dispatch(UsersActions.loadUsers());
    this.store.dispatch(DashboardActions.loadSubscriptionPlan());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initLegalChart(), 50);
  }

  ngOnDestroy(): void {
    this.legalChart?.destroy();
  }

  initials(user: { names: string; lastNames: string }): string {
    return `${user.names?.[0] ?? ''}${user.lastNames?.[0] ?? ''}`.toUpperCase();
  }

  private initLegalChart(): void {
    const ctx = this.legalRef.nativeElement.getContext('2d')!;
    this.legalChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Persona Natural', 'Persona Jurídica'],
        datasets: [{
          data: [this.naturalCount(), this.juridicalCount()],
          backgroundColor: ['#D62974', '#3b82f6'],
          borderWidth: 0, hoverOffset: 5
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '65%',
        plugins: {
          legend: {
            display: true, position: 'right',
            labels: { boxWidth: 10, font: { size: 11, family: 'Roboto' }, color: '#64748b', padding: 12 }
          },
          tooltip: { backgroundColor: '#1e293b', titleColor: '#D62974', bodyColor: '#e2e8f0' }
        }
      }
    });
  }
}
