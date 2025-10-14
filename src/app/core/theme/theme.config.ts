import Material from '@primeng/themes/material';
import { definePreset } from '@primeng/themes';

// Paleta MRP
const mrpPalette = {
    50: '#fbe4f0',
    100: '#f7c2de',
    200: '#f397c3',
    300: '#ef6da7',
    400: '#eb488f',
    500: '#D62974', // principal
    600: '#b81e5a',
    700: '#a81e5a',
    800: '#9e2e5d',
    900: '#7d1b41',
    950: '#4a0b22'
};

export const AppTheme = definePreset(Material, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            }
        },
        primary: mrpPalette
    }
});
