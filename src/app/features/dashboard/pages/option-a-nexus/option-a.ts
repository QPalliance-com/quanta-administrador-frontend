import {
  Component, AfterViewInit, OnDestroy,
  ViewChild, ElementRef, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-nexus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-a.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .cmd-wrap {
      min-height: calc(100vh - 80px);
      background: var(--surface-card);
      font-family: 'Roboto', sans-serif;
    }

    /* Franja superior oscura tipo "command bar" */
    .cmd-topbar {
      background: #0f172a;
      padding: 20px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid var(--primary-color);
    }
    .cmd-eyebrow {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--primary-color);
      margin-bottom: 4px;
    }
    .cmd-title {
      font-size: 22px;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: -0.3px;
    }
    .cmd-live {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 2px;
      color: #22d3ee;
      text-transform: uppercase;
    }
    .cmd-live-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #22d3ee;
      animation: cmd-blink 2s ease-in-out infinite;
    }
    @keyframes cmd-blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0.3; }
    }

    /* KPI STRIP — separadas por líneas verticales */
    .cmd-kpis {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      border-bottom: 1px solid var(--surface-border);
    }
    .cmd-kpi {
      padding: 20px 24px;
      border-right: 1px solid var(--surface-border);
      transition: background 0.15s;
      cursor: default;
    }
    .cmd-kpi:last-child { border-right: none; }
    .cmd-kpi:hover { background: var(--surface-hover); }
    .cmd-kpi-lbl {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-color-secondary);
      margin-bottom: 10px;
    }
    .cmd-kpi-val {
      font-size: 30px;
      font-weight: 700;
      line-height: 1;
      color: var(--text-color);
      margin-bottom: 8px;
    }
    .cmd-kpi-val.v-pink { color: var(--primary-color); }
    .cmd-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 2px;
    }
    .cmd-badge.up   { background: rgba(34,197,94,0.1);  color: #16a34a; }
    .cmd-badge.down { background: rgba(239,68,68,0.1);  color: #dc2626; }
    .cmd-badge.warn { background: rgba(234,179,8,0.1);  color: #ca8a04; }

    /* BODY */
    .cmd-body { padding: 24px 32px; }

    .cmd-main {
      display: grid;
      grid-template-columns: 1fr 1fr 320px;
      gap: 20px;
      margin-bottom: 20px;
    }
    .cmd-panel {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      padding: 20px 24px;
    }
    .cmd-panel-label {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--primary-color);
      margin-bottom: 3px;
    }
    .cmd-panel-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-color-secondary);
      margin-bottom: 16px;
    }
    .cmd-chart { height: 180px; }

    /* FEED */
    .cmd-feed-item {
      display: flex;
      gap: 10px;
      padding: 9px 0;
      border-bottom: 1px solid var(--surface-border);
      align-items: flex-start;
    }
    .cmd-feed-item:last-child { border-bottom: none; }
    .cmd-feed-ico {
      width: 26px; height: 26px;
      border: 1px solid;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; flex-shrink: 0;
    }
    .cmd-feed-ico.co  { border-color: rgba(214,41,116,0.4); color: var(--primary-color); }
    .cmd-feed-ico.pay { border-color: rgba(34,211,238,0.4); color: #22d3ee; }
    .cmd-feed-ico.usr { border-color: rgba(34,197,94,0.4);  color: #22c55e; }
    .cmd-feed-ico.wrn { border-color: rgba(234,179,8,0.4);  color: #eab308; }
    .cmd-feed-txt { font-size: 12px; color: var(--text-color); line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .cmd-feed-time { font-size: 10px; color: var(--text-color-secondary); margin-top: 2px; letter-spacing: 0.5px; }

    /* BOTTOM */
    .cmd-bottom { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
    .cmd-donut-grid { display: grid; grid-template-columns: 110px 1fr; gap: 16px; align-items: center; }
    .cmd-donut { height: 110px; }
    .cmd-plan-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 7px 0; border-bottom: 1px solid var(--surface-border);
    }
    .cmd-plan-row:last-child { border-bottom: none; }
    .cmd-plan-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .cmd-plan-name { font-size: 13px; color: var(--text-color-secondary); flex: 1; padding: 0 10px; }
    .cmd-plan-cnt { font-size: 16px; font-weight: 700; color: var(--text-color); }
    .cmd-bar-box { height: 150px; }

    /* HEALTH */
    .cmd-health { }
    .cmd-health-item { margin-bottom: 13px; }
    .cmd-health-item:last-child { margin-bottom: 0; }
    .cmd-health-lbl { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 11px; color: var(--text-color-secondary); }
    .cmd-health-val { font-weight: 600; color: var(--text-color); }
    .cmd-track { height: 4px; background: var(--surface-border); border-radius: 2px; overflow: hidden; }
    .cmd-fill { height: 100%; border-radius: 2px; }
    .cmd-fill.g { background: #22c55e; }
    .cmd-fill.t { background: #22d3ee; }
    .cmd-fill.p { background: var(--primary-color); }
    .cmd-fill.y { background: #eab308; }
  `]
})
export class DashboardOptionAComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cmdRevChart')  revRef!:  ElementRef<HTMLCanvasElement>;
  @ViewChild('cmdPlanChart') planRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cmdBarChart')  barRef!:  ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  currentTime = new Date().toLocaleTimeString('es-CO', { hour12: false });

  kpis = [
    { lbl: 'Total Empresas',     val: '1,247',  tag: '+12 este mes',   type: 'up',   pink: false },
    { lbl: 'Suscripciones Act.', val: '983',    tag: '78.8% tasa',     type: 'up',   pink: false },
    { lbl: 'MRR',                val: '$48.2K', tag: '+5.3% vs mar',   type: 'up',   pink: true  },
    { lbl: 'Usuarios Totales',   val: '24,891', tag: '+342 nuevos',    type: 'up',   pink: false },
    { lbl: 'Nuevos / Mes',       val: '47',     tag: '-3 vs anterior', type: 'down', pink: false },
    { lbl: 'Tasa de Churn',      val: '2.1%',   tag: '↑ 0.2%',        type: 'warn', pink: false },
  ];

  feed = [
    { ico: '●', type: 'co',  txt: 'TechCorp S.A. registrado en Plan Enterprise',  time: 'hace 4 min'  },
    { ico: '●', type: 'pay', txt: 'Pago exitoso $299/mes — InnoSystems Ltd.',      time: 'hace 12 min' },
    { ico: '●', type: 'usr', txt: '3 usuarios nuevos en GlobalTrade Corp',         time: 'hace 28 min' },
    { ico: '●', type: 'wrn', txt: 'Suscripción próxima a vencer — DataFlow Inc',  time: 'hace 1h'     },
    { ico: '●', type: 'co',  txt: 'Nexus Retail actualiza a Professional',         time: 'hace 1h 20m' },
    { ico: '●', type: 'pay', txt: 'Pago fallido — tarjeta expirada MegaCorp',     time: 'hace 2h'     },
    { ico: '●', type: 'usr', txt: 'Cuenta desactivada en CloudBase LLC',           time: 'hace 3h'     },
  ];

  plans = [
    { name: 'Enterprise',   cnt: 145, color: '#D62974' },
    { name: 'Professional', cnt: 78,  color: '#22d3ee' },
    { name: 'Starter',      cnt: 27,  color: '#a3e635' },
  ];

  health = [
    { lbl: 'Uptime del sistema', val: '99.9%', pct: 99.9, cls: 'g' },
    { lbl: 'Latencia API',       val: '142ms', pct: 72,   cls: 't' },
    { lbl: 'Capacidad DB',       val: '68%',   pct: 68,   cls: 'p' },
    { lbl: 'Retención clientes', val: '97.9%', pct: 97.9, cls: 'g' },
    { lbl: 'Tickets abiertos',   val: '12',    pct: 24,   cls: 'y' },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => { this.initRevChart(); this.initPlanChart(); this.initBarChart(); }, 50);
  }
  ngOnDestroy(): void { this.charts.forEach(c => c.destroy()); }

  private initRevChart(): void {
    const ctx = this.revRef.nativeElement.getContext('2d')!;
    const c = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr'],
        datasets: [
          {
            label: 'MRR',
            data: [31200,33800,35100,36400,37900,39200,40100,41800,43200,45100,46800,48200],
            borderColor: '#D62974', borderWidth: 2,
            fill: true,
            backgroundColor: (cx: any) => {
              const g = cx.chart.ctx.createLinearGradient(0,0,0,180);
              g.addColorStop(0,'rgba(214,41,116,0.2)');
              g.addColorStop(1,'rgba(214,41,116,0)');
              return g;
            },
            pointRadius: 0, pointHoverRadius: 4, tension: 0.4,
          },
          {
            label: 'Año anterior',
            data: [24000,26500,28200,29700,30500,32100,33400,35000,36800,38400,40000,42000],
            borderColor: 'rgba(34,211,238,0.5)', borderWidth: 1.5,
            borderDash: [5,4], fill: false, pointRadius: 0, tension: 0.4,
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a', borderColor: 'rgba(214,41,116,0.4)', borderWidth: 1,
            titleColor: '#D62974', bodyColor: '#cbd5e1',
            callbacks: { label: (cx: any) => ` $${(cx.raw / 1000).toFixed(1)}K` }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b', font: { size: 10 } } },
          y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b', font: { size: 10 }, callback: (v: any) => `$${(v/1000).toFixed(0)}K` } }
        }
      }
    });
    this.charts.push(c);
  }

  private initPlanChart(): void {
    const ctx = this.planRef.nativeElement.getContext('2d')!;
    const c = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Enterprise','Professional','Starter'],
        datasets: [{ data: [145,78,27], backgroundColor: ['#D62974','#22d3ee','#a3e635'], borderWidth: 0, hoverOffset: 6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#0f172a', borderColor: 'rgba(214,41,116,0.4)', borderWidth: 1, titleColor: '#D62974', bodyColor: '#cbd5e1' }
        }
      }
    });
    this.charts.push(c);
  }

  private initBarChart(): void {
    const ctx = this.barRef.nativeElement.getContext('2d')!;
    const c = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Oct','Nov','Dic','Ene','Feb','Mar','Abr'],
        datasets: [{
          label: 'Empresas',
          data: [38,52,31,45,61,50,47],
          backgroundColor: (cx: any) => cx.dataIndex === 6 ? '#D62974' : 'rgba(214,41,116,0.18)',
          borderWidth: 0, borderRadius: 2,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#0f172a', borderColor: 'rgba(214,41,116,0.4)', borderWidth: 1, titleColor: '#D62974', bodyColor: '#cbd5e1' }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
          y: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { color: '#64748b', font: { size: 10 } } }
        }
      }
    });
    this.charts.push(c);
  }
}
