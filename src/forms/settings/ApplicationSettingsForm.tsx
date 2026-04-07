import { useTranslation } from 'react-i18next';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { getApplicationSettingsMapper } from '@/helpers/ApplicationSettingsHelper';
import { ApplicationSettingsFormState } from '@/models';
import React from "react";

interface ApplicationSettingsFormProps {
    form     : ApplicationSettingsFormState;
    setField : <K extends keyof ApplicationSettingsFormState>(key: K, value: ApplicationSettingsFormState[K]) => void;
    onSubmit : (e: React.FormEvent) => void;
    onCancel?: () => void;
    onSave?  : () => void;
    formId?  : string;
}

export default function ApplicationSettingsForm({ form, setField, onSubmit, onCancel, onSave, formId = 'application-settings-form' }: Readonly<ApplicationSettingsFormProps>) {
    const { t } = useTranslation();

    const items = getApplicationSettingsMapper(form, setField, t);

    return (
        <form id={formId} onSubmit={onSubmit} noValidate>
            <div className={'flex flex-col gap-4'}>
                {items.map((section, idx) => (
                    <React.Fragment key={section.id} >
                        <div className="w-full flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-left font-medium text-primary text-lg md:text-xl">
                                {section.icon}
                                <h3 className="text-primary font-semibold">{section.title}</h3>
                            </div>

                            {section.content}

                        </div>

                        {idx < items.length - 1 && (
                            <hr className="border-main" />
                        )}
                    </React.Fragment>


                ))}

                <div className="flex justify-end gap-2 pt-2">
                    <ButtonComponent
                        type="button"
                        variant="main"
                        label={t('btnCancel')}
                        onClick={onCancel}
                    />
                    <ButtonComponent
                        type="button"
                        variant="confirmation"
                        label={t('btnSave')}
                        onClick={onSave}
                    />
                </div>
            </div>
        </form>
    );
}

