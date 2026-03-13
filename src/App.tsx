import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MediaQueryProvider } from '@/context/MediaQueryContext';
import LayoutComponent from '@/components/LayoutComponent/LayoutComponent';

// Lazy-load every page — each becomes its own JS chunk
const Home                  = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const Jobs                  = lazy(() => import('@/pages/Jobs').then(m => ({ default: m.Jobs })));
const Candidates            = lazy(() => import('@/pages/Candidates').then(m => ({ default: m.Candidates })));
const Mail                  = lazy(() => import('@/pages/Mail').then(m => ({ default: m.Mail })));
const Reports               = lazy(() => import('@/pages/Reports').then(m => ({ default: m.Reports })));
const Interviews            = lazy(() => import('@/pages/Interviews').then(m => ({ default: m.Interviews })));
const AnalyticsDashboard    = lazy(() => import('@/pages/AnalyticsDashboard').then(m => ({ default: m.AnalyticsDashboard })));
const HiringPaceReport      = lazy(() => import('@/pages/HiringPaceReport').then(m => ({ default: m.HiringPaceReport })));
const SourcesReport         = lazy(() => import('@/pages/SourcesReport').then(m => ({ default: m.SourcesReport })));
const CandidatesReport      = lazy(() => import('@/pages/CandidatesReport').then(m => ({ default: m.CandidatesReport })));
const JobAssignmentsReport  = lazy(() => import('@/pages/JobAssignmentsReport').then(m => ({ default: m.JobAssignmentsReport })));
const ActivityReport        = lazy(() => import('@/pages/ActivityReport').then(m => ({ default: m.ActivityReport })));
const DetailedActivityReport= lazy(() => import('@/pages/DetailedActivityReport').then(m => ({ default: m.DetailedActivityReport })));
const DiversityReport       = lazy(() => import('@/pages/DiversityReport').then(m => ({ default: m.DiversityReport })));
const JobsReport            = lazy(() => import('@/pages/JobsReport').then(m => ({ default: m.JobsReport })));
const Export                = lazy(() => import('@/pages/Export').then(m => ({ default: m.Export })));
const Positions             = lazy(() => import('@/pages/Positions').then(m => ({ default: m.Positions })));


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

const PageFallback = () => (
    <div className="flex items-center justify-center w-full h-32">
        <div className="animate-pulse text-secondary text-sm">Loading...</div>
    </div>
);

export default function App() {
    return (
        <MediaQueryProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Suspense fallback={<PageFallback />}>
                        <Routes>
                            <Route path="/"                          element={<LayoutComponent><Home /></LayoutComponent>} />
                            <Route path="/jobs"                      element={<LayoutComponent><Jobs /></LayoutComponent>} />
                            <Route path="/candidates"                element={<LayoutComponent><Candidates /></LayoutComponent>} />
                            <Route path="/inbox"                     element={<LayoutComponent><Mail /></LayoutComponent>} />
                            <Route path="/reports"                   element={<LayoutComponent><Reports /></LayoutComponent>} />
                            <Route path="/analytics-dashboard"       element={<LayoutComponent><AnalyticsDashboard /></LayoutComponent>} />
                            <Route path="/hiring-pace-report"        element={<LayoutComponent><HiringPaceReport /></LayoutComponent>} />
                            <Route path="/sources-report"            element={<LayoutComponent><SourcesReport /></LayoutComponent>} />
                            <Route path="/activity-report"           element={<LayoutComponent><ActivityReport /></LayoutComponent>} />
                            <Route path="/detailed-activity-report"  element={<LayoutComponent><DetailedActivityReport /></LayoutComponent>} />
                            <Route path="/assignments-report"        element={<LayoutComponent><JobAssignmentsReport /></LayoutComponent>} />
                            <Route path="/candidates-report"         element={<LayoutComponent><CandidatesReport /></LayoutComponent>} />
                            <Route path="/diversity-report"          element={<LayoutComponent><DiversityReport /></LayoutComponent>} />
                            <Route path="/jobs-report"               element={<LayoutComponent><JobsReport /></LayoutComponent>} />
                            <Route path="/export"                    element={<LayoutComponent><Export /></LayoutComponent>} />
                            <Route path="/video-interviews-invitations" element={<LayoutComponent><Interviews /></LayoutComponent>} />
                            <Route path="/positions"                 element={<LayoutComponent><Positions /></LayoutComponent>} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </QueryClientProvider>
        </MediaQueryProvider>
    );
}