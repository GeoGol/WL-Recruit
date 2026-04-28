import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {TemplateFormState} from '@/models';
import SelectComponent from "@/components/FormComponents/SelectComponent";
import {LANGUAGES_OPTIONS, TEMPLATE_INPUT_OPTIONS} from "@/demoData";
import InputComponent from "@/components/FormComponents/InputComponent";
import RichTextEditor from "@/components/FormComponents/RichTextEditor";

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: TemplateFormState = {
    templateId : 0,
    templateName : '',
    templateTypeId : '',
    templateType : '',
    templateLang : '',
    templateText : ''
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreateTemplateFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: TemplateFormState) => void;
    initialData? : Partial<TemplateFormState>;
    formId?      : string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreateTemplateForm = memo(function CreateTemplateForm({
    onSubmit,
    type: _type,
    initialData,
    formId = 'create-template-form',
}: Readonly<CreateTemplateFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<TemplateFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof TemplateFormState>(key: K, value: TemplateFormState[K]) =>
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
                    options={TEMPLATE_INPUT_OPTIONS}
                    value={form.templateTypeId}
                    onChange={v => setField('templateTypeId', String(v ?? ''))}
                    placeholder="Select type..."
                    required={true}
                />
                <SelectComponent
                    label={t('lblLanguage')}
                    options={LANGUAGES_OPTIONS}
                    value={form.templateLang}
                    onChange={v => setField('templateLang', String(v ?? ''))}
                    placeholder="Select language..."
                    required={true}
                />
                <InputComponent
                    label = {t('lblTemplateTitle')}
                    value = {form.templateName}
                    onChange = {e => setField('templateName', e.target.value)}
                    fullWidth
                    required={true}
                    autoFocus
                />
                <RichTextEditor
                    label = {t('lblTemplateText')}
                    value = {form.templateText}
                    onChange = {html => setField('templateText', html)}
                    placeholder=""
                    required={true}
                />
            </div>
        </form>
    );
});

CreateTemplateForm.displayName = 'CreateTemplateForm';
export default CreateTemplateForm;
