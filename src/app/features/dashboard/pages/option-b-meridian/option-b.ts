import {
  Component, AfterViewInit, OnDestroy,
  ViewChild, ElementRef, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-meridian',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-b.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .ex-wrap {
      min-height: calc(100vh - 80px);
      background: var(--surface-card);
      font-family: 'Roboto', sans-serif;
      padding: 36px 40px;
    }

    /* HEADER */
    .ex-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 36px;
    }
    .ex-greeting {
      font-size: 13px;
      font-weight: 400;
      color: var(--text-color-secondary);
      margin-bottom: 6px;
      letter-spacing: 0.02em;
    }
    .ex-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-color);
      letter-spacing: -0.5px;
    }
    .ex-date-badge {
      background: var(--surface-hover);
      border: 1px solid var(--surface-border);
      padding: 10px 18px;
      text-align: center;
    }
    .ex-date-day {
      font-size: 42px;
      font-weight: 700;
      color: var(--primary-color);
      line-height: 1;
      letter-spacing: -2px;
    }
    .ex-date-month {
      font-size: 11px;
      font-weight: 500;
      color: var(--text-color-secondary);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 2px;
    }

    /* HERO KPI ROW */
    .ex-hero-row {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr 1fr;
      gap: 0;
      border: 1px solid var(--surface-border);
      margin-bottom: 28px;
    }
    .ex-hero-cell {
      padding: 28px 32px;
      border-right: 1px solid var(--surface-border);
      transition: background 0.15s;
      cursor: default;
      position: relative;
    }
    .ex-hero-cell:last-child { border-right: none; }
    .ex-hero-cell:hover { background: var(--surface-hover); }
    .ex-hero-cell.featured {
      background: var(--primary-color);
    }
    .ex-hero-cell.featured:hover {
      background: #b81e5a;
    }
    .ex-hero-cell::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--primary-color);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .ex-hero-cell:not(.featured):hover::before { opacity: 1; }
    .ex-cell-lbl {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-color-secondary);
      margin-bottom: 14px;
    }
    .ex-hero-cell.featured .ex-cell-lbl { color: rgba(255,255,255,0.65); }
    .ex-cell-val {
      font-size: 48px;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -2px;
      color: var(--text-color);
      margin-bottom: 10px;
    }
    .ex-cell-val.xl { font-size: 56px; letter-spacing: -3px; }
    .ex-hero-cell.featured .ex-cell-val { color: #ffffff; }
    .ex-cell-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 100px;
    }
    .chip-pos  { background: rgba(34,197,94,0.1);  color: #16a34a; }
    .chip-neg  { background: rgba(239,68,68,0.1);  color: #dc2626; }
    .chip-warn { background: rgba(234,179,8,0.1);  color: #ca8a04; }
    .ex-hero-cell.featured .chip-pos {
      background: rgba(255,255,255,0.2);
      color: white;
    }

    /* CHART ROW */
    .ex-chart-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      margin-bottom: 28px;
    }
    .ex-panel {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      padding: 24px 28px;
    }
    .ex-panel-eyebrow {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--primary-color);
      margin-bottom: 3px;
    }
    .ex-panel-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-color);
      margin-bottom: 20px;
    }
    .ex-chart-md { height: 200px; }

    /* PLAN LIST */
    .ex-plan-item {
      display: flex;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid var(--surface-border);
    }
    .ex-plan-item:last-child { border-bottom: none; }
    .ex-plan-bar {
      width: 4px;
      height: 44px;
      flex-shrink: 0;
      margin-right: 16px;
    }
    .ex-plan-info { flex: 1; }
    .ex-plan-name { font-size: 14px; font-weight: 600; color: var(--text-color); margin-bottom: 2px; }
    .ex-plan-sub { font-size: 11px; color: var(--text-color-secondary); }
    .ex-plan-count {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -1px;
      color: var(--text-color);
    }

    /* TABLE */
    .ex-table-row {
      display: grid;
      grid-template-columns: 1fr 120px 110px 110px;
      padding: 13px 0;
      border-bottom: 1px solid var(--surface-border);
      align-items: center;
    }
    .ex-table-head .ex-table-row { border-bottom: 2px solid var(--surface-border); }
    .ex-th { font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-color-secondary); }
    .ex-td { font-size: 13px; color: var(--text-color); }
    .ex-td.bold { font-weight: 600; }
    .ex-plan-chip {
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      padding: 3px 9px;
      border-radius: 2px;
      letter-spacing: 0.05em;
      text-transform: capitalize;
    }
    .plan-enterprise   { background: rgba(214,41,116,0.1);  color: #D62974;  border: 1px solid rgba(214,41,116,0.25); }
    .plan-professional { background: rgba(59,130,246,0.08); color: #2563eb;  border: 1px solid rgba(59,130,246,0.2);  }
    .plan-starter      { background: var(--surface-hover);  color: var(--text-color-secondary); border: 1px solid var(--surface-border); }
    .status-active   { font-size: 11px; font-weight: 600; color: #16a34a; }
    .status-trial    { font-size: 11px; font-weight: 600; color: #ca8a04; }
    .status-past-due { font-size: 11px; font-weight: 600; color: #dc2626; }
    .ex-date { font-size: 11px; color: var(--text-color-secondary); }
  `]
})
export class DashboardOptionBComponent implements AfterViewInit, OnDestroy {
  @ViewChild('exRevCanvas') revRef!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  today      = new Date();
  dayNum     = this.today.getDate();
  monthLabel = this.today.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });

  kpis = [
    { lbl: 'MRR',               val: '$48.2K', valCls: 'xl', chipTxt: '+5.3% vs mes ant.',  chipCls: 'chip-pos',  featured: true  },
    { lbl: 'Empresas activas',  val: '1,247',  valCls: '',   chipTxt: '+12 este mes',         chipCls: 'chip-pos',  featured: false },
    { lbl: 'Suscripciones',     val: '983',    valCls: '',   chipTxt: '78.8% activas',        chipCls: 'chip-pos',  featured: false },
    { lbl: 'Usuarios totales',  val: '24.8K',  valCls: '',   chipTxt: '+342 nuevos',          chipCls: 'chip-pos',  featured: false },
  ];

  plans = [
    { name: 'Enterprise',   sub: '58% del total', count: '145', color: '#D62974' },
    { name: 'Professional', sub: '31% del total', count: '78',  color: '#3b82f6' },
    { name: 'Starter',      sub: '11% del total', count: '27',  color: '#94a3b8' },
  ];

  companies = [
    { name: 'TechCorp S.A.',     plan: 'enterprise',   status: 'active',   date: '09 abr 2026' },
    { name: 'InnoSystems Ltd.',  plan: 'professional', status: 'active',   date: '08 abr 2026' },
    { name: 'GlobalTrade Corp',  plan: 'enterprise',   status: 'active',   date: '07 abr 2026' },
    { name: 'DataFlow Inc.',     plan: 'starter',      status: 'trial',    date: '07 abr 2026' },
    { name: 'Nexus Retail',      plan: 'professional', status: 'active',   date: '06 abr 2026' },
    { name: 'MegaCorp S.A.S.',   plan: 'enterprise',   status: 'past-due', date: '05 abr 2026' },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => this.initRevChart(), 50);
  }
  ngOnDestroy(): void { this.charts.forEach(c => c.destroy()); }

  private initRevChart(): void {
    const ctx = this.revRef.nativeElement.getContext('2d')!;
    const c = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr'],
        datasets: [{
          label: 'MRR',
          data: [31200,33800,35100,36400,37900,39200,40100,41800,43200,45100,46800,48200],
          borderColor: '#D62974', borderWidth: 2,
          fill: true,
          backgroundColor: (cx: any) => {
            const g = cx.chart.ctx.createLinearGradient(0,0,0,200);
            g.addColorStop(0,'rgba(214,41,116,0.15)');
            g.addColorStop(1,'rgba(214,41,116,0)');
            return g;
          },
          pointRadius: 3,
          pointBackgroundColor: '#D62974',
          pointHoverRadius: 5, tension: 0.4,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b', titleColor: '#D62974', bodyColor: '#e2e8f0',
            callbacks: { label: (cx: any) => ` $${(cx.raw / 1000).toFixed(1)}K` }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94a3b8', font: { size: 11 }, callback: (v: any) => `$${(v/1000).toFixed(0)}K` } }
        }
      }
    });
    this.charts.push(c);
  }

  statusLabel(s: string): string {
    return s === 'active' ? 'Activo' : s === 'trial' ? 'Trial' : 'Pago vencido';
  }
}
