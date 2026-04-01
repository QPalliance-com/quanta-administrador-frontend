import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuitemComponent } from '../menuitem/menuitem';
import { RouterModule } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-menu, [app-menu]',
    standalone: true,
    imports: [CommonModule, MenuitemComponent, RouterModule],
    templateUrl: './menu.html',
    styleUrl: './menu.scss'
})
export class MenuComponent {
    el: ElementRef = inject(ElementRef);
    menuService = inject(MenuService);
    menu = this.menuService.menuItems;
    @ViewChild('menuContainer') menuContainer!: ElementRef;
}
