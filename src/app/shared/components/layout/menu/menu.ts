import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { MenuitemComponent } from '../menuitem/menuitem';
import { RouterModule } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuActions, MenuSelectors } from '../../../state/layout';

@Component({
    selector: 'app-menu, [app-menu]',
    standalone: true,
    imports: [CommonModule, MenuitemComponent, RouterModule],
    templateUrl: './menu.html',
    styleUrl: './menu.scss'
})
export class MenuComponent {
    private readonly store = inject(Store);
    el: ElementRef = inject(ElementRef);
    menu$ = this.store.select(MenuSelectors.selectMenuItems);
    @ViewChild('menuContainer') menuContainer!: ElementRef;

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.store.dispatch(MenuActions.loadMenu());
    }
}
