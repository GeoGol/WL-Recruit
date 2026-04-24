import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { QuestionFormState} from '@/models';
import SelectComponent from "@/components/FormComponents/SelectComponent";
import {INPUT_OPTIONS} from "@/demoData";
import InputComponent from "@/components/FormComponents/InputComponent";
import CheckboxComponent from "@/components/FormComponents/CheckboxComponent";

// ─── Props ────────────────────────────────────────────────────────────────────

const initialState: QuestionFormState = {
    questionId : 0,
    question : '',
    typeId : '',
    typeName : '',
    searchLabel : '',
    visibility : '',
    mandatory : false
};

interface CreateQuestionFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: QuestionFormState) => void;
    initialData? : Partial<QuestionFormState>;
    formId?      : string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreateQuestionForm = memo(function CreateQuestionForm({
    onSubmit,
    type: _type,
    initialData,
    formId = 'create-question-form',
}: Readonly<CreateQuestionFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<QuestionFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof QuestionFormState>(key: K, value: QuestionFormState[K]) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };


    return (
        <form id={formId} onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
                <SelectComponent
                    label={t('lblType')}
                    options={INPUT_OPTIONS}
                    value={form.typeId}
                    onChange={v => setField('typeId', String(v ?? ''))}
                    placeholder="Select type..."
                />
                <InputComponent
                    label={t('lblQuestionLabel')}
                    value={form.question}
                    onChange={e => setField('question', e.target.value)}
                    fullWidth
                    autoFocus
                />
                {form.typeId === 'multipleChoice/multiple' &&
                    <InputComponent
                        label = {t('lblAnswers')}
                        value = {form.answers}
                        onChange = {e => setField('answers', e.target.value)}
                        fullWidth
                        autoFocus
                    />
                }
                <InputComponent
                    label={t('lblSearchLabel')}
                    value={form.searchLabel}
                    onChange={e => setField('searchLabel', e.target.value)}
                    fullWidth
                    autoFocus
                />
                <InputComponent
                    label={t('lblVisibility')}
                    value={form.visibility}
                    onChange={e => setField('visibility', e.target.value)}
                    hint={t('msgQuestionVisibilityHelpText')}
                    fullWidth
                    autoFocus
                />
                <CheckboxComponent
                    name={'mandatory'}
                    label={t('lblQuestionIsMandatory')}
                    checked={form.mandatory}
                    wrapperClass="w-full"
                    onChange={(checked) => setField('mandatory', checked) }
                />
            </div>
        </form>
    );
});

CreateQuestionForm.displayName = 'CreateQuestionForm';
export default CreateQuestionForm;
