import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccordionComponent from '@/components/AccordionComponent/AccordionComponent';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { getEditUserDetailsMapper } from '@/helpers/EditUserDetailsHelper';
import {EditUserFormState} from "@/models";

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

    const accordionItems = getEditUserDetailsMapper(form, setField, t);

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="w-full flex flex-col gap-4 p-4 bg-surface rounded-lg">

            <h2 className="text-xl md:text-2xl font-bold text-primary">
                {t('lblChangeUserDetails')}
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                <AccordionComponent
                    items={accordionItems}
                    multiple
                    defaultOpen={['personal', 'options', 'filterOptions', 'security']}
                />

                <div className="flex justify-end gap-2 pt-2">
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
