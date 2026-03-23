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