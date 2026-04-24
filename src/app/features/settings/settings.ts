import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-settings',
    templateUrl: './settings.html',
    imports: [CommonModule, RouterModule]
})
export class SettingsComponent {}
