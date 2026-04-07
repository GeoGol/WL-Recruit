import InputComponent from '@/components/FormComponents/InputComponent';
import SelectComponent from '@/components/FormComponents/SelectComponent';
import CheckboxComponent from '@/components/FormComponents/CheckboxComponent';
import RadioComponent from '@/components/FormComponents/RadioComponent';
import RichTextEditor from '@/components/FormComponents/RichTextEditor';
import FileInputComponent from '@/components/FormComponents/FileInputComponent';
import {
    RiBuildingLine,
    RiGlobalLine,
    RiPaletteLine,
    RiShieldLine,
} from '@/components/IconComponent/Icons';
import { APP_LANGUAGE_OPTIONS, JOBS_GROUPING_OPTIONS, AUTO_REPLY_TEMPLATE_OPTIONS } from '@/demoData';
import { OrganizationFormState } from '@/models';

type SetFieldFn = <K extends keyof OrganizationFormState>(key: K, value: OrganizationFormState[K]) => void;

type TFunction = (key: string) => string | undefined;

export function getCreateOrganizationMapper(
    form: OrganizationFormState,
    setField: SetFieldFn,
    t: TFunction
): any[] {
    return [
        // ── General Settings ───────────────────────────────────────────────
        {
            id     : 'general',
            title  : t('lblGeneralSettings'),
            icon   : <RiBuildingLine className="w-4 h-4" />,
            content: (
                <div className="flex flex-col gap-4">
                    <InputComponent
                        label={t('lblOrganizationName')}
                        value={form.organizationName}
                        onChange={e => setField('organizationName', e.target.value)}
                        required={true}
                        fullWidth
                    />
                </div>
            ),
        },

        // ── Career Site Settings ───────────────────────────────────────────
        {
            id     : 'careerSite',
            title  : t('lblCareerSiteSettings'),
            icon   : <RiGlobalLine className="w-4 h-4" />,
            content: (
                <div className="flex flex-col gap-4">
                    {/*<RadioComponent*/}
                    {/*    name="careerSiteStatus"*/}
                    {/*    label={t('lblCareerSiteStatus')}*/}
                    {/*    layout="horizontal"*/}
                    {/*    value={form.careerSiteStatus}*/}
                    {/*    onChange={v => setField('careerSiteStatus', String(v))}*/}
                    {/*    options={[*/}
                    {/*        { value: 'active',   label: t('lblActive')   ?? 'Active'   },*/}
                    {/*        { value: 'inactive', label: t('lblInactive') ?? 'Inactive' },*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    <InputComponent
                        label={t('lblCareerSiteAddress')}
                        value={form.careerSiteAddress}
                        onChange={e => setField('careerSiteAddress', e.target.value)}
                        fullWidth
                        required={true}
                        helperText={`apply.smartcv.co/${form.careerSiteAddress}`}
                    />
                    <FileInputComponent
                        label={t('lblOrganizationLogo')}
                        // accept="image/png, image/jpeg, image/svg+xml"
                        maxSizeMB={2}
                        // hint={t('lblOrganizationLogoHint')}
                        fullWidth
                        value={form.organizationLogo}
                        valueName={form.organizationLogoName}
                        onChange={files => {
                            setField('organizationLogo',     files?.[0] ? URL.createObjectURL(files[0]) : '');
                            setField('organizationLogoName', files?.[0]?.name ?? '');
                        }}
                    />
                    <InputComponent
                        label={t('lblCorporateWebsite')}
                        value={form.corporateWebsiteAddress}
                        onChange={e => setField('corporateWebsiteAddress', e.target.value)}
                        fullWidth
                    />
                    <SelectComponent
                        label={t('lblCareerSiteLanguage')}
                        options={APP_LANGUAGE_OPTIONS}
                        value={form.careerSiteLanguage}
                        onChange={v => setField('careerSiteLanguage', v ?? '')}
                        placeholder="Select language..."
                    />
                    <RadioComponent
                        name="showAdmissionJobLink"
                        label={t('lblShowGeneralAdmissionLink')}
                        layout="horizontal"
                        value={form.showAdmissionJobLink ? 'yes' : 'no'}
                        onChange={v => setField('showAdmissionJobLink', v === 'yes')}
                        options={[
                            { value: 'yes', label: t('lblYes') ?? 'Yes' },
                            { value: 'no',  label: t('lblNo')  ?? 'No'  },
                        ]}
                    />
                    <SelectComponent
                        label={t('lblJobGrouping')}
                        options={JOBS_GROUPING_OPTIONS}
                        value={form.jobsGrouping}
                        onChange={v => setField('jobsGrouping', v ?? '')}
                        placeholder="Select grouping..."
                    />
                    <RichTextEditor
                        label={t('lblCompanyProfile')}
                        value={form.companyProfileDEFAULT}
                        onChange={v => setField('companyProfileDEFAULT', v)}
                    />
                    <RichTextEditor
                        label={t('lblCompanyProfileEl')}
                        value={form.companyProfileGR}
                        onChange={v => setField('companyProfileGR', v)}
                    />
                    <RichTextEditor
                        label={t('lblCompanyProfileEn')}
                        value={form.companyProfileEN}
                        onChange={v => setField('companyProfileEN', v)}
                    />
                    <FileInputComponent
                        label={t('lblBackgroundImage')}
                        // accept="image/*"
                        maxSizeMB={5}
                        fullWidth
                        value={form.bgImage}
                        valueName={form.bgImageName}
                        onChange={files => {
                            setField('bgImage',     files?.[0] ? URL.createObjectURL(files[0]) : '');
                            setField('bgImageName', files?.[0]?.name ?? '');
                        }}
                    />
                </div>
            ),
        },

        // ── Colors ─────────────────────────────────────────────────────────
        {
            id     : 'colors',
            title  : t('lblColorSettings'),
            icon   : <RiPaletteLine className="w-4 h-4" />,
            content: (
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-muted text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">{t('lblLinkColor')}</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={form.linkColor}
                                onChange={e => setField('linkColor', e.target.value)}
                                className="w-8 h-8 rounded cursor-pointer border border-main"
                            />
                            <input
                                type="text"
                                value={form.linkColor}
                                onChange={e => {
                                    const val = e.target.value;
                                    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) setField('linkColor', val);
                                }}
                                maxLength={7}
                                className="w-20 text-md text-primary bg-transparent border border-main rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-700"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-muted text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">{t('lblButtonColor')}</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={form.buttonColor}
                                onChange={e => setField('buttonColor', e.target.value)}
                                className="w-8 h-8 rounded cursor-pointer border border-main"
                            />
                            <input
                                type="text"
                                value={form.buttonColor}
                                onChange={e => {
                                    const val = e.target.value;
                                    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) setField('buttonColor', val);
                                }}
                                maxLength={7}
                                className="w-20 text-md text-primary bg-transparent border border-main rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-700"
                            />
                        </div>
                    </div>
                </div>
            ),
        },

        // ── GDPR Settings ──────────────────────────────────────────────────
        {
            id     : 'gdpr',
            title  : t('lblGdprSettings') ?? 'GDPR Settings',
            icon   : <RiShieldLine className="w-4 h-4" />,
            content: (
                <div className="flex flex-col gap-4">
                    <CheckboxComponent
                        name="acceptTerms"
                        label={t('lblMandatoryTermsAcceptance')}
                        checked={form.acceptTerms}
                        onChange={checked => setField('acceptTerms', checked)}
                    />
                    <RichTextEditor
                        label={t('lblPrivacyPolicyText')}
                        value={form.privacyPolicyText}
                        onChange={v => setField('privacyPolicyText', v)}
                    />
                    <InputComponent
                        label={t('lblPrivacyPolicyLink')}
                        value={form.privacyPolicyLink}
                        onChange={e => setField('privacyPolicyLink', e.target.value)}
                        placeholder="https://acme.com/privacy"
                        fullWidth
                    />
                    <RichTextEditor
                        value={form.generalTermsText}
                        label={t('lblGeneralTermsText')}
                        helperText={t('lblGeneralTermsTextMoreInfo')}
                        onChange={v => setField('generalTermsText', v)}
                    />
                    <SelectComponent
                        label={t('lblAutomatedEmailTemplate')}
                        options={AUTO_REPLY_TEMPLATE_OPTIONS}
                        value={form.autoReplyTemplate}
                        onChange={v => setField('autoReplyTemplate', v ?? '')}
                        placeholder="Select template..."
                    />
                </div>
            ),
        },
    ];
}
