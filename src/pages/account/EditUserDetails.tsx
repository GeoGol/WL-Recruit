import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditUserFormState } from '@/models';
import EditUserDetailsForm from '@/forms/account/EditUserDetailsForm';
import { useActionModal } from '@/hooks/useModal';
import ModalComponent from '@/components/ModalComponent/ModalComponent';

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditUserDetails() {
    const { t } = useTranslation();

    const [form, setForm] = useState<EditUserFormState>({
        firstName             : 'Georgia',
        lastName              : 'Golegou',
        inactivityTimeout     : '15',
        recentAppsTimeframe   : '24',
        senderDisplayName     : '',
        senderEmail           : '',
        candidateSorting      : 'date_desc',
        appLanguage           : 'en',
        timezone              : 'UTC',
        simplifiedResumeView  : false,
        showDetailedJobHistory: false,
        skills                : '',
        tags                  : '',
        languages             : '',
        enable2FA             : false,
    });

    const setField = <K extends keyof EditUserFormState>(key: K, value: EditUserFormState[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const modal = useActionModal({
        toastMessages: {
            confirm: { type: 'success', message: t('msgActionSuccess') },
        },
        onConfirm: () => console.log('Settings saved:', form),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
    };

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="w-full flex flex-col gap-4 p-4 bg-surface rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold text-primary">
                {t('lblChangeUserDetails')}
            </h2>
            <EditUserDetailsForm
                form={form}
                setField={setField}
                onSubmit={handleSubmit}
                onCancel={() => console.log('cancelled')}
                onSave={() => modal.openConfirm('edit-user-details-form')}
            />

            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>
        </div>
    );
}
