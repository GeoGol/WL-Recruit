import { useTranslation } from 'react-i18next';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { getEditUserDetailsMapper } from '@/helpers/EditUserDetailsHelper';
import { EditUserFormState } from '@/models';

interface EditUserDetailsFormProps {
    form      : EditUserFormState;
    setField  : <K extends keyof EditUserFormState>(key: K, value: EditUserFormState[K]) => void;
    onSubmit  : (e: React.FormEvent) => void;
    onCancel? : () => void;
}

export default function EditUserDetailsForm({ form, setField, onSubmit, onCancel }: Readonly<EditUserDetailsFormProps>) {
    const { t } = useTranslation();

    const userDetailsItems = getEditUserDetailsMapper(form, setField, t);

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            {userDetailsItems.map((section, idx) => (
                <div key={section.id} className="w-full flex flex-col gap-5">
                    <div className="flex items-center gap-3 text-left font-medium text-primary text-lg md:text-xl">
                        {section.icon}
                        <h3 className="text-primary font-semibold">{t(section.title)}</h3>
                    </div>

                    {section.content}

                    {idx < userDetailsItems.length - 1 && (
                        <hr className="border-main" />
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

