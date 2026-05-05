import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import InputComponent from '@/components/FormComponents/InputComponent';
import { InterviewKitFormState } from '@/models';

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: InterviewKitFormState = {
    interviewKitName: '',
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreateInterviewKitFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: InterviewKitFormState) => void;
    initialData? : Partial<InterviewKitFormState>;
    formId?      : string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreateInterviewKitForm = memo(function CreateInterviewKitForm({
    onSubmit,
    type: _type,
    initialData,
    formId = 'create-interview-kit-form',
}: Readonly<CreateInterviewKitFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<InterviewKitFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof InterviewKitFormState>(key: K, value: InterviewKitFormState[K]) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form id={formId} onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
                <InputComponent
                    label={t('lblName')}
                    value={form.interviewKitName}
                    onChange={e => setField('interviewKitName', e.target.value)}
                    required
                    fullWidth
                    autoFocus
                />
            </div>
        </form>
    );
});

CreateInterviewKitForm.displayName = 'CreateInterviewKitForm';
export default CreateInterviewKitForm;

