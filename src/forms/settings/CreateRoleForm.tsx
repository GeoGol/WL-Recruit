import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RoleFormState } from '@/models';
import InputComponent from '@/components/FormComponents/InputComponent';
import CheckboxComponent from '@/components/FormComponents/CheckboxComponent';


// ─── Props ────────────────────────────────────────────────────────────────────

interface CreateRoleFormProps {
    type         : 'create' | 'edit';
    onSubmit     : (data: RoleFormState) => void;
    formId?      : string;
    /** Data fetched by the parent */
    initialData ?: RoleFormState;
    /** Show skeleton while the parent is fetching */
    loading?     : boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CreateRoleForm = memo(function CreateRoleForm({
    onSubmit,
    type: _type,
    formId      = 'create-role-form',
    initialData,
    loading     = false,
}: Readonly<CreateRoleFormProps>) {
    const { t } = useTranslation();

    const [form, setForm] = useState<RoleFormState | undefined>(initialData);

    // Sync when parent provides new data (drawer re-opened with different role)
    useEffect(() => {
        setForm(initialData);
    }, [initialData]);

    // ─── Helpers ──────────────────────────────────────────────────────────────

    const setField = <K extends keyof RoleFormState>(key: K, value: RoleFormState[K]) =>
        setForm(prev => prev ? { ...prev, [key]: value } : prev);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form) onSubmit(form);
    };

    const toggleRight = (id: string, checked: boolean) =>
        setField('rights', (form?.rights ?? []).map(r => r.id === id ? { ...r, enabled: checked } : r));

    const toggleStage = (setName: string, psId: number, checked: boolean) =>
        setField('pipelinesStages', {
            ...form?.pipelinesStages,
            [setName]: (form?.pipelinesStages[setName] ?? []).map(s =>
                s.psId === psId ? { ...s, enabled: checked } : s
            ),
        });

    // ─── Render ───────────────────────────────────────────────────────────────

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
                <div className="flex flex-col gap-5">

                    {/* ── Role Name ──────────────────────────────────────────── */}
                    <InputComponent
                        name="roleName"
                        label={t('lblRoleName')}
                        value={form.roleName}
                        fullWidth
                        onChange={(e) => setField('roleName', e.target.value)}
                        required
                    />

                    <hr className="border-main" />

                    {/* ── Rights ─────────────────────────────────────────────── */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-primary text-lg">{t('lblRoleRights')}</h3>
                        <div className="flex flex-wrap gap-3">
                            {(form.rights ?? []).map(right => (
                                <CheckboxComponent
                                    key={right.id}
                                    name={right.id}
                                    label={t(right.label)}
                                    checked={_type === 'create' ? false : right.enabled}
                                    wrapperClass="w-full"
                                    onChange={(checked) => toggleRight(right.id, checked)}
                                />
                            ))}
                        </div>
                    </div>

                    <hr className="border-main" />

                    {/* ── Pipeline Stages ────────────────────────────────────── */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-primary text-lg">{t('lblPipelineStages')}</h3>
                        {Object.entries(form.pipelinesStages ?? {}).map(([setName, stages]) => (
                            <div key={setName} className="flex flex-col gap-3">
                                <h4 className="text-md text-primary font-bold max-w-max border-b-2 border-secondary">{setName}</h4>
                                <div className="flex flex-wrap gap-3">
                                    {stages.map(stage => (
                                        <CheckboxComponent
                                            key={stage.psId}
                                            name={String(stage.psId)}
                                            label={stage.psName}
                                            checked={_type === 'create' ? false : stage.enabled}
                                            wrapperClass="w-full"
                                            onChange={(checked) => toggleStage(setName, stage.psId, checked)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </form>
    );
});

CreateRoleForm.displayName = 'CreateRoleForm';
export default CreateRoleForm;
