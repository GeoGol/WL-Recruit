import {NavigationItem} from "@/models/NavigationModel";

export const NavigationItems: NavigationItem[] = [
  {
    id: "jobs",
    label: "lblJobsShort",
    className: "text-base-md text-sky-600 cursor-pointer",
    link: "jobs",
  },
  {
    id: "candidates",
    label: "candidates",
    className: "text-base-md text-sky-600 cursor-pointer",
    link: "candidates",
  },
  {
    id: "inbox",
    label: "lblInbox",
    className: "text-base-md text-sky-600 cursor-pointer",
    link: "inbox",
  },
  {
    id: "reports",
    label: "lblReports",
    className: "text-base-md text-sky-600 cursor-pointer",
    children: [
      {
        id: "analytics_dashboard",
        label: "lblAnalyticsDashboard",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "analytics-dashboard",
      },
      {
        id: "hiring_pace_report",
        label: "lblHiringPace",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "hiring-pace-report",
      },
      {
        id: "sources_report",
        label: "lblExternalSources",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "sources-report",
      },
      {
        id: "activity_report",
        label: "lblActivity",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "activity-report",
      },
      {
        id: "detailed_activity_report",
        label: "lblDetailedActivity",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "detailed-activity-report",
      },
      {
        id: "assignments_report",
        label: "lblAssignments",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "assignments-report",
      },
      {
        id: "candidates_report",
        label: "lblNumOfApplicants",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "candidates-report",
      },
      {
        id: "diversity_report",
        label: "lblCandidateDiversity",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "diversity-report",
      },
      {
        id: "jobs_report",
        label: "lblNumberOfJobs",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "jobs-report",
      },
      {
        id: "export",
        label: "mnoExportData",
        className: "text-base-md text-sky-600 cursor-pointer",
        link: "export",
      },
    ]
  },
  {
    id: "video_interviews_invitations",
    label: "lblVideoInterviews",
    className: "text-base-md text-sky-600 cursor-pointer",
    link: "video-interviews-invitations",
  },

];

export const SettingsInternalItems: NavigationItem[] = [
  {
    id: "settings",
    label: "mnoOptions",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "settings",
  },
  {
    id: "users",
    label: "lblUsers",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "users",
  },
  {
    id: "organizations",
    label: "lblOrganizations",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "organizations",
  },
  {
    id: "departments",
    label: "lblDepartments",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "departments",
  },
  {
    id: "roles",
    label: "lblRoles",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "roles",
  },
  {
    id: "pipeline_stages_sets",
    label: "lblPipelineStagesSets",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "pipeline-stages-sets",
  },
  {
    id: "questions",
    label: "lblQuestions",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "questions",
  },
  {
    id: "templates",
    label: "lblTemplates",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "templates",
  },
  {
    id: "evaluations_forms",
    label: "lblEvaluationForms",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "evaluations-forms",
  },
  {
    id: "consents",
    label: "lblConsents",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "consents",
  },
  {
    id: "projects",
    label: "lblProjects",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "projects",
  },
  {
    id: "integrations",
    label: "lblIntegrations",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "manage-integrations",
  },
];

export const ProfileInternalItems: NavigationItem[] = [
  // {
  //   id: "name",
  //   label: "name",
  //   className: "text-base-md text-sky-600 cursor-pointer",
  // },
  {
    id: "change_password",
    label: "lblChangePassword",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "/change-password",
    group: 1
  },
  {
    id: "account_user_details",
    label: "mnoEditUserDetails",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "/account/edit-user-details",
    group: 1
  },
  {
    id: "help",
    label: "lblHelpCenter",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "https://help.smartcv.co",
    group: 2
  },
  {
    id: "new_support_request",
    label: "lblNewSupportRequest",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "/new-support-request",
    group: 2
  },
  {
    id: "billing_history",
    label: "mnoBillingHistory",
    className: "rounded-md text-primary hover:bg-base cursor-pointer",
    link: "/billing-history",
    group: 3
  },
  {
    id: "logout",
    label: "mnoLogout",
    className: "rounded-md text-red-700 hover:bg-destructive cursor-pointer",
    link: "/Account/Logout",
    group: 4
  }
];
