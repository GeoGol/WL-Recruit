import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InputComponent from '@/components/FormComponents/InputComponent';
import SelectComponent from '@/components/FormComponents/SelectComponent';
import {APP_LANGUAGE_OPTIONS, USER_ROLE_OPTIONS, USER_STATUS} from '@/demoData';
import {CreateUserFormState} from "@/models";

// ─── Types ────────────────────────────────────────────────────────────────────

const initialState: CreateUserFormState = {
    firstName   : '',
    lastName    : '',
    email       : '',
    role        : '',
    status      : '',
    appLanguage : '',
};

interface CreateUserFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: CreateUserFormState) => void;
    onCancel?    : () => void;
    initialData? : Partial<CreateUserFormState>;
    formId?      : string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateUserForm({ onSubmit, type, initialData, formId = 'create-user-form' }: Readonly<CreateUserFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<CreateUserFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof CreateUserFormState>(key: K, value: CreateUserFormState[K]) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form id={formId} onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
                <InputComponent
                    label={t('lblFirstName')}
                    value={form.firstName}
                    onChange={e => setField('firstName', e.target.value)}
                    placeholder="John"
                    fullWidth
                />
                <InputComponent
                    label={t('lblLastName')}
                    value={form.lastName}
                    onChange={e => setField('lastName', e.target.value)}
                    placeholder="Doe"
                    fullWidth
                />
                <InputComponent
                    label={t('lblEmailAddress')}
                    type="email"
                    value={form.email}
                    onChange={e => setField('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    fullWidth
                />
                <SelectComponent
                    label={t('lblRole')}
                    options={USER_ROLE_OPTIONS}
                    value={form.role}
                    onChange={v => setField('role', String(v ?? ''))}
                    placeholder="Select role..."
                />
                {type === 'edit' && form.status &&
                    <SelectComponent
                        label = {t('lblStatus')}
                        options = {USER_STATUS}
                        value = {form.status}
                        onChange = {v => setField('status', String(v ?? ''))}
                        placeholder = "Select status..."
                    />
                }
                <SelectComponent
                    label={t('lblUiLanguage')}
                    options={APP_LANGUAGE_OPTIONS}
                    value={form.appLanguage}
                    onChange={v => setField('appLanguage', String(v ?? ''))}
                    placeholder="Select application language..."
                />

            </div>
        </form>
    );
}

