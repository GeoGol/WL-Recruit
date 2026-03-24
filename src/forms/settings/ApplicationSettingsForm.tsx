import { useTranslation } from 'react-i18next';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { getApplicationSettingsMapper } from '@/helpers/ApplicationSettingsHelper';
import { ApplicationSettingsFormState } from '@/models';

interface ApplicationSettingsFormProps {
    form     : ApplicationSettingsFormState;
    setField : <K extends keyof ApplicationSettingsFormState>(key: K, value: ApplicationSettingsFormState[K]) => void;
    onSubmit : (e: React.FormEvent) => void;
    onCancel?: () => void;
}

export default function ApplicationSettingsForm({ form, setField, onSubmit, onCancel }: Readonly<ApplicationSettingsFormProps>) {
    const { t } = useTranslation();

    const items = getApplicationSettingsMapper(form, setField, t);

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            {items.map((section, idx) => (
                <div key={section.id}>
                    <div className="flex items-center gap-2 mb-4">
                        {section.icon && <span className="text-secondary">{section.icon}</span>}
                        <h3 className="text-base font-semibold text-primary">{section.title}</h3>
                    </div>

                    {section.content}

                    {idx < items.length - 1 && (
                        <hr className="mt-6 border-main" />
                    )}
                </div>
            ))}

            <div className="flex justify-end gap-2 pt-2">
                <ButtonComponent
                    type="button"
                    variant="main"
                    label={t('btnCancel') || 'Cancel'}
                    onClick={onCancel}
                />
                <ButtonComponent
                    type="submit"
                    variant="confirmation"
                    label={t('btnSave') || 'Save changes'}
                />
            </div>
        </form>
    );
}

