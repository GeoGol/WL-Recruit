import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditUserFormState } from '@/models';
import EditUserDetailsForm from '@/forms/account/EditUserDetailsForm';

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
            />
        </div>
    );
}
