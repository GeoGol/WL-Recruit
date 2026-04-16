import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
// ── Dev-only plugin: virtual API that returns any HTTP status on demand ───────
const apiTestMiddleware = {
    name: 'api-test-middleware',
    configureServer(server: any) {
        server.middlewares.use((req: any, res: any, next: any) => {
            const match = (req.url as string)?.match(/^\/api\/test\/([^?]+)/);
            if (!match) { next(); return; }
            const segment = match[1];
            // Simulate request timeout — server responds after 20s, client aborts at 10s
            if (segment === 'timeout') {
                setTimeout(() => { res.writeHead(200); res.end('{}'); }, 20_000);
                return;
            }
            const status = parseInt(segment, 10);
            if (isNaN(status)) { next(); return; }
            // Codes WITH a server body  => exercises "prefer server message" path
            // Codes WITHOUT (403,429,502,503,504) => exercises generic fallback path
            const bodies: Record<number, object> = {
                200: { id: 1, name: 'Test Resource', createdAt: new Date().toISOString() },
                201: { id: 99, name: 'Created Resource' },
                400: {
                    message: 'The email field is required.',
                    fields: { email: ['is required'], name: ['must be at least 3 characters'] },
                },
                401: { message: 'Token has expired. Please log in again.' },
                404: { message: 'Organization with id=42 was not found.' },
                409: { message: 'An organization with this name already exists.' },
                422: {
                    message: 'Submitted data failed validation.',
                    fields: { email: ['is not a valid email'], role: ['must be one of: admin, user, guest'] },
                },
                500: { message: 'Database query failed: connection timeout.' },
            };
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(status);
            res.end(JSON.stringify(bodies[status] ?? {}));
        });
    },
};
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        tsconfigPaths(),
        ...(mode !== 'production' ? [apiTestMiddleware] : []),
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
                    'router'       : ['react-router-dom'],
                    'i18n'         : ['i18next', 'react-i18next', 'i18next-http-backend'],
                    'query'        : ['@tanstack/react-query'],
                },
            },
        },
        chunkSizeWarningLimit: 500,
    },
    optimizeDeps: {
        include: [
            'react-router-dom',
            'i18next',
            'react-i18next',
            '@tanstack/react-query',
        ],
        exclude: ['xlsx'],
    },
    esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
}));