import {useMemo, useState} from "react";
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

export default function Organizations() {
    const [selectedOrganization, setSelectedOrganization] = useState<RowTableData | null>(null);
    const [organizationToDelete, setOrganizationToDelete] = useState<RowTableData | null>(null);

    const columns      = mapColumns(ORGANIZATIONS_columnDefs);
    const createDrawer = useModal();
    const editDrawer   = useModal();

    const modal  = useActionModal({
        toastMessages: {
            warning : { type: 'warning', message: t('msgActionWarning') },
            delete  : { type: 'error',   message: t('msgActionError') },
            confirm : { type: 'success', message: t('msgActionSuccess') },
        },
        onDelete: () => {
            console.log('Delete organization:', organizationToDelete);
            setOrganizationToDelete(null);
        },
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

    const handleCreateOrganization = (data: any) => {
        console.log('Create user:', data);
        createDrawer.close();
    };

    const handleEditOrganization = (data: any) => {
        console.log('Update user:', data);
        editDrawer.close();
        setSelectedOrganization(null);
    };

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
                            onClick={() => createDrawer.open()}
                        />
                        <ButtonComponent
                            variant="outline"
                            label="Export all"
                            className="max-xs:w-full"
                            onClick={() => exportToExcel(ORGANIZATIONS_HISTORY_MOCK_DATA, ORGANIZATIONS_columnDefs, "organizations")}
                        />
                    </div>
                }
                emptyMessage={t("msgNoRecordsFoundForCriteria")}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onAddNew={() => createDrawer.open()}
            />

            {/* Create drawer */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t("lblCreateOrganization")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main" label={t("btnCancel")} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")} onClick={() => modal.openConfirm('create-user-drawer-form')} />
                    </div>
                }
            >
                <CreateOrganizationForm onSubmit={handleCreateOrganization} type="create" formId="create-user-drawer-form" />
            </DrawerComponent>

            {/* Edit drawer */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={() => { editDrawer.close(); setSelectedOrganization(null); }}
                title={t("mnoEditUserDetails")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main" label={t("btnCancel")} onClick={() => { editDrawer.close(); setSelectedOrganization(null); }} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")} onClick={() => modal.openConfirm('edit-organization-drawer-form')} />
                    </div>
                }
            >
                <CreateOrganizationForm key={selectedOrganization ? String(selectedOrganization.id) : 'edit'} onSubmit={handleEditOrganization} type="edit" initialData={selectedOrganizationData} formId="edit-organization-drawer-form" />
            </DrawerComponent>

            {/* Single action modal */}
            <ModalComponent {...modal.modalProps} title={"Delete - custom title"} size="md">
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
