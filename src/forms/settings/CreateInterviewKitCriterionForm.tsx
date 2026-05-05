import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import InputComponent from '@/components/FormComponents/InputComponent';
import CheckboxComponent from '@/components/FormComponents/CheckboxComponent';
import { InterviewKitCriterionFormState } from '@/models';

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: InterviewKitCriterionFormState = {
    rank         : 1,
    criterionName: '',
    isMandatory  : false,
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreateInterviewKitCriterionFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: InterviewKitCriterionFormState) => void;
    initialData? : Partial<InterviewKitCriterionFormState>;
    formId?      : string;
    loading?     : boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreateInterviewKitCriterionForm = memo(function CreateInterviewKitCriterionForm({
    onSubmit,
    type: _type,
    initialData,
    formId  = 'create-interview-kit-criterion-form',
    loading = false,
}: Readonly<CreateInterviewKitCriterionFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<InterviewKitCriterionFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof InterviewKitCriterionFormState>(key: K, value: InterviewKitCriterionFormState[K]) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form id={formId} onSubmit={handleSubmit} noValidate>
            {loading ? (
                <div className="flex flex-col gap-5 animate-pulse">
                    <div className="h-6 w-32 rounded bg-light-gray" />
                    {new Array(3).fill(null).map((_, i) => (
                        <div key={i} className="inline-flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-light-gray" />
                            <div className="h-5 w-full bg-light-gray-focus rounded" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">

                    <InputComponent
                        label={t('lblQuestionLabel')}
                        value={form.criterionName}
                        onChange={e => setField('criterionName', e.target.value)}
                        required
                        fullWidth
                        autoFocus
                    />
                    <InputComponent
                        label={t('lblRank')}
                        value={String(form.rank)}
                        onChange={e => setField('rank', Math.max(1, Number(e.target.value) || 1))}
                        type="number"
                        fullWidth
                    />
                    <CheckboxComponent
                        name="isMandatory"
                        label={t('lblEvaluationCriterionIsMandatory')}
                        checked={form.isMandatory}
                        wrapperClass="w-full"
                        onChange={checked => setField('isMandatory', checked)}
                    />
                </div>
            )}
        </form>
    );
});

CreateInterviewKitCriterionForm.displayName = 'CreateInterviewKitCriterionForm';
export default CreateInterviewKitCriterionForm;

