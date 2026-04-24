import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import InputComponent from '@/components/FormComponents/InputComponent';
import { PipelineStageItemFormState } from '@/models';
import SelectComponent from "@/components/FormComponents/SelectComponent";
import {DEFAULT_MAIL_OPTIONS, PIPELINE_STAGES_TYPE_OPTIONS} from "@/demoData";

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: PipelineStageItemFormState = {
    rank       : 0,
    stageName  : '',
    stageType  : '',
    stageTypeId: 0,
    defaultMail: 0,
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreatePipelineStageFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: PipelineStageItemFormState) => void;
    initialData? : Partial<PipelineStageItemFormState>;
    formId?      : string;
    loading?     : boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreatePipelineStageForm = memo(function CreatePipelineStageForm({
    onSubmit,
    type: _type,
    initialData,
    formId = 'create-pipeline-stage-form',
    loading = false,
}: Readonly<CreatePipelineStageFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<PipelineStageItemFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof PipelineStageItemFormState>(key: K, value: PipelineStageItemFormState[K]) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form id={formId} onSubmit={handleSubmit} noValidate>
            {loading || !form ? (
                <div className="flex flex-col gap-5 animate-pulse">
                    <div className="h-6 w-32 rounded bg-light-gray" />
                    {new Array(8).fill(null).map((_, i) => (
                        <div key={i} className="inline-flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-light-gray" />
                            <div className="h-5 w-full bg-light-gray-focus rounded" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <InputComponent
                        label={t('lblName')}
                        value={form.stageName}
                        onChange={e => setField('stageName', e.target.value)}
                        required
                        fullWidth
                        autoFocus
                    />
                    <SelectComponent
                        label={t('lblType')}
                        options={PIPELINE_STAGES_TYPE_OPTIONS}
                        value={form.stageType}
                        onChange={v => setField('stageType', String(v ?? ''))}
                        placeholder="Select stage type..."
                    />
                    <SelectComponent
                        label={t('lblEmailTemplate')}
                        options={DEFAULT_MAIL_OPTIONS}
                        value={form.defaultMail}
                        onChange={v => setField('defaultMail', Number(v ?? 0))}
                        placeholder={t('lblSelectEmailTemplate')}
                    />
                </div>
            )}
        </form>
    );
});

CreatePipelineStageForm.displayName = 'CreatePipelineStageForm';
export default CreatePipelineStageForm;
