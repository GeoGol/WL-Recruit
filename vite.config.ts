import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        target: 'es2020',
        sourcemap: false,
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'router': ['react-router-dom'],
                    'i18n': ['i18next', 'react-i18next'],
                    'query': ['@tanstack/react-query'],
                },
            },
        },
        chunkSizeWarningLimit: 600,
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            'i18next',
            'react-i18next',
            '@tanstack/react-query',
        ],
    },
    esbuild: {
        drop: ['console', 'debugger'],
    },
});