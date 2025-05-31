import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 54100,
    },
    base: '/IHC-VALIDATION-APP/',
    preview: {
        port: 4173,
        strictPort: true,
        host: true
    }
})