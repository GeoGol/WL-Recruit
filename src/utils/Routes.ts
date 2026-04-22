import { lazy, type LazyExoticComponent } from 'react';

// Core
const Home       = lazy(() => import('@/pages/Home'));
const Jobs       = lazy(() => import('@/pages/Jobs'));
const Candidates = lazy(() => import('@/pages/Candidates'));
const Mail       = lazy(() => import('@/pages/Mail'));
const Reports    = lazy(() => import('@/pages/Reports'));
const Interviews = lazy(() => import('@/pages/Interviews'));

// Reports
const AnalyticsDashboard     = lazy(() => import('@/pages/reports/AnalyticsDashboard'));
const HiringPaceReport       = lazy(() => import('@/pages/reports/HiringPaceReport'));
const SourcesReport          = lazy(() => import('@/pages/reports/SourcesReport'));
const ActivityReport         = lazy(() => import('@/pages/reports/ActivityReport'));
const DetailedActivityReport = lazy(() => import('@/pages/reports/DetailedActivityReport'));
const JobAssignmentsReport   = lazy(() => import('@/pages/reports/JobAssignmentsReport'));
const CandidatesReport       = lazy(() => import('@/pages/reports/CandidatesReport'));
const DiversityReport        = lazy(() => import('@/pages/reports/DiversityReport'));
const JobsReport             = lazy(() => import('@/pages/reports/JobsReport'));
const Export                 = lazy(() => import('@/pages/reports/Export'));

// ApplicationSettings
const Settings           = lazy(() => import('@/pages/settings/ApplicationSettings'));
const Users              = lazy(() => import('@/pages/settings/Users'));
const Organizations      = lazy(() => import('@/pages/settings/Organizations'));
const Departments        = lazy(() => import('@/pages/settings/Departments'));
const Roles              = lazy(() => import('@/pages/settings/Roles'));
const PipelineStagesSets = lazy(() => import('@/pages/settings/PipelineStagesSets'));
const PipelineStages     = lazy(() => import('@/pages/settings/PipelineStages'));
const Questions          = lazy(() => import('@/pages/settings/Questions'));
const Templates          = lazy(() => import('@/pages/settings/Templates'));
const EvaluationsForms   = lazy(() => import('@/pages/settings/EvaluationsForms'));
const Consents           = lazy(() => import('@/pages/settings/Consents'));
const Projects           = lazy(() => import('@/pages/settings/Projects'));
const ManageIntegrations = lazy(() => import('@/pages/settings/ManageIntegrations'));
// ── Dev only ──────────────────────────────────────────────────────────────────
const ApiTests = import.meta.env.DEV
    ? lazy(() => import('@/pages/ApiTests'))
    : null;

// Account
const ChangePassword    = lazy(() => import('@/pages/account/ChangePassword'));
const EditUserDetails   = lazy(() => import('@/pages/account/EditUserDetails'));
const BillingHistory    = lazy(() => import('@/pages/account/BillingHistory'));
const NewSupportRequest = lazy(() => import('@/pages/account/NewSupportRequest'));

// Fallback
const NotFound = lazy(() => import('@/pages/NotFound'));

export interface AppRoute {
    path: string;
    component: LazyExoticComponent<(props: any) => JSX.Element>;
}

export const routes: AppRoute[] = [
    { path: '/',                             component: Home },
    { path: '/jobs',                         component: Jobs },
    { path: '/candidates',                   component: Candidates },
    { path: '/inbox',                        component: Mail },
    { path: '/reports',                      component: Reports },
    { path: '/analytics-dashboard',          component: AnalyticsDashboard },
    { path: '/hiring-pace-report',           component: HiringPaceReport },
    { path: '/sources-report',               component: SourcesReport },
    { path: '/activity-report',              component: ActivityReport },
    { path: '/detailed-activity-report',     component: DetailedActivityReport },
    { path: '/assignments-report',           component: JobAssignmentsReport },
    { path: '/candidates-report',            component: CandidatesReport },
    { path: '/diversity-report',             component: DiversityReport },
    { path: '/jobs-report',                  component: JobsReport },
    { path: '/export',                       component: Export },
    { path: '/video-interviews-invitations', component: Interviews },
    { path: '/billing-history',              component: BillingHistory },
    { path: '/change-password',              component: ChangePassword },
    { path: '/account/edit-user-details',    component: EditUserDetails },
    { path: '/new-support-request',          component: NewSupportRequest },
    { path: '/settings',                     component: Settings },
    { path: '/users',                        component: Users },
    { path: '/organizations',                component: Organizations },
    { path: '/departments',                  component: Departments },
    { path: '/roles',                        component: Roles },
    { path: '/pipeline-stages-sets',         component: PipelineStagesSets },
    { path: '/pipeline-stages',              component: PipelineStages     },
    { path: '/questions',                    component: Questions },
    { path: '/templates',                    component: Templates },
    { path: '/evaluations-forms',            component: EvaluationsForms },
    { path: '/consents',                     component: Consents },
    { path: '/projects',                     component: Projects },
    { path: '/manage-integrations',          component: ManageIntegrations },
    ...(import.meta.env.DEV && ApiTests ? [{ path: '/api-playground', component: ApiTests }] : []),
    { path: '*',                             component: NotFound },

];
