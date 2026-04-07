import TableComponent from "@/components/TableComponent/TableComponent";
import { USERS_MOCK_DATA, USERS_columnDefs, USERS_actionDefs } from "@/demoData";
import { t } from "i18next";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import { PAGE_SIZE_OPTIONS } from "@/constant/CONSTANTS";
import { mapColumns, mapActions } from "@/helpers/TableDataHelper";
import { exportToExcel } from "@/helpers/ExportHelpers";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";
import { useModal, useActionModal } from "@/hooks/useModal";
import CreateUserForm from "@/forms/settings/CreateUserForm";
import { useState, useMemo } from "react";
import {CreateUserFormState, RowTableData} from "@/models";
import ModalComponent from "@/components/ModalComponent/ModalComponent";

export default function Users() {
    const [selectedUser, setSelectedUser] = useState<RowTableData | null>(null);

    const columns      = useMemo(() => mapColumns(USERS_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();
    const modal        = useActionModal({
        toastMessages: {
            delete  : { type: 'success', message: t('msgActionSuccess') },
            confirm : { type: 'success', message: t('msgActionSuccess') },
        },
    });

    const actions = useMemo(() => mapActions(
        USERS_actionDefs.map(a => {
            if (a.label === 'Edit') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedUser(row); editDrawer.open(); },
            };
            return a;
        })
    ), [editDrawer]);

    const handleCreateUser = (data: CreateUserFormState) => {
        console.log('Create user:', data);
        createDrawer.close();
    };

    const handleEditUser = (data: CreateUserFormState) => {
        console.log('Update user:', data);
        editDrawer.close();
        setSelectedUser(null);
    };

    const selectedUserData: Partial<CreateUserFormState> | undefined = selectedUser ? {
        firstName: String(selectedUser.firstName ?? ''),
        lastName : String(selectedUser.lastName  ?? ''),
        email    : String(selectedUser.email     ?? ''),
        role     : String(selectedUser.role      ?? ''),
        status   : String(selectedUser.status    ?? ''),
    } : undefined;

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={USERS_MOCK_DATA}
                columns={columns}
                actions={actions}
                rowKey="id"
                title={t("lblManageUsers")}
                toolbar={
                    <div className="flex items-center max-xs:w-full max-xs:flex-wrap gap-2">
                        <ButtonComponent
                            variant="confirmation"
                            label={t("lblCreateUser")}
                            className="max-xs:w-full"
                            onClick={() => createDrawer.open()}
                        />
                        <ButtonComponent
                            variant="outline"
                            label="Export all"
                            className="max-xs:w-full"
                            onClick={() => exportToExcel(USERS_MOCK_DATA, USERS_columnDefs, "users")}
                        />
                    </div>
                }
                emptyMessage={t("msgNoRecordsFoundForCriteria")}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
            />

            {/* ── Create Drawer ───────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t("lblCreateUser")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t("btnCancel")} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")}   onClick={() => modal.openConfirm('create-user-drawer-form')} />
                    </div>
                }
            >
                <CreateUserForm onSubmit={handleCreateUser} type="create" formId="create-user-drawer-form" />
            </DrawerComponent>

            {/* ── Edit Drawer ─────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={editDrawer.close}
                title={t("mnoEditUserDetails")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t("btnCancel")} onClick={editDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")}   onClick={() => modal.openConfirm('edit-user-drawer-form')} />
                    </div>
                }
            >
                <CreateUserForm onSubmit={handleEditUser} type="edit" initialData={selectedUserData} formId="edit-user-drawer-form" />
            </DrawerComponent>

            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t("msgConfirmAction")}</p>
                )}
            </ModalComponent>
        </div>
    );
}
