import {useTranslation} from "react-i18next";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PipelineStageSetsFormState, RowTableData} from "@/models";
import useFetch from "@/hooks/useFetch";
import {
    PIPELINES_STAGES_SET_actionDefs, PIPELINES_STAGES_SET_columnDefs,
    PIPELINES_STAGES_SET_MOCK_DATA,
} from "@/demoData";
import {mapActions, mapColumns} from "@/helpers/TableDataHelper";
import {useActionModal, useModal} from "@/hooks/useModal";
import api from "@/api/api";
import TableComponent from "@/components/TableComponent/TableComponent";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import {PAGE_SIZE_OPTIONS} from "@/constant/CONSTANTS";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";
import ModalComponent from "@/components/ModalComponent/ModalComponent";
import CreatePipelineStagesSetForm from "@/forms/settings/CreatePipelineStagesSetForm";

export default function PipelineStagesSets() {
    const { t }    = useTranslation();
    const navigate = useNavigate();

    const [selectedPipelineStageSet, setSelectedPipelineStageSet]     = useState<RowTableData | null>(null);
    const [pipelineStageSetToDelete, setPipelineStageSetToDelete]     = useState<RowTableData | null>(null);

    const [tableData,    setTableData   ] = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(true);

    const { request, toast } = useFetch();

    const createFormRef = useRef<PipelineStageSetsFormState | null>(null);
    const editFormRef   = useRef<PipelineStageSetsFormState | null>(null);

    const columns      = useMemo(() => mapColumns(PIPELINES_STAGES_SET_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();

    useEffect(() => {
        setTableLoading(true);
        const id = setTimeout(() => {
            setTableData(PIPELINES_STAGES_SET_MOCK_DATA);
            setTableLoading(false);
        }, 500);
        return () => clearTimeout(id);
    }, []);

    // ── API actions ───────────────────────────────────────────────────────────

    const handleDelete = useCallback(async () => {
        if (!pipelineStageSetToDelete) return;
        const res = await request(() =>
            api.delete(`/pipelineStagesSet/${pipelineStageSetToDelete.id}`)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            setPipelineStageSetToDelete(null);
        }
    }, [pipelineStageSetToDelete, request, toast]);

    const handleCreate = useCallback(async () => {
        if (!createFormRef.current) return;
        const res = await request(() =>
            api.post('/pipelineStagesSet', createFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            createDrawer.close();
        }
    }, [createDrawer, request, toast]);

    const handleEdit = useCallback(async () => {
        if (!editFormRef.current || !selectedPipelineStageSet) return;
        const res = await request(() =>
            api.put(`/role/${selectedPipelineStageSet.id}`, editFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            editDrawer.close();
            setSelectedPipelineStageSet(null);
        }
    }, [editDrawer, request, selectedPipelineStageSet, toast]);

    const handleConfirm = useCallback(async () => {
        if (createDrawer.isOpen) return handleCreate();
        return handleEdit();
    }, [createDrawer.isOpen, handleCreate, handleEdit]);

    const editInitialData: Partial<PipelineStageSetsFormState> | undefined = selectedPipelineStageSet
        ? { pipelineStageSetName: String(selectedPipelineStageSet.pipelineStageSetName as string ?? '') }
        : undefined;

    const modal = useActionModal({
        toastMessages : {},
        onDelete      : handleDelete,
        onConfirm     : handleConfirm,
    });

    const actions = useMemo(() => mapActions(
        PIPELINES_STAGES_SET_actionDefs.map(a => {
            if (a.type === 'edit') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedPipelineStageSet(row); editDrawer.open(); },
            };
            if (a.type === 'toggle') return {
                ...a,
                onClick: (row: RowTableData) => navigate(`/pipeline-stages?setId=${row.id}`),
            };
            if (a.type === 'delete') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedPipelineStageSet(row); modal.openDelete(); },
            };
            return a;
        })
    ), [editDrawer, modal, navigate]);

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={tableData}
                loading={tableLoading}
                columns={columns}
                actions={actions}
                rowKey="id"
                title={t('lblManagePipelineStagesSets')}
                toolbar={
                    <ButtonComponent
                        variant="confirmation"
                        label={t('lblCreatePipelineStagesSet')}
                        onClick={createDrawer.open}
                    />
                }
                emptyMessage={t('msgNoPipelineStagesSets')}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onAddNew={() => createDrawer.open()}
                hideActions={(row) => row.isDefault === true}
                onRowReorder={setTableData}
            />

            {/* Create drawer */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t('lblCreatePipelineStagesSet')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('create-department-form')} />
                    </div>
                }
            >
                <CreatePipelineStagesSetForm type="create" onSubmit={handleCreate} formId="create-pipeline-stage-set-form" />
            </DrawerComponent>

            {/* Edit drawer */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={() => { editDrawer.close(); setSelectedPipelineStageSet(null); }}
                title={t('lblEditPipelineStagesSet')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={() => { editDrawer.close(); setSelectedPipelineStageSet(null); }} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('edit-pipeline-stage-set-form')} />
                    </div>
                }
            >
                <CreatePipelineStagesSetForm
                    key={selectedPipelineStageSet ? String(selectedPipelineStageSet.id) : 'edit'}
                    type="edit"
                    onSubmit={handleEdit}
                    initialData={editInitialData}
                    formId="edit-pipeline-stage-set-form"
                />
            </DrawerComponent>

            {/* Single action modal */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t('msgConfirmDeletePipelineStagesSet', { name: String(pipelineStageSetToDelete?.pipelineStageSetName as string ?? '') })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>
        </div>
    );
}
