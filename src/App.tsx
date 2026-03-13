import {useTranslation} from "react-i18next";
import React, {useEffect} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MediaQueryProvider} from "@/context/MediaQueryContext";
import LayoutComponent from "@/components/LayoutComponent/LayoutComponent";
import {Positions} from "@/pages/Positions";
import {Candidates} from "@/pages/Candidates";
import {Mail} from "@/pages/Mail";
import {Reports} from "@/pages/Reports";
import {Interviews} from "@/pages/Interviews";
import {Home} from "@/pages/Home";
import {AnalyticsDashboard} from "@/pages/AnalyticsDashboard";
import {HiringPaceReport} from "@/pages/HiringPaceReport";
import {SourcesReport} from "@/pages/SourcesReport";
import {CandidatesReport} from "@/pages/CandidatesReport";
import {JobAssignmentsReport} from "@/pages/JobAssignmentsReport";
import {ActivityReport} from "@/pages/ActivityReport";
import {DetailedActivityReport} from "@/pages/DetailedActivityReport";
import {DiversityReport} from "@/pages/DiversityReport";
import {JobsReport} from "@/pages/JobsReport";
import {Export} from "@/pages/Export";
import {Jobs} from "@/pages/Jobs";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

export default function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage("en"); // Set initial language here
    }, [i18n]);

    return (
        <MediaQueryProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LayoutComponent><Home/></LayoutComponent>} />
                        <Route path="/jobs" element={<LayoutComponent><Jobs/></LayoutComponent>} />
                        <Route path="/candidates" element={<LayoutComponent><Candidates/></LayoutComponent>} />
                        <Route path="/inbox" element={<LayoutComponent><Mail/></LayoutComponent>} />
                        <Route path="/reports" element={<LayoutComponent><Reports/></LayoutComponent>} />

                        <Route path="/analytics-dashboard" element={<LayoutComponent><AnalyticsDashboard/></LayoutComponent>} />
                        <Route path="/hiring-pace-report" element={<LayoutComponent><HiringPaceReport/></LayoutComponent>} />
                        <Route path="/sources-report" element={<LayoutComponent><SourcesReport/></LayoutComponent>} />
                        <Route path="/activity-report" element={<LayoutComponent><ActivityReport/></LayoutComponent>} />
                        <Route path="/detailed-activity-report" element={<LayoutComponent><DetailedActivityReport/></LayoutComponent>} />
                        <Route path="/assignments-report" element={<LayoutComponent><JobAssignmentsReport/></LayoutComponent>} />
                        <Route path="/candidates-report" element={<LayoutComponent><CandidatesReport/></LayoutComponent>} />
                        <Route path="/diversity-report" element={<LayoutComponent><DiversityReport/></LayoutComponent>} />
                        <Route path="/jobs-report" element={<LayoutComponent><JobsReport/></LayoutComponent>} />
                        <Route path="/export" element={<LayoutComponent><Export/></LayoutComponent>} />

                        <Route path="/video-interviews-invitations" element={<LayoutComponent><Interviews/></LayoutComponent>} />
                        {/*<Route path="/:oVirtualDir" element={<LayoutComponent><Home /></LayoutComponent>} />*/}
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </MediaQueryProvider>
    )
}