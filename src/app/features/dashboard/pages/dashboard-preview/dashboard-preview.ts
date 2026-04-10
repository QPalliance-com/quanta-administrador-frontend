import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOptionAComponent } from '../option-a-nexus/option-a';
import { DashboardOptionBComponent } from '../option-b-meridian/option-b';
import { DashboardOptionCComponent } from '../option-c-aurora/option-c';

type Option = 'A' | 'B' | 'C';

@Component({
  selector: 'app-dashboard-preview',
  standalone: true,
  imports: [CommonModule, DashboardOptionAComponent, DashboardOptionBComponent, DashboardOptionCComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="dpv-bar">
      <span class="dpv-label">Elige un layout:</span>
      <div class="dpv-tabs">
        @for (opt of options; track opt.id) {
          <button
            class="dpv-tab"
            [class.dpv-active]="activeOption() === opt.id"
            (click)="activeOption.set(opt.id)">
            <span class="dpv-letter">{{ opt.id }}</span>
            <div class="dpv-tab-text">
              <span class="dpv-tab-name">{{ opt.name }}</span>
              <span class="dpv-tab-desc">{{ opt.desc }}</span>
            </div>
          </button>
        }
      </div>
    </div>

    @if (activeOption() === 'A') { <app-dashboard-nexus /> }
    @if (activeOption() === 'B') { <app-dashboard-meridian /> }
    @if (activeOption() === 'C') { <app-dashboard-aurora /> }
  `,
  styles: [`
    .dpv-bar {
      display: flex;
      align-items: center;
      gap: 20px;
      background: var(--surface-card);
      border-bottom: 1px solid var(--surface-border);
      padding: 10px 24px;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .dpv-label {
      font-size: 11px;
      font-weight: 500;
      color: var(--text-color-secondary);
      letter-spacing: 0.05em;
      white-space: nowrap;
    }
    .dpv-tabs { display: flex; gap: 6px; }
    .dpv-tab {
      display: flex;
      align-items: center;
      gap: 10px;
      background: transparent;
      border: 1px solid var(--surface-border);
      padding: 7px 16px;
      cursor: pointer;
      font-family: 'Roboto', sans-serif;
      transition: all 0.15s;
    }
    .dpv-tab:hover {
      background: var(--surface-hover);
      border-color: var(--primary-color);
    }
    .dpv-active {
      background: var(--surface-hover);
      border-color: var(--primary-color);
      border-bottom: 2px solid var(--primary-color);
    }
    .dpv-letter {
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-color);
      line-height: 1;
    }
    .dpv-tab-text { display: flex; flex-direction: column; align-items: flex-start; }
    .dpv-tab-name { font-size: 13px; font-weight: 600; color: var(--text-color); line-height: 1.2; }
    .dpv-tab-desc { font-size: 10px; color: var(--text-color-secondary); }
  `]
})
export class DashboardPreviewComponent {
  activeOption = signal<Option>('A');

  options: { id: Option; name: string; desc: string }[] = [
    { id: 'A', name: 'Command',   desc: 'Dark · Dense · Topbar oscuro' },
    { id: 'B', name: 'Executive', desc: 'Claro · Editorial · Espacioso' },
    { id: 'C', name: 'Bento',     desc: 'Grid asimétrico · Tarjeta hero' },
  ];
}
