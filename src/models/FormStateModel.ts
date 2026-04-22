export interface EditUserFormState {
    // Personal details
    firstName            : string;
    lastName             : string;
    // Options
    inactivityTimeout    : string | number;
    recentAppsTimeframe  : string | number;
    senderDisplayName    : string;
    senderEmail          : string;
    candidateSorting     : string | number;
    appLanguage          : string | number;
    timezone             : string | number;
    simplifiedResumeView : boolean;
    showDetailedJobHistory: boolean;
    // Filter options
    skills               : string | number;
    tags                 : string | number;
    languages            : string | number;
    // Security
    enable2FA            : boolean;
}

export interface CreateUserFormState {
    firstName   : string;
    lastName    : string;
    email       : string;
    role        : number | string;
    status     ?: number | string;
    appLanguage : number | string;
}

export interface ApplicationSettingsFormState {
    // general settings
    automaticTextsLanguage        : string | number,
    accountJobMailbox             : string,
    // gdpr settings
    candidatesRetentionPeriod     : number,
    candidatesRedrawApplication   : boolean,
    // workflow settings
    strictWorkFlow                : boolean,
    pipelineStageEmail            : boolean,
    //blind hiring options
    blindHiringRoles              : string,
    hideLocation                  : boolean,
    hideSchoolName                : boolean,
    hideDates                     : boolean,
}

export interface DepartmentFormState {
    departmentName : string;
}

export interface OrganizationFormState {
    // general settings
    organizationName            : string, //input
    // career site settings
    careerSiteStatus            : string, //radio button
    careerSiteAddress           : string, //input
    organizationLogo            : string, //image preview
    organizationLogoName        : string, //image preview
    changeOrganizationLogo      : string, //select file
    corporateWebsiteAddress     : string, //input
    careerSiteLanguage          : string | number, //dropdown list
    showAdmissionJobLink        : boolean, //radio button
    jobsGrouping                : string | number, //dropdown list
    companyProfileDEFAULT       : string, //richtext editor
    companyProfileGR            : string, //richtext editor
    companyProfileEN            : string, //richtext editor
    bgImage                     : string, //select file
    bgImageName                 : string, //select file
    // colors settings
    linkColor                   : string, //color selection with preview
    buttonColor                 : string, //color selection with preview
    // gdpr settings
    acceptTerms                 : boolean, //checkbox
    privacyPolicyText           : string, //richtext editor
    privacyPolicyLink           : string, //input
    generalTermsText            : string, //richtext editor
    // other settings
    autoReplyTemplate           : string | number, //dropdown list
}

export type RightItem = {
    id: string;
    label: string;
    enabled: boolean;
}

export type PipelineStage = {
    psId: number;
    psSetId: number;
    pssName: string;
    psName: string;
    psRank: number;
    enabled: boolean;
}

export interface RoleFormState {
    roleName        : string;
    rights          : RightItem[];
    pipelinesStages : Record<string, PipelineStage[]>;
}

export interface PipelineStageSetsFormState {
    pipelineStageSetName : string;
}