import TableComponent from "@/components/TableComponent/TableComponent";
import { USERS_MOCK_DATA, USERS_columnDefs, USERS_actionDefs } from "@/demoData";
import { t } from "i18next";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import { PAGE_SIZE_OPTIONS } from "@/constant/CONSTANTS";
import { mapColumns, mapActions } from "@/helpers/TableDataHelper";
import { exportToExcel } from "@/helpers/ExportHelpers";
import ModalComponent from "@/components/ModalComponent/ModalComponent";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";
import { useModal } from "@/hooks/useModal";
import CreateUserForm, { CreateUserFormState } from "@/forms/settings/CreateUserForm";
import { useState, useMemo } from "react";
import { RowTableData } from "@/models";

export default function Users() {
    const [selectedUser, setSelectedUser] = useState<RowTableData | null>(null);

    const columns      = mapColumns(USERS_columnDefs);
    const createModal  = useModal();
    const createDrawer = useModal();
    const editModal    = useModal();
    const editDrawer   = useModal();

    const actions = useMemo(() => mapActions(
        USERS_actionDefs.map(a => {
            if (a.label === 'Edit modal') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedUser(row); editModal.open(); },
            };
            if (a.label === 'Edit drawer') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedUser(row); editDrawer.open(); },
            };
            return a;
        })
    ), [editModal, editDrawer]);

    const handleCreateUser = (data: CreateUserFormState) => {
        console.log('Create user:', data);
        createModal.close();
        createDrawer.close();
    };

    const handleEditUser = (data: CreateUserFormState) => {
        console.log('Update user:', data);
        editModal.close();
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
                            label={t("lblCreateUser") + ' Drawer'}
                            className="max-xs:w-full"
                            onClick={() => createDrawer.open()}
                        />
                        <ButtonComponent
                            variant="confirmation"
                            label={t("lblCreateUser") + ' Modal'}
                            className="max-xs:w-full"
                            onClick={() => createModal.open()}
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

            {/* ── Create Modal ────────────────────────────────────────────── */}
            <ModalComponent
                isOpen={createModal.isOpen}
                onClose={createModal.close}
                title={t("lblCreateUser")}
                size="md"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"          label={t("btnCancel")} onClick={createModal.close} />
                        <ButtonComponent type="submit" form="create-user-modal-form" variant="confirmation" label={t("btnSave")} />
                    </div>
                }
            >
                <CreateUserForm onSubmit={handleCreateUser} type="create" formId="create-user-modal-form" />
            </ModalComponent>

            {/* ── Create Drawer ───────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t("lblCreateUser")}
                placement="right"
                size="lg"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"          label={t("btnCancel")} onClick={createDrawer.close} />
                        <ButtonComponent type="submit" form="create-user-drawer-form" variant="confirmation" label={t("btnSave")} />
                    </div>
                }
            >
                <CreateUserForm onSubmit={handleCreateUser} type="create" formId="create-user-drawer-form" />
            </DrawerComponent>

            {/* ── Edit Modal ──────────────────────────────────────────────── */}
            <ModalComponent
                isOpen={editModal.isOpen}
                onClose={editModal.close}
                title={t("mnoEditUserDetails")}
                size="md"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"          label={t("btnCancel")} onClick={editModal.close} />
                        <ButtonComponent type="submit" form="edit-user-modal-form" variant="confirmation" label={t("btnSave")} />
                    </div>
                }
            >
                <CreateUserForm onSubmit={handleEditUser} type="edit" initialData={selectedUserData} formId="edit-user-modal-form" />
            </ModalComponent>

            {/* ── Edit Drawer ─────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={editDrawer.close}
                title={t("mnoEditUserDetails")}
                placement="right"
                size="lg"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"          label={t("btnCancel")} onClick={editDrawer.close} />
                        <ButtonComponent type="submit" form="edit-user-drawer-form" variant="confirmation" label={t("btnSave")} />
                    </div>
                }
            >
                <CreateUserForm onSubmit={handleEditUser} type="edit" initialData={selectedUserData} formId="edit-user-drawer-form" />
            </DrawerComponent>
        </div>
    );
}
