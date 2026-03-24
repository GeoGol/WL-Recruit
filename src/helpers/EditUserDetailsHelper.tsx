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
import {EditUserFormState} from "@/models";

type SetFieldFn = <K extends keyof EditUserFormState>(key: K, value: EditUserFormState[K]) => void;

type TFunction = (key: string) => string | undefined;

export function getEditUserDetailsMapper(
    form: EditUserFormState,
    setField: SetFieldFn,
    t: TFunction
): any[] {
    return [
        {
            id   : 'personal',
            title: t('lblPersonalDetails'),
            icon : <RiUser3Line className="w-4 h-4" />,
            content: (
                <div className="grid md:grid-cols-2 gap-4">
                    <InputComponent
                        label={t('lblFirstName')}
                        value={form.firstName}
                        onChange={e => setField('firstName', e.target.value)}
                        placeholder="Enter first name"
                        fullWidth
                    />
                    <InputComponent
                        label={t('lblLastName')}
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
            title: t('lblOptions'),
            icon : <RiSettings3Line className="w-4 h-4" />,
            content: (
                <div className={'w-full flex flex-col gap-3 '}>
                    <div className="grid md:grid-cols-2 gap-3">
                        <SelectComponent
                            label={t('lblUserInactivityTimeout')}
                            options={INACTIVITY_TIMEOUT_OPTIONS}
                            value={form.inactivityTimeout}
                            onChange={v => setField('inactivityTimeout', v ?? '')}
                        />
                        <SelectComponent
                            label={t('lblRecentApplicationsTimeframe')}
                            options={RECENT_APPS_TIMEFRAME_OPTIONS}
                            value={form.recentAppsTimeframe}
                            onChange={v => setField('recentAppsTimeframe', v ?? '')}
                        />
                        <InputComponent
                            label={t('lblEmailSender')}
                            value={form.senderDisplayName}
                            onChange={e => setField('senderDisplayName', e.target.value)}
                            placeholder="Enter sender display name"
                            fullWidth
                        />
                        <InputComponent
                            label={t('lblEmailAddress')}
                            type="email"
                            value={form.senderEmail}
                            onChange={e => setField('senderEmail', e.target.value)}
                            placeholder="Enter sender email"
                            fullWidth
                        />
                        <SelectComponent
                            label={t('lblDefaultCandidatesSorting')}
                            options={CANDIDATE_SORTING_OPTIONS}
                            value={form.candidateSorting}
                            onChange={v => setField('candidateSorting', v ?? '')}
                        />
                        <SelectComponent
                            label={t('lblUiLanguage')}
                            options={APP_LANGUAGE_OPTIONS}
                            value={form.appLanguage}
                            onChange={v => setField('appLanguage', v ?? '')}
                        />
                        <SelectComponent
                            label={t('lblTimezone')}
                            options={TIMEZONE_OPTIONS}
                            value={form.timezone}
                            onChange={v => setField('timezone', v ?? '')}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <CheckboxComponent
                            name="simplifiedResumeView"
                            label={t('lblSimplifiedResumeView')}
                            checked={form.simplifiedResumeView}
                            onChange={checked => setField('simplifiedResumeView', checked)}
                        />
                        <CheckboxComponent
                            name="showDetailedJobHistory"
                            label={t('lblDetailedJobPositionHistory')}
                            checked={form.showDetailedJobHistory}
                            onChange={checked => setField('showDetailedJobHistory', checked)}
                        />
                    </div>
                </div>
            ),
        },
        {
            id   : 'filterOptions',
            title: t('lblFilterOptions'),
            icon : <RiFilter3Line className="w-4 h-4" />,
            content: (
                <div className="grid md:grid-cols-2 gap-4">
                    <SelectComponent
                        label={t('lblSkills')}
                        options={SKILLS_OPTIONS}
                        value={form.skills}
                        onChange={v => setField('skills', v ?? '')}
                        placeholder="Select skill..."
                    />
                    <SelectComponent
                        label={t('lblTags')}
                        options={TAGS_OPTIONS}
                        value={form.tags}
                        onChange={v => setField('tags', v ?? '')}
                        placeholder="Select tag..."
                    />
                    <SelectComponent
                        label={t('lblLanguages')}
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
            title: t('lblSecurityOptions'),
            icon : <RiShieldLine className="w-4 h-4" />,
            content: (
                <div className="flex flex-col gap-3">
                    <CheckboxComponent
                        name="enable2FA"
                        label={t('lblEnableTwoFactorAuthentication')}
                        checked={form.enable2FA}
                        onChange={checked => setField('enable2FA', checked)}
                    />
                </div>
            ),
        },
    ];
}

