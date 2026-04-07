import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig(({ mode }) => ({
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
                    'react-vendor' : ['react', 'react-dom'],
                    'router'       : ['react-router-dom'],
                    'i18n'         : ['i18next', 'react-i18next', 'i18next-http-backend'],
                    'query'        : ['@tanstack/react-query'],
                    'flowbite'     : ['flowbite-react'],
                    'tiptap'       : [
                        '@tiptap/react',
                        '@tiptap/starter-kit',
                        '@tiptap/extension-character-count',
                        '@tiptap/extension-link',
                        '@tiptap/extension-placeholder',
                        '@tiptap/extension-text-align',
                        '@tiptap/extension-underline',
                        '@tiptap/pm',
                    ],
                },
            },
        },
        chunkSizeWarningLimit: 500,
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
        drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
}));
