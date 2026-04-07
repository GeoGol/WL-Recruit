import { useMemo, useState } from 'react';
import { t } from 'i18next';
import { DepartmentFormState, RowTableData } from '@/models';
import { mapActions, mapColumns } from '@/helpers/TableDataHelper';
import { DEPARTMENTS_MOCK_DATA, DEPARTMENTS_columnDefs, DEPARTMENTS_actionDefs } from '@/demoData';
import { useModal, useActionModal } from '@/hooks/useModal';
import TableComponent from '@/components/TableComponent/TableComponent';
import ModalComponent from '@/components/ModalComponent/ModalComponent';
import DrawerComponent from '@/components/DrawerComponent/DrawerComponent';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import CreateDepartmentForm from '@/forms/settings/CreateDepartmentForm';
import { PAGE_SIZE_OPTIONS } from '@/constant/CONSTANTS';

export default function Departments() {
    const [departmentToEdit,   setDepartmentToEdit  ] = useState<RowTableData | null>(null);
    const [departmentToDelete, setDepartmentToDelete] = useState<RowTableData | null>(null);

    const columns      = mapColumns(DEPARTMENTS_columnDefs);
    const createDrawer = useModal();
    const editDrawer   = useModal();
    const modal        = useActionModal({
        toastMessages: {
            delete  : { type: 'success', message: t('msgActionSuccess') },
            confirm : { type: 'success', message: t('msgActionSuccess') },
        },
        onDelete: () => {
            console.log('Delete department:', departmentToDelete);
            setDepartmentToDelete(null);
        },
    });

    const actions = useMemo(() => mapActions(
        DEPARTMENTS_actionDefs.map(a => {
            if (a.label === 'Edit') return {
                ...a,
                onClick: (row: RowTableData) => { setDepartmentToEdit(row); editDrawer.open(); },
            };
            if (a.label === 'Delete') return {
                ...a,
                onClick: (row: RowTableData) => { setDepartmentToDelete(row); modal.openDelete(); },
            };
            return a;
        })
    ), [editDrawer, modal]);

    const handleCreate = (data: DepartmentFormState) => {
        console.log('Create department:', data);
        createDrawer.close();
    };

    const handleEdit = (data: DepartmentFormState) => {
        console.log('Update department:', data);
        editDrawer.close();
        setDepartmentToEdit(null);
    };

    const editInitialData: Partial<DepartmentFormState> | undefined = departmentToEdit
        ? { departmentName: String(departmentToEdit.departmentName ?? '') }
        : undefined;

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={DEPARTMENTS_MOCK_DATA}
                columns={columns}
                actions={actions}
                rowKey="id"
                title={t('lblManageDepartments')}
                toolbar={
                    <ButtonComponent
                        variant="confirmation"
                        label={t('lblCreateDepartment')}
                        onClick={createDrawer.open}
                    />
                }
                emptyMessage={t('msgNoDepartments')}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onAddNew={() => createDrawer.open()}
            />

            {/* Create drawer */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t('lblCreateDepartment')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('create-department-form')} />
                    </div>
                }
            >
                <CreateDepartmentForm type="create" onSubmit={handleCreate} formId="create-department-form" />
            </DrawerComponent>

            {/* Edit drawer */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={() => { editDrawer.close(); setDepartmentToEdit(null); }}
                title={t('lblEditDepartment')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={() => { editDrawer.close(); setDepartmentToEdit(null); }} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('edit-department-form')} />
                    </div>
                }
            >
                <CreateDepartmentForm
                    key={departmentToEdit ? String(departmentToEdit.id) : 'edit'}
                    type="edit"
                    onSubmit={handleEdit}
                    initialData={editInitialData}
                    formId="edit-department-form"
                />
            </DrawerComponent>

            {/* Single action modal */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t('msgConfirmDeleteDepartment', { name: String(departmentToDelete?.departmentName ?? '') })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>
        </div>
    );
}
