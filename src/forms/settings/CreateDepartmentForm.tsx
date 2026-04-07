import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import InputComponent from '@/components/FormComponents/InputComponent';
import { DepartmentFormState } from '@/models';

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: DepartmentFormState = {
    departmentName: '',
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreateDepartmentFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: DepartmentFormState) => void;
    initialData? : Partial<DepartmentFormState>;
    formId?      : string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreateDepartmentForm = memo(function CreateDepartmentForm({
    onSubmit,
    type: _type,
    initialData,
    formId = 'create-department-form',
}: Readonly<CreateDepartmentFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<DepartmentFormState>({ ...initialState, ...initialData });

    useEffect(() => {
        setForm({ ...initialState, ...initialData });
    }, [initialData]);

    const setField = <K extends keyof DepartmentFormState>(key: K, value: DepartmentFormState[K]) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form id={formId} onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
                <InputComponent
                    label={t('lblDepartmentName')}
                    value={form.departmentName}
                    onChange={e => setField('departmentName', e.target.value)}
                    required
                    fullWidth
                    autoFocus
                />
            </div>
        </form>
    );
});

CreateDepartmentForm.displayName = 'CreateDepartmentForm';
export default CreateDepartmentForm;
