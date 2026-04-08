import {useMemo, useState, useRef, useCallback} from "react";
import {OrganizationFormState, RowTableData} from "@/models";
import {mapActions, mapColumns} from "@/helpers/TableDataHelper";
import {ORGANIZATIONS_actionDefs, ORGANIZATIONS_columnDefs, ORGANIZATIONS_HISTORY_MOCK_DATA} from "@/demoData";
import {useModal, useActionModal} from "@/hooks/useModal";
import TableComponent from "@/components/TableComponent/TableComponent";
import {t} from "i18next";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import {exportToExcel} from "@/helpers/ExportHelpers";
import {PAGE_SIZE_OPTIONS} from "@/constant/CONSTANTS";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";
import ModalComponent from "@/components/ModalComponent/ModalComponent";
import CreateOrganizationForm from "@/forms/settings/CreateOrganizationForm";
import useFetch from "@/hooks/useFetch";
import api from "@/api/api";

export default function Organizations() {
    const [selectedOrganization, setSelectedOrganization] = useState<RowTableData | null>(null);
    const [organizationToDelete, setOrganizationToDelete] = useState<RowTableData | null>(null);

    const createFormRef = useRef<OrganizationFormState | null>(null);
    const editFormRef   = useRef<OrganizationFormState | null>(null);

    const { request, toast } = useFetch();

    const columns      = useMemo(() => mapColumns(ORGANIZATIONS_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();

    // ── API actions ───────────────────────────────────────────────────────────

    const handleDelete = useCallback(async () => {
        if (!organizationToDelete) return;
        const res = await request(() =>
            api.delete(`/organizations/${organizationToDelete.id}`)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            setOrganizationToDelete(null);
        }
    }, [organizationToDelete, request, toast]);

    const handleCreate = useCallback(async () => {
        if (!createFormRef.current) return;
        const res = await request(() =>
            api.post('/organizations', createFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            createDrawer.close();
        }
    }, [createDrawer, request, toast]);

    const handleEdit = useCallback(async () => {
        if (!editFormRef.current || !selectedOrganization) return;
        const res = await request(() =>
            api.put(`/organizations/${selectedOrganization.id}`, editFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            editDrawer.close();
            setSelectedOrganization(null);
        }
    }, [editDrawer, request, selectedOrganization, toast]);

    // ── onConfirm must be async to trigger loading state in modal ─────────────
    const handleConfirm = useCallback(async () => {
        if (createDrawer.isOpen) return handleCreate();
        return handleEdit();
    }, [createDrawer.isOpen, handleCreate, handleEdit]);

    // ── Drawer close handlers (stable refs) ───────────────────────────────────
    const handleEditDrawerClose = useCallback(() => {
        editDrawer.close();
        setSelectedOrganization(null);
    }, [editDrawer]);

    // ── Modal ─────────────────────────────────────────────────────────────────
    const modal = useActionModal({
        toastMessages : {},
        onDelete      : handleDelete,
        onConfirm     : handleConfirm,
    });

    const actions = useMemo(() => mapActions(
        ORGANIZATIONS_actionDefs.map(a => {
            if (a.label === 'Edit') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedOrganization(row); editDrawer.open(); },
            };
            if (a.label === 'Delete') return {
                ...a,
                onClick: (row: RowTableData) => { setOrganizationToDelete(row); modal.openDelete(); },
            };
            return a;
        })
    ), [editDrawer, modal]);

    const handleCreateOrganization = useCallback((data: OrganizationFormState) => {
        createFormRef.current = data;
    }, []);

    const handleEditOrganization = useCallback((data: OrganizationFormState) => {
        editFormRef.current = data;
    }, []);

    const selectedOrganizationData: Partial<OrganizationFormState> | undefined = selectedOrganization
        ? (selectedOrganization as unknown as Partial<OrganizationFormState>)
        : undefined;

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={ORGANIZATIONS_HISTORY_MOCK_DATA}
                columns={columns}
                actions={actions}
                rowKey="id"
                title={t("lblManageOrganizations")}
                toolbar={
                    <div className="flex items-center max-xs:w-full max-xs:flex-wrap gap-2">
                        <ButtonComponent
                            variant="confirmation"
                            label={t("lblCreateOrganization")}
                            className="max-xs:w-full"
                            onClick={createDrawer.open}
                        />
                        <ButtonComponent
                            variant="outline"
                            label="Export all"
                            className="max-xs:w-full"
                            onClick={async () => exportToExcel(ORGANIZATIONS_HISTORY_MOCK_DATA, ORGANIZATIONS_columnDefs, "organizations")}
                        />
                    </div>
                }
                emptyMessage={t("msgNoRecordsFoundForCriteria")}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onAddNew={createDrawer.open}
            />

            {/* ── Create Drawer ─────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t("lblCreateOrganization")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t("btnCancel")} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")}   onClick={() => modal.openConfirm('create-organization-drawer-form')} />
                    </div>
                }
            >
                <CreateOrganizationForm onSubmit={handleCreateOrganization} type="create" formId="create-organization-drawer-form" />
            </DrawerComponent>

            {/* ── Edit Drawer ───────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={handleEditDrawerClose}
                title={t("mnoEditUserDetails")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t("btnCancel")} onClick={handleEditDrawerClose} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")}   onClick={() => modal.openConfirm('edit-organization-drawer-form')} />
                    </div>
                }
            >
                <CreateOrganizationForm
                    key={selectedOrganization ? String(selectedOrganization.id) : 'edit'}
                    onSubmit={handleEditOrganization}
                    type="edit"
                    initialData={selectedOrganizationData}
                    formId="edit-organization-drawer-form"
                />
            </DrawerComponent>

            {/* ── Action Modal ──────────────────────────────────────────────── */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t("msgConfirmDeleteOrganization", { name: String(organizationToDelete?.organizationName ?? '') })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t("msgConfirmAction")}</p>
                )}
            </ModalComponent>
        </div>
    );
}
