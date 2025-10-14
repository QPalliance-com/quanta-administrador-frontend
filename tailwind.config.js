/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class="app-dark"]'],
    content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [PrimeUI],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
        extend: {
            colors: {
                'hot-pink': {
                    50: '#fcedf2',
                    100: '#f8d4e1',
                    200: '#f2adc7',
                    300: '#ee86b1',
                    400: '#ea5c9e',
                    500: '#da408c',
                    600: '#b03270',
                    700: '#822252',
                    800: '#541333',
                    900: '#260514'
                }
            }
        }
    }
};
