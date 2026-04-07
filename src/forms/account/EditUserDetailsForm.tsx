import { useTranslation } from 'react-i18next';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { getEditUserDetailsMapper } from '@/helpers/EditUserDetailsHelper';
import { EditUserFormState } from '@/models';
import React from 'react';

interface EditUserDetailsFormProps {
    form      : EditUserFormState;
    setField  : <K extends keyof EditUserFormState>(key: K, value: EditUserFormState[K]) => void;
    onSubmit  : (e: React.FormEvent) => void;
    onCancel? : () => void;
    onSave?   : () => void;
    formId?   : string;
}

export default function EditUserDetailsForm({ form, setField, onSubmit, onCancel, onSave, formId = 'edit-user-details-form' }: Readonly<EditUserDetailsFormProps>) {
    const { t } = useTranslation();

    const userDetailsItems = getEditUserDetailsMapper(form, setField, t);

    return (
        <form id={formId} onSubmit={onSubmit} noValidate>
            <div className={'flex flex-col gap-4'}>
                {userDetailsItems.map((section, idx) => (
                    <React.Fragment key={section.id} >
                        <div key={section.id} className="w-full flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-left font-medium text-primary text-lg md:text-xl">
                                {section.icon}
                                <h3 className="text-primary font-semibold">{t(section.title)}</h3>
                            </div>

                            {section.content}

                        </div>

                        {idx < userDetailsItems.length - 1 && (
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

