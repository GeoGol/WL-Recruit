import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MediaQueryProvider } from '@/context/MediaQueryContext';
import LayoutComponent from '@/components/LayoutComponent/LayoutComponent';
import { routes } from '@/utils/Routes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000,
        },
    },
});

const I18nFallback = () => (
    <div className="flex items-center justify-center w-screen h-screen">
        <div className="animate-pulse text-secondary text-sm">Loading...</div>
    </div>
);

const PageFallback = () => (
    <div className="flex items-center justify-center w-full h-32">
        <div className="animate-pulse text-secondary text-sm">Loading...</div>
    </div>
);

export default function App() {
    return (
        // Outer Suspense — waits for i18n translations to load before rendering anything
        <Suspense fallback={<I18nFallback />}>
            <MediaQueryProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        {/* Inner Suspense — waits for lazy-loaded page chunks */}
                        <Suspense fallback={<PageFallback />}>
                            <Routes>
                                {routes.map(({ path, component: Page }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<LayoutComponent><Page /></LayoutComponent>}
                                    />
                                ))}
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </QueryClientProvider>
            </MediaQueryProvider>
        </Suspense>
    );
}