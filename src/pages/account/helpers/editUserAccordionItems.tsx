import InputComponent from '@/components/FormComponents/InputComponent';
import SelectComponent from '@/components/FormComponents/SelectComponent';
import CheckboxComponent from '@/components/FormComponents/CheckboxComponent';
import {
    RiUser3Line,
    RiSettings3Line,
    RiFilter3Line,
    RiShieldLine,
} from '@/components/IconComponent/Icons';
import {
    APP_LANGUAGE_OPTIONS,
    CANDIDATE_SORTING_OPTIONS,
    INACTIVITY_TIMEOUT_OPTIONS,
    LANGUAGES_OPTIONS,
    RECENT_APPS_TIMEFRAME_OPTIONS, SKILLS_OPTIONS, TAGS_OPTIONS,
    TIMEZONE_OPTIONS
} from "@/demoData";

interface EditUserFormState {
    firstName            : string;
    lastName             : string;
    inactivityTimeout    : string | number;
    recentAppsTimeframe  : string | number;
    senderDisplayName    : string;
    senderEmail          : string;
    candidateSorting     : string | number;
    appLanguage          : string | number;
    timezone             : string | number;
    simplifiedResumeView : boolean;
    showDetailedJobHistory: boolean;
    skills               : string | number;
    tags                 : string | number;
    languages            : string | number;
    enable2FA            : boolean;
}

type SetFieldFn = <K extends keyof EditUserFormState>(key: K, value: EditUserFormState[K]) => void;

type TFunction = (key: string) => string | undefined;

export function getEditUserAccordionItems(
    form: EditUserFormState,
    setField: SetFieldFn,
    t: TFunction
): any[] {
    return [
        {
            id   : 'personal',
            title: t('lblPersonalDetails') ?? 'Personal Details',
            icon : <RiUser3Line className="w-4 h-4" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputComponent
                        label={t('lblFirstName') ?? 'First Name'}
                        value={form.firstName}
                        onChange={e => setField('firstName', e.target.value)}
                        placeholder="Enter first name"
                        fullWidth
                    />
                    <InputComponent
                        label={t('lblLastName') ?? 'Last Name'}
                        value={form.lastName}
                        onChange={e => setField('lastName', e.target.value)}
                        placeholder="Enter last name"
                        fullWidth
                    />
                </div>
            ),
        },
        {
            id   : 'options',
            title: t('lblOptions') ?? 'Options',
            icon : <RiSettings3Line className="w-4 h-4" />,
            content: (
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectComponent
                            label={t('lblInactivityTimeout') ?? 'User inactivity timeout'}
                            options={INACTIVITY_TIMEOUT_OPTIONS}
                            value={form.inactivityTimeout}
                            onChange={v => setField('inactivityTimeout', v ?? '')}
                        />
                        <SelectComponent
                            label={t('lblRecentAppsTimeframe') ?? 'Recent applications time frame'}
                            options={RECENT_APPS_TIMEFRAME_OPTIONS}
                            value={form.recentAppsTimeframe}
                            onChange={v => setField('recentAppsTimeframe', v ?? '')}
                        />
                        <InputComponent
                            label={t('lblSenderDisplayName') ?? 'Sender display name'}
                            value={form.senderDisplayName}
                            onChange={e => setField('senderDisplayName', e.target.value)}
                            placeholder="Enter sender display name"
                            fullWidth
                        />
                        <InputComponent
                            label={t('lblSenderEmail') ?? 'Sender email'}
                            type="email"
                            value={form.senderEmail}
                            onChange={e => setField('senderEmail', e.target.value)}
                            placeholder="Enter sender email"
                            fullWidth
                        />
                        <SelectComponent
                            label={t('lblDefaultCandidateSorting') ?? 'Default candidates sorting'}
                            options={CANDIDATE_SORTING_OPTIONS}
                            value={form.candidateSorting}
                            onChange={v => setField('candidateSorting', v ?? '')}
                        />
                        <SelectComponent
                            label={t('lblAppLanguage') ?? 'Application language'}
                            options={APP_LANGUAGE_OPTIONS}
                            value={form.appLanguage}
                            onChange={v => setField('appLanguage', v ?? '')}
                        />
                        <SelectComponent
                            label={t('lblTimezone') ?? 'Time zone'}
                            options={TIMEZONE_OPTIONS}
                            value={form.timezone}
                            onChange={v => setField('timezone', v ?? '')}
                        />
                    </div>
                    <div className="flex flex-col gap-3 pt-2 border-t border-main">
                        <CheckboxComponent
                            name="simplifiedResumeView"
                            label={t('lblSimplifiedResumeView') ?? 'Simplified resume view'}
                            checked={form.simplifiedResumeView}
                            onChange={checked => setField('simplifiedResumeView', checked)}
                        />
                        <CheckboxComponent
                            name="showDetailedJobHistory"
                            label={t('lblShowDetailedJobHistory') ?? 'Show detailed job history for candidate'}
                            checked={form.showDetailedJobHistory}
                            onChange={checked => setField('showDetailedJobHistory', checked)}
                        />
                    </div>
                </div>
            ),
        },
        {
            id   : 'filterOptions',
            title: t('lblFilterOptions') ?? 'Filter Options',
            icon : <RiFilter3Line className="w-4 h-4" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SelectComponent
                        label={t('lblSkills') ?? 'Skills'}
                        options={SKILLS_OPTIONS}
                        value={form.skills}
                        onChange={v => setField('skills', v ?? '')}
                        placeholder="Select skill..."
                    />
                    <SelectComponent
                        label={t('lblTags') ?? 'Tags'}
                        options={TAGS_OPTIONS}
                        value={form.tags}
                        onChange={v => setField('tags', v ?? '')}
                        placeholder="Select tag..."
                    />
                    <SelectComponent
                        label={t('lblLanguages') ?? 'Languages'}
                        options={LANGUAGES_OPTIONS}
                        value={form.languages}
                        onChange={v => setField('languages', v ?? '')}
                        placeholder="Select language..."
                    />
                </div>
            ),
        },
        {
            id   : 'security',
            title: t('lblSecurityOptions') ?? 'Security Options',
            icon : <RiShieldLine className="w-4 h-4" />,
            content: (
                <div className="flex flex-col gap-3">
                    <CheckboxComponent
                        name="enable2FA"
                        label={t('lblEnable2FA') ?? 'Enable 2-factor authentication'}
                        checked={form.enable2FA}
                        onChange={checked => setField('enable2FA', checked)}
                    />
                </div>
            ),
        },
    ];
}

