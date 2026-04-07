import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationSettingsFormState } from '@/models';
import ApplicationSettingsForm from '@/forms/settings/ApplicationSettingsForm';
import { useActionModal } from '@/hooks/useModal';
import ModalComponent from '@/components/ModalComponent/ModalComponent';

export default function ApplicationSettings() {
    const { t } = useTranslation();

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

    const setField = useCallback(<K extends keyof ApplicationSettingsFormState>(key: K, value: ApplicationSettingsFormState[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
    }, []);

    const modal = useActionModal({
        toastMessages: {
            confirm: { type: 'success', message: t('msgActionSuccess') },
        },
        onConfirm: () => console.log('Settings saved:', form),
    });

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
    }, [form]);

    const handleCancel = useCallback(() => {
        console.log('cancelled');
    }, []);

    const handleSave = useCallback(() => {
        modal.openConfirm('application-settings-form');
    }, [modal]);

    return (
        <div className="w-full flex flex-col gap-4 p-4 bg-surface rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold text-primary">
                {t('lblApplicationSettings')}
            </h2>
            <ApplicationSettingsForm
                form={form}
                setField={setField}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                onSave={handleSave}
            />

            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>
        </div>
    );
}
