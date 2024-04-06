import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),

        laravel({
            input: ['resources/js/app.js'], // Remova 'resources/css/app.css'
            refresh: true,
        }),
    ],
    build: {
        cssCodeSplit: false, // Desative a divisão de código CSS
    },
});
