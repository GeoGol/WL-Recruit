import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import InputComponent from '@/components/FormComponents/InputComponent';
import {PipelineStageSetsFormState} from '@/models';

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: PipelineStageSetsFormState = {
    pipelineStageSetName: '',
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreatePipelineStageSetFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: PipelineStageSetsFormState) => void;
    initialData? : Partial<PipelineStageSetsFormState>;
    formId?      : string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreatePipelineStagesSetForm = memo(function CreatePipelineStagesSetForm({
    onSubmit,
    type: _type,
    initialData,
    formId = 'create-pipeline-stage-set-form',
}: Readonly<CreatePipelineStageSetFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<PipelineStageSetsFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof PipelineStageSetsFormState>(key: K, value: PipelineStageSetsFormState[K]) =>
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
                    value={form.pipelineStageSetName}
                    onChange={e => setField('pipelineStageSetName', e.target.value)}
                    required
                    fullWidth
                    autoFocus
                />
            </div>
        </form>
    );
});

CreatePipelineStagesSetForm.displayName = 'CreatePipelineStagesSetForm';
export default CreatePipelineStagesSetForm;
