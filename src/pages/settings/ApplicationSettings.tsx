import { t } from "i18next";
import { useState } from "react";
import { ApplicationSettingsFormState } from "@/models";
import { getApplicationSettingsMapper } from "@/helpers/ApplicationSettingsHelper";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";

export default function ApplicationSettings() {

    const [form, setForm] = useState<ApplicationSettingsFormState>({
        automaticTextsLanguage      : 'el',
        accountJobMailbox           : 'acme-company',
        candidatesRetentionPeriod   : 60,
        candidatesRedrawApplication : true,
        strictWorkFlow              : true,
        pipelineStageEmail          : false,
        blindHiringRoles            : '',
        hideLocation                : false,
        hideSchoolName              : false,
        hideDates                   : false,
    });

    const setField = <K extends keyof ApplicationSettingsFormState>(key: K, value: ApplicationSettingsFormState[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
    };

    const applicationSettingsItems = getApplicationSettingsMapper(form, setField, t);

    return (
        <div className="w-full flex flex-col gap-4 p-4 bg-surface rounded-lg">

            <h2 className="text-xl md:text-2xl font-bold text-primary">
                {t('lblApplicationSettings')}
            </h2>

            <form className={'flex gap-3 items-center flex-wrap'} onSubmit={handleSubmit} noValidate>

                {applicationSettingsItems.map((section, idx) => (
                    <div key={section.id} className={'w-full flex flex-col gap-5'}>
                        <div className="flex items-center gap-3 text-left font-medium text-primary text-lg">
                            {section.icon}
                            <h3 className="text-primary font-semibold">{t(section.title)}</h3>
                        </div>

                        {section.content}

                        {idx < applicationSettingsItems.length - 1 && (
                            <hr className="border-main" />
                        )}
                    </div>
                ))}

                <div className="w-full flex justify-end gap-2 pt-2">
                    <ButtonComponent
                        type="button"
                        variant="main"
                        label={t('btnCancel') || 'Cancel'}
                        onClick={() => console.log('cancelled')}
                    />
                    <ButtonComponent
                        type="submit"
                        variant="confirmation"
                        label={t('btnSave') || 'Save changes'}
                    />
                </div>
            </form>

        </div>
    );
}
