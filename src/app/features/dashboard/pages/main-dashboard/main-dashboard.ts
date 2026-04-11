import {
  Component, AfterViewInit, OnDestroy, OnInit,
  ViewChild, ElementRef, ViewEncapsulation,
  inject, computed, effect
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import Chart from 'chart.js/auto';

import { CompanyService }          from '../../../../core/services/company.service';
import { UserService }             from '../../../../core/services/user.service';
import { SubscriptionPlanService } from '../../../../core/services/subscription-plan.service';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './main-dashboard.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './main-dashboard.scss'
})
export class MainDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private companyService = inject(CompanyService);
  private userService    = inject(UserService);
  private subPlanService = inject(SubscriptionPlanService);

  // ── Companies ──────────────────────────────────────────────────────────────
  companies        = this.companyService.companies;
  companiesCount   = this.companyService.companiesCount;
  loadingCompanies = this.companyService.loading;

  // ── Users ──────────────────────────────────────────────────────────────────
  private usersRes$ = toSignal(
    this.userService.getUsers().pipe(catchError(() => of(null))),
    { initialValue: null }
  );
  loadingUsers  = computed(() => this.usersRes$() === null);
  users         = computed(() => this.usersRes$()?.data ?? []);
  usersCount    = computed(() => this.users().length);
  activeUsers   = computed(() => this.users().filter(u => u.status === 'active').length);
  inactiveUsers = computed(() => this.users().filter(u => u.status === 'inactive').length);
  activeRatio   = computed(() => {
    const t = this.usersCount();
    return t > 0 ? Math.round((this.activeUsers() / t) * 100) : 0;
  });

  // ── Subscription plan ──────────────────────────────────────────────────────
  private planRes$ = toSignal(
    this.subPlanService.getPlan().pipe(catchError(() => of(null))),
    { initialValue: null }
  );
  plan         = computed(() => this.planRes$()?.data ?? null);
  adminPricing = computed(() => this.plan()?.userPricing.find(p => p.userType === 'ADMIN') ?? null);
  opPricing    = computed(() => this.plan()?.userPricing.find(p => p.userType === 'OPERATIVE') ?? null);

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
    this.companyService.loadCompanies().subscribe();
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
