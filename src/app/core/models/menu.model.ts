import { MenuItem } from 'primeng/api';

export interface AppMenuItem extends MenuItem {
    description?: string;
    visible?: boolean;
    items?: AppMenuItem[];
}

export interface AppMenu {
    label: string;
    icon?: string;
    description?: string;
    items?: AppMenuItem[];
    separator?: boolean;
}
