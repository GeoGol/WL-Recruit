import {useEffect, useMemo, useState} from "react";
import {RowTableData, TemplateFormState} from "@/models";
import {mapActions, mapColumns} from "@/helpers/TableDataHelper";
import {TEMPLATES_actionDefs, TEMPLATES_columnDefs, TEMPLATES_MOCK_DATA} from "@/demoData";
import {useActionModal, useModal} from "@/hooks/useModal";
import {t} from "i18next";
import TableComponent from "@/components/TableComponent/TableComponent";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import {PAGE_SIZE_OPTIONS} from "@/constant/CONSTANTS";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";
import ModalComponent from "@/components/ModalComponent/ModalComponent";
import CreateTemplateForm from "@/forms/settings/CreateTemplateForm";

export default function Templates() {
    const [templateToEdit,   setTemplateToEdit  ] = useState<RowTableData | null>(null);
    const [templateToDelete, setTemplateToDelete] = useState<RowTableData | null>(null);

    // ── Mock initial load skeleton ────────────────────────────────────────────
    const [tableData,    setTableData   ] = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(true);

    useEffect(() => {
        setTableLoading(true);
        const id = setTimeout(() => {
            setTableData(TEMPLATES_MOCK_DATA);
            setTableLoading(false);
        }, 500);
        return () => clearTimeout(id);
    }, []);

    const columns      = useMemo(() => mapColumns(TEMPLATES_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();
    const modal        = useActionModal({
        toastMessages: {
            delete  : { type: 'success', message: t('msgActionSuccess') },
            confirm : { type: 'success', message: t('msgActionSuccess') },
        },
        onDelete: () => {
            console.log('Delete template:', templateToDelete);
            setTemplateToDelete(null);
        },
    });

    const actions = useMemo(() => mapActions(
        TEMPLATES_actionDefs.map(a => {
            if (a.label === 'Edit') return {
                ...a,
                onClick: (row: RowTableData) => { setTemplateToEdit(row); editDrawer.open(); },
            };
            if (a.label === 'Delete') return {
                ...a,
                onClick: (row: RowTableData) => { setTemplateToDelete(row); modal.openDelete(); },
            };
            return a;
        })
    ), [editDrawer, modal]);

    const handleCreate = (data: TemplateFormState) => {
        console.log('Create template:', data);
        createDrawer.close();
    };

    const handleEdit = (data: TemplateFormState) => {
        console.log('Update templpate:', data);
        editDrawer.close();
        setTemplateToEdit(null);
    };

    const editInitialData: Partial<TemplateFormState> | undefined = templateToEdit ?? undefined;

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={tableData}
                loading={tableLoading}
                columns={columns}
                actions={actions}
                rowKey="id"
                title={t('roleManageTemplates')}
                toolbar={
                    <ButtonComponent
                        variant="confirmation"
                        label={t('lblCreateTemplate')}
                        onClick={createDrawer.open}
                    />
                }
                emptyMessage={t('msgNoTemplates')}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onAddNew={() => createDrawer.open()}
            />

            {/* Create drawer */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t('lblCreateTemplate')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('create-template-form')} />
                    </div>
                }
            >
                <CreateTemplateForm type="create" onSubmit={handleCreate} formId="create-template-form" />
            </DrawerComponent>

            {/* Edit drawer */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={() => { editDrawer.close(); setTemplateToEdit(null); }}
                title={t('lblEditTemplate')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={() => { editDrawer.close(); setTemplateToEdit(null); }} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('edit-template-form')} />
                    </div>
                }
            >
                <CreateTemplateForm
                    key={templateToEdit ? String(templateToEdit.id) : 'edit'}
                    type="edit"
                    onSubmit={handleEdit}
                    initialData={editInitialData}
                    formId="edit-template-form"
                />
            </DrawerComponent>

            {/* Single action modal */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t('msgConfirmDeleteTemplate', { name: String(templateToDelete?.templateName ?? '') })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>

        </div>
    );
}
