import { useTranslation } from 'react-i18next';
import { useSearchParams, useLocation } from 'react-router-dom';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    PipelineStageFormState, PipelineStageItemFormState,
    RowTableData,
} from '@/models';
import {
    PIPELINE_STAGES_columnDefs,
    PIPELINE_STAGES_MOCK_DATA,
    PIPELINE_STAGE_FALLBACK_STATE,
    PIPELINE_STAGE_MOCK_BY_SET_ID,
    PIPELINES_STAGES_actionDefs
} from '@/demoData';
import {mapActions, mapColumns} from '@/helpers/TableDataHelper';
import TableComponent from '@/components/TableComponent/TableComponent';
import useFetch from "@/hooks/useFetch";
import {useActionModal, useModal} from "@/hooks/useModal";
import api from "@/api/api";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";
import ModalComponent from "@/components/ModalComponent/ModalComponent";
import CreatePipelineStageForm from "@/forms/settings/CreatePipelineStageForm";

export default function PipelineStages() {
    const { t }          = useTranslation();

    const [searchParams] = useSearchParams();
    const { state }      = useLocation();
    const setId          = searchParams.get('setId');
    const setName   = (state as { setName?: string })?.setName;

    const [selectedPipelineStage, setSelectedPipelineStage] = useState<RowTableData | null>(null);
    const [pipelineStageToDelete, setPipelineStageToDelete] = useState<RowTableData | null>(null);

    const [editFormData,   setEditFormData  ] = useState<PipelineStageItemFormState | undefined>(undefined);
    const [editLoading,    setEditLoading   ] = useState(false);

    const createFormRef = useRef<PipelineStageItemFormState | null>(null);
    const editFormRef   = useRef<PipelineStageItemFormState | null>(null);

    const { request, toast } = useFetch();

    const [tableData, setTableData]     = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(false);

    useEffect(() => {
        setTableLoading(true);
        const timeoutId = setTimeout(() => { // ← increase/decrease to control skeleton duration
            let rows = [...PIPELINE_STAGES_MOCK_DATA];
            setTableData(rows);
            setTableLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    const columns      = useMemo(() => mapColumns(PIPELINE_STAGES_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();

    // ── Fetch stage data when Edit drawer opens ───────────────────────────────
    useEffect(() => {
        if (!editDrawer.isOpen || !selectedPipelineStage) {
            setEditFormData(undefined);
            return;
        }
        let cancelled = false;
        setEditLoading(true);
        const stageId  = Number(selectedPipelineStage.id);
        const parentId = Number(setId);  // set id from URL — correct key for mock

        const toItemState = (state: PipelineStageFormState): PipelineStageItemFormState | undefined =>
            state.stageData.find(s => s.rank === selectedPipelineStage!.rank)
            ?? state.stageData[0];

        api.get<PipelineStageFormState>(`/pipelineStage/${stageId}`)
            .then(res => {
                if (cancelled) return;
                const fallback = PIPELINE_STAGE_MOCK_BY_SET_ID[parentId] ?? PIPELINE_STAGE_FALLBACK_STATE;
                const source   = res.data ?? fallback;
                setEditFormData(toItemState(source));
            })
            .catch(() => {
                if (!cancelled) {
                    const fallback = PIPELINE_STAGE_MOCK_BY_SET_ID[parentId] ?? PIPELINE_STAGE_FALLBACK_STATE;
                    setEditFormData(toItemState(fallback));
                }
            })
            .finally(() => { if (!cancelled) setEditLoading(false); });
        return () => { cancelled = true; };
    }, [editDrawer.isOpen, selectedPipelineStage]);

    // ── API actions ───────────────────────────────────────────────────────────

    const handleDelete = useCallback(async () => {
        if (!pipelineStageToDelete) return;
        const res = await request(() =>
            api.delete(`/organizations/${pipelineStageToDelete.id}`)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            setPipelineStageToDelete(null);
        }
    }, [pipelineStageToDelete, request, toast]);

    const handleCreate = useCallback(async () => {
        if (!createFormRef.current) return;
        const res = await request(() =>
            api.post('/pipelineStage', createFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            createDrawer.close();
        }
    }, [createDrawer, request, toast]);

    const handleEdit = useCallback(async () => {
        if (!editFormRef.current || !selectedPipelineStage) return;
        const res = await request(() =>
            api.put(`/organizations/${selectedPipelineStage.id}`, editFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            editDrawer.close();
            setSelectedPipelineStage(null);
        }
    }, [editDrawer, request, selectedPipelineStage, toast]);

    // ── onConfirm must be async to trigger loading state in modal ─────────────
    const handleConfirm = useCallback(async () => {
        if (createDrawer.isOpen) return handleCreate();
        return handleEdit();
    }, [createDrawer.isOpen, handleCreate, handleEdit]);

    // ── Drawer close handlers (stable refs) ───────────────────────────────────
    const handleEditDrawerClose = useCallback(() => {
        editDrawer.close();
        setSelectedPipelineStage(null);
    }, [editDrawer]);

    // ── Modal ─────────────────────────────────────────────────────────────────
    const modal = useActionModal({
        toastMessages : {},
        onDelete      : handleDelete,
        onConfirm     : handleConfirm,
    });

    const actions = useMemo(() => mapActions(
        PIPELINES_STAGES_actionDefs.map(a => {
            if (a.type === 'edit') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedPipelineStage(row); editDrawer.open(); },
            };
            if (a.type === 'delete') return {
                ...a,
                onClick: (row: RowTableData) => { setPipelineStageToDelete(row); modal.openDelete(); },
            };
            return a;
        })
    ), [editDrawer, modal]);

    const handleCreatePipelineStage = useCallback((data: PipelineStageItemFormState) => {
        createFormRef.current = data;
    }, []);

    const handleEditPipelineStage = useCallback((data: PipelineStageItemFormState) => {
        editFormRef.current = data;
    }, []);

    const handleReorder = (reordered: RowTableData[]) =>
        setTableData(reordered.map((row, i) => ({ ...row, rank: i + 1 })));

    // const selectedPipelineStageData: Partial<PipelineStageFormState> | undefined = selectedPipelineStage
    //     ? (selectedPipelineStage as unknown as Partial<PipelineStageFormState>)
    //     : undefined;

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={tableData}
                columns={columns}
                actions={actions}
                rowKey="id"
                loading={tableLoading}
                title={setName}
                toolbar={
                    <div className="flex items-center max-xs:w-full max-xs:flex-wrap gap-2">
                        <ButtonComponent
                            variant="confirmation"
                            label={t("lblCreatePipelineStage")}
                            className="max-xs:w-full"
                            onClick={createDrawer.open}
                        />
                    </div>
                }
                emptyMessage={t("msgNoRecordsFoundForCriteria")}
                hasPagination={false}
                onAddNew={createDrawer.open}
                onRowReorder={handleReorder}
            />

            {/* ── Create Drawer ─────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t("lblCreatePipelineStage")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t("btnCancel")} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")}   onClick={() => modal.openConfirm('create-pipeline-stage-drawer-form')} />
                    </div>
                }
            >
                <CreatePipelineStageForm onSubmit={handleCreatePipelineStage} type="create" formId="create-pipeline-stage-drawer-form" />
            </DrawerComponent>

            {/* ── Edit Drawer ───────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={handleEditDrawerClose}
                title={t("lblEditPipelineStage")}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t("btnCancel")} onClick={handleEditDrawerClose} />
                        <ButtonComponent type="button" variant="confirmation" label={t("btnSave")}   onClick={() => modal.openConfirm('edit-pipeline-stage-drawer-form')} />
                    </div>
                }
            >
                <CreatePipelineStageForm
                    key={selectedPipelineStage ? String(selectedPipelineStage.id) : 'edit'}
                    onSubmit={handleEditPipelineStage}
                    type="edit"
                    initialData={editFormData}
                    formId="edit-pipeline-stage-drawer-form"
                    loading={editLoading}
                />
            </DrawerComponent>

            {/* ── Action Modal ──────────────────────────────────────────────── */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t("msgConfirmDeletePipelineStage", { name: pipelineStageToDelete?.stageName ?? '' })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t("msgConfirmAction")}</p>
                )}
            </ModalComponent>
        </div>
    );

}
