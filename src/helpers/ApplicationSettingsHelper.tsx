import InputComponent from '@/components/FormComponents/InputComponent';
import SelectComponent from '@/components/FormComponents/SelectComponent';
import CheckboxComponent from '@/components/FormComponents/CheckboxComponent';
import {
    RiSettings3Line,
    RiShieldLine,
    RiFlowChart,
    RiEyeOffLine,
} from '@/components/IconComponent/Icons';
import {
    AUTOMATIC_LANGUAGES_OPTIONS,
    CANDIDATES_RETENTION_OPTIONS,
} from "@/demoData";
import { ApplicationSettingsFormState } from "@/models";

type SetFieldFn = <K extends keyof ApplicationSettingsFormState>(key: K, value: ApplicationSettingsFormState[K]) => void;
type TFunction = (key: string) => string | undefined;

export function getApplicationSettingsMapper(
    form: ApplicationSettingsFormState,
    setField: SetFieldFn,
    t: TFunction
): any[] {
    return [
        {
            id   : 'generalSettings',
            title: t('lblGeneralSettings'),
            icon : <RiSettings3Line className="w-5 h-5 text-primary font-semibold" />,
            content: (
                <div className="grid md:grid-cols-2 gap-4">
                    <SelectComponent
                        label={t('lblAutoTextLanguage')}
                        options={AUTOMATIC_LANGUAGES_OPTIONS}
                        value={form.automaticTextsLanguage}
                        onChange={v => setField('automaticTextsLanguage', v ?? '')}
                    />
                    <InputComponent
                        label={t('lblAccountJobMailbox')}
                        value={form.accountJobMailbox}
                        onChange={e => setField('accountJobMailbox', e.target.value)}
                        placeholder="Company name"
                        fullWidth
                    />
                </div>
            ),
        },
        {
            id   : 'gdprSettings',
            title: t('lblGdprSettings'),
            icon : <RiShieldLine className="w-5 h-5 text-primary font-semibold" />,
            content: (
                <div className="flex flex-col gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <SelectComponent
                            label={t('lblCandidatesRetentionPeriod')}
                            options={CANDIDATES_RETENTION_OPTIONS}
                            value={form.candidatesRetentionPeriod}
                            onChange={v => setField('candidatesRetentionPeriod', Number(v ?? 60))}
                        />
                    </div>
                    <CheckboxComponent
                        name="candidatesRedrawApplication"
                        label={t('lblCandidateMayRedraw')}
                        checked={form.candidatesRedrawApplication}
                        onChange={checked => setField('candidatesRedrawApplication', checked)}
                    />
                </div>
            ),
        },
        {
            id   : 'workflowSettings',
            title: t('lblWorkflowSettings'),
            icon : <RiFlowChart className="w-5 h-5 text-primary font-semibold" />,
            content: (
                <div className="flex flex-col gap-4">
                    <CheckboxComponent
                        name="strictWorkFlow"
                        label={t('lblEnableStrictWorkflow')}
                        checked={form.strictWorkFlow}
                        onChange={checked => setField('strictWorkFlow', checked)}
                    />
                    <CheckboxComponent
                        name="pipelineStageEmail"
                        label={t('lblSendPipelineChangeNotifications')}
                        checked={form.pipelineStageEmail}
                        onChange={checked => setField('pipelineStageEmail', checked)}
                    />
                </div>
            ),
        },
        {
            id   : 'blindHiring',
            title: t('lblBlindHiringOptions'),
            icon : <RiEyeOffLine className="w-5 h-5 text-primary font-semibold" />,
            content: (
                <div className="flex flex-col gap-4">
                    <InputComponent
                        label={t('lblEnableBlindHiringInTheseRoles')}
                        value={form.blindHiringRoles}
                        fullWidth
                        onChange={v => setField('blindHiringRoles', String(v ?? ''))}
                        placeholder="Select roles..."
                    />
                    <CheckboxComponent
                        name="hideLocation"
                        label={t('lblHideLocation')}
                        checked={form.hideLocation}
                        onChange={checked => setField('hideLocation', checked)}
                    />
                    <CheckboxComponent
                        name="hideSchoolName"
                        label={t('lblHideSchoolNames')}
                        checked={form.hideSchoolName}
                        onChange={checked => setField('hideSchoolName', checked)}
                    />
                    <CheckboxComponent
                        name="hideDates"
                        label={t('lblHideDates')}
                        checked={form.hideDates}
                        onChange={checked => setField('hideDates', checked)}
                    />
                </div>
            ),
        },
    ];
}
