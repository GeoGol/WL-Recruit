import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import api from "@/api/api";
import {RoleFormState, RowTableData, SortDirection} from "@/models";
import useFetch from "@/hooks/useFetch";
import {
    ROLES_actionDefs,
    ROLES_columnDefs,
    ROLES_MOCK_DATA
} from "@/demoData";
import {mapActions, mapColumns} from "@/helpers/TableDataHelper";
import {useActionModal, useModal} from "@/hooks/useModal";
import TableComponent from "@/components/TableComponent/TableComponent";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import {PAGE_SIZE_OPTIONS} from "@/constant/CONSTANTS";
import {useTranslation} from "react-i18next";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";
import CreateRoleForm from "@/forms/settings/CreateRoleForm";
import ModalComponent from "@/components/ModalComponent/ModalComponent";


// ─── Fallback (used when API returns no data) ─────────────────────────────────
export const ROLE_FALLBACK_STATE: RoleFormState = {
    roleName: '',
    rights: [
        { id: "ALL_CANDIDATES",                  label: "roleAllCandidates",               enabled: false },
        { id: "ALL_JOBS",                        label: "roleAllJobs",                     enabled: true  },
        { id: "APP_SETTINGS",                    label: "roleAppSettings",                 enabled: true  },
        { id: "BULK_DELETE_APPLICATIONS",        label: "roleBulkDeleteApplications",      enabled: false },
        { id: "CREATE_JOB",                      label: "roleCreateJob",                   enabled: false },
        { id: "DELETE_ANSWERED_VIDEO_INTERVIEW", label: "roleDeleteAnsweredVideoInterview",enabled: false },
        { id: "DELETE_APPLICATION",              label: "roleDeleteApplication",           enabled: false },
        { id: "DOWNLOAD_RESUME",                 label: "roleDownloadResume",              enabled: false },
        { id: "EDIT_JOB",                        label: "roleEditJob",                     enabled: false },
        { id: "EMAIL_CANDIDATE",                 label: "roleEmailCandidate",              enabled: true  },
        { id: "EXPORT_DATA",                     label: "roleExportData",                  enabled: false },
        { id: "MANAGE_CONSENTS",                 label: "roleManageConsents",              enabled: false },
        { id: "MANAGE_EVALUATION_FORMS",         label: "roleManageEvaluationForms",       enabled: false },
        { id: "MANAGE_INTEGRATIONS",             label: "roleManageIntegrations",          enabled: true  },
        { id: "MANAGE_ORGS",                     label: "roleManageOrganizations",         enabled: false },
        { id: "MANAGE_PIPELINE_STAGES",          label: "roleManagePipelineStages",        enabled: false },
        { id: "MANAGE_PROJECTS",                 label: "roleManageProjects",              enabled: false },
        { id: "MANAGE_QUESTIONS",                label: "roleManageQuestions",             enabled: false },
        { id: "MANAGE_ROLES",                    label: "roleManageRoles",                 enabled: false },
        { id: "MANAGE_TEMPLATES",                label: "roleManageTemplates",             enabled: true  },
        { id: "MANAGE_USERS",                    label: "roleManageUsers",                 enabled: false },
        { id: "MANAGE_VIDEO_INTERVIEWS",         label: "roleManageVideoInterviews",       enabled: false },
    ],
    pipelinesStages: {
        "default": [
            { psId: 1385, psSetId: 0, pssName: "default", psName: "Screening", psRank: 1, enabled: true },
            { psId: 1386, psSetId: 0, pssName: "default", psName: "Phone", psRank: 2, enabled: false },
            { psId: 1387, psSetId: 0, pssName: "default", psName: "Interview", psRank: 3, enabled: false },
            { psId: 1388, psSetId: 0, pssName: "default", psName: "Offer", psRank: 4, enabled: true },
            { psId: 1389, psSetId: 0, pssName: "default", psName: "Hired", psRank: 5, enabled: false },
            { psId: 2410, psSetId: 0, pssName: "default", psName: "Rejection", psRank: 6, enabled: false },
        ],
        "Second hiring pipeline": [
            { psId: 1395, psSetId: 1043, pssName: "Second hiring pipeline", psName: "Stage 1", psRank: 1, enabled: false },
            { psId: 1396, psSetId: 1043, pssName: "Second hiring pipeline", psName: "Stage 2", psRank: 2, enabled: true },
            { psId: 1397, psSetId: 1043, pssName: "Second hiring pipeline", psName: "Hire stage", psRank: 3, enabled: false },
        ],
    }
};

// ─── Helper: validate API response is a real RoleFormState ───────────────────
function isValidRoleFormState(data: unknown): data is RoleFormState {
    return !!data && Array.isArray((data as RoleFormState).rights);
}

export default function Roles() {
    const { t } = useTranslation();

    const [selectedRole, setSelectedRole]     = useState<RowTableData | null>(null);
    const [roleToDelete, setRoleToDelete]     = useState<RowTableData | null>(null);

    // ── Form data fetched for drawers ─────────────────────────────────────────
    const [createFormData, setCreateFormData] = useState<RoleFormState | undefined>(undefined);
    const [editFormData,   setEditFormData  ] = useState<RoleFormState | undefined>(undefined);
    const [createLoading,  setCreateLoading ] = useState(false);
    const [editLoading,    setEditLoading   ] = useState(false);

    const createFormRef = useRef<RoleFormState | null>(null);
    const editFormRef   = useRef<RoleFormState | null>(null);

    const { request, toast } = useFetch();

    // Demo server-side pagination + sort state (replace with real list endpoint response)
    const [page, setPage]         = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortKey, setSortKey]   = useState<string | null>(null);
    const [sortDir, setSortDir]   = useState<SortDirection>(null);
    const [tableData, setTableData]     = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(false);

    useEffect(() => {
        setTableLoading(true);
        const timeoutId = setTimeout(() => { // ← increase/decrease to control skeleton duration
            let rows = [...ROLES_MOCK_DATA];
            if (sortKey && sortDir) {
                rows.sort((a, b) => {
                    const aVal = String(a[sortKey] ?? '');
                    const bVal = String(b[sortKey] ?? '');
                    const cmp  = aVal.localeCompare(bVal, undefined, { numeric: true, sensitivity: 'base' });
                    return sortDir === 'asc' ? cmp : -cmp;
                });
            }
            const start = (page - 1) * pageSize;
            setTableData(rows.slice(start, start + pageSize));
            setTableLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [page, pageSize, sortKey, sortDir]);

    const handleSortChange = useCallback((key: string | null, dir: SortDirection) => {
        setSortKey(key);
        setSortDir(dir);
    }, []);

    const columns      = useMemo(() => mapColumns(ROLES_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();

    // ── Fetch defaults when Create drawer opens ───────────────────────────────
    useEffect(() => {
        if (!createDrawer.isOpen) {
            setCreateFormData(undefined);
            return;
        }
        let cancelled = false;
        setCreateLoading(true);
        api.get<RoleFormState>('/roles/defaults')
            .then(res => {
                if (cancelled) return;
                setCreateFormData(isValidRoleFormState(res.data) ? res.data : ROLE_FALLBACK_STATE);
            })
            .catch(() => { if (!cancelled) setCreateFormData(ROLE_FALLBACK_STATE); })
            .finally(() => { if (!cancelled) setCreateLoading(false); });
        return () => { cancelled = true; };
    }, [createDrawer.isOpen]);

    // ── Fetch role data when Edit drawer opens ────────────────────────────────
    useEffect(() => {
        if (!editDrawer.isOpen || !selectedRole) {
            setEditFormData(undefined);
            return;
        }
        let cancelled = false;
        setEditLoading(true);
        api.get<RoleFormState>(`/roles/${selectedRole.id}`)
            .then(res => {
                if (cancelled) return;
                setEditFormData(isValidRoleFormState(res.data) ? res.data : ROLE_FALLBACK_STATE);
            })
            .catch(() => { if (!cancelled) setEditFormData(ROLE_FALLBACK_STATE); })
            .finally(() => { if (!cancelled) setEditLoading(false); });
        return () => { cancelled = true; };
    }, [editDrawer.isOpen, selectedRole]);

    // ── API actions ───────────────────────────────────────────────────────────

    const handleDelete = useCallback(async () => {
        if (!roleToDelete) return;
        const res = await request(() =>
            api.delete(`/roles/${roleToDelete.id}`)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            setRoleToDelete(null);
        }
    }, [roleToDelete, request, toast]);

    const handleCreate = useCallback(async () => {
        if (!createFormRef.current) return;
        const res = await request(() =>
            api.post('/roles', createFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            createDrawer.close();
        }
    }, [createDrawer, request, toast]);

    const handleEdit = useCallback(async () => {
        if (!editFormRef.current || !selectedRole) return;
        const res = await request(() =>
            api.put(`/role/${selectedRole.id}`, editFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            editDrawer.close();
            setSelectedRole(null);
        }
    }, [editDrawer, request, selectedRole, toast]);

    // ── onConfirm must be async to trigger loading state in modal ─────────────
    const handleConfirm = useCallback(async () => {
        if (createDrawer.isOpen) return handleCreate();
        return handleEdit();
    }, [createDrawer.isOpen, handleCreate, handleEdit]);

    // ── Drawer close handlers (stable refs) ───────────────────────────────────
    const handleEditDrawerClose = useCallback(() => {
        editDrawer.close();
        setSelectedRole(null);
    }, [editDrawer]);

    // ── Modal ─────────────────────────────────────────────────────────────────
    const modal = useActionModal({
        toastMessages : {},
        onDelete      : handleDelete,
        onConfirm     : handleConfirm,
    });

    const actions = useMemo(() => mapActions(
        ROLES_actionDefs.map(a => {
            if (a.label === 'Edit') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedRole(row); editDrawer.open(); },
            };
            if (a.label === 'Delete') return {
                ...a,
                onClick: (row: RowTableData) => { setRoleToDelete(row); modal.openDelete(); },
            };
            return a;
        })
    ), [editDrawer, modal]);

    const handleCreateRole = useCallback((data: RoleFormState) => {
        createFormRef.current = data;
        console.log('[CreateRole] form data:', data);
    }, []);

    const handleEditRole = useCallback((data: RoleFormState) => {
        editFormRef.current = data;
        console.log('[EditRole] form data:', data);
    }, []);


    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={tableData}
                columns={columns}
                actions={actions}
                rowKey="id"
                loading={tableLoading}
                title={t("lblManageRoles")}
                toolbar={
                    <div className="flex items-center max-xs:w-full max-xs:flex-wrap gap-2">
                        <ButtonComponent
                            variant="confirmation"
                            label={t("lblCreateRole")}
                            className="max-xs:w-full"
                            onClick={createDrawer.open}
                        />
                    </div>
                }
                emptyMessage={t("msgNoRecordsFoundForCriteria")}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onAddNew={createDrawer.open}
                paginationMode="server"
                serverPagination={{
                    page,
                    pageSize,
                    total: ROLES_MOCK_DATA.length,
                    onPageChange: setPage,
                    onPageSizeChange: (size) => {
                        setPage(1);
                        setPageSize(size);
                    },
                    sortKey,
                    sortDir,
                    onSortChange: handleSortChange,
                }}
            />

            {/* ── Create Drawer ─────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t("lblCreateRole")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t("btnCancel")} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")}   onClick={() => modal.openConfirm('create-role-drawer-form')} />
                    </div>
                }
            >
                <CreateRoleForm
                    onSubmit={handleCreateRole}
                    type="create"
                    formId="create-role-drawer-form"
                    initialData={createFormData}
                    loading={createLoading}
                />
            </DrawerComponent>

            {/* ── Edit Drawer ───────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={handleEditDrawerClose}
                title={t("lblEditRole")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t("btnCancel")} onClick={handleEditDrawerClose} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")}   onClick={() => modal.openConfirm('edit-role-drawer-form')} />
                    </div>
                }
            >
                <CreateRoleForm
                    key={selectedRole ? String(selectedRole.id) : 'edit'}
                    onSubmit={handleEditRole}
                    type="edit"
                    formId="edit-role-drawer-form"
                    initialData={editFormData}
                    loading={editLoading}
                />
            </DrawerComponent>

            {/* ── Action Modal ──────────────────────────────────────────────── */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t("msgConfirmDeleteRole", { name: String(roleToDelete?.roleName ?? '') })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t("msgConfirmAction")}</p>
                )}
            </ModalComponent>

        </div>
    );
}
