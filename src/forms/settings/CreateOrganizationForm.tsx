import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getCreateOrganizationMapper } from '@/helpers/CreateOrganizationHelper';
import { OrganizationFormState } from '@/models';

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: OrganizationFormState = {
    organizationName        : '',
    careerSiteStatus        : 'active',
    careerSiteAddress       : '',
    organizationLogo        : '',
    organizationLogoName    : '',
    changeOrganizationLogo  : '',
    corporateWebsiteAddress : '',
    careerSiteLanguage      : '',
    showAdmissionJobLink    : false,
    jobsGrouping            : '',
    companyProfileDEFAULT   : '',
    companyProfileGR        : '',
    companyProfileEN        : '',
    bgImage                 : '',
    bgImageName             : '',
    linkColor               : '#1B91FF',
    buttonColor             : '#1B91FF',
    acceptTerms             : false,
    privacyPolicyText       : '',
    privacyPolicyLink       : '',
    generalTermsText        : '',
    autoReplyTemplate       : '',
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreateOrganizationFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: OrganizationFormState) => void;
    onCancel?    : () => void;
    initialData? : Partial<OrganizationFormState>;
    formId?      : string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreateOrganizationForm = memo(function CreateOrganizationForm({ onSubmit, type: _type, initialData, formId = 'create-organization-form' }: Readonly<CreateOrganizationFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<OrganizationFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof OrganizationFormState>(key: K, value: OrganizationFormState[K]) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    const organizationItems = getCreateOrganizationMapper(form, setField, t);

    return (
        <form id={formId} onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
                {organizationItems.map((section, idx) => (
                    <React.Fragment key={section.id} >
                        <div className="w-full flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-left font-medium text-primary text-lg md:text-xl">
                                {section.icon}
                                <h3 className="text-primary font-semibold">{section.title}</h3>
                            </div>

                            {section.content}

                        </div>

                        {idx < organizationItems.length - 1 && (
                            <hr className="border-main" />
                        )}
                    </React.Fragment>

                ))}
            </div>
        </form>
    );
});

CreateOrganizationForm.displayName = 'CreateOrganizationForm';
export default CreateOrganizationForm;
