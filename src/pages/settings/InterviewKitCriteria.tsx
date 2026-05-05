import { useTranslation } from 'react-i18next';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InterviewKitCriterionFormState, RowTableData } from '@/models';
import {
    INTERVIEW_KIT_CRITERIA_actionDefs,
    INTERVIEW_KIT_CRITERIA_BY_KIT_ID,
    INTERVIEW_KIT_CRITERIA_columnDefs,
} from '@/demoData';
import { mapActions, mapColumns } from '@/helpers/TableDataHelper';
import TableComponent from '@/components/TableComponent/TableComponent';
import useFetch from '@/hooks/useFetch';
import { useActionModal, useModal } from '@/hooks/useModal';
import api from '@/api/api';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import DrawerComponent from '@/components/DrawerComponent/DrawerComponent';
import ModalComponent from '@/components/ModalComponent/ModalComponent';
import CreateInterviewKitCriterionForm from '@/forms/settings/CreateInterviewKitCriterionForm';

export default function InterviewKitCriteria() {
    const { t }          = useTranslation();
    const [searchParams] = useSearchParams();
    const { state }      = useLocation();
    const kitId          = searchParams.get('kitId');
    const kitName        = (state as { kitName?: string })?.kitName;

    const [selectedCriterion, setSelectedCriterion] = useState<RowTableData | null>(null);
    const [criterionToDelete, setCriterionToDelete] = useState<RowTableData | null>(null);

    const [editFormData, setEditFormData] = useState<InterviewKitCriterionFormState | undefined>(undefined);
    const [editLoading,  setEditLoading ] = useState(false);

    const createFormRef = useRef<InterviewKitCriterionFormState | null>(null);
    const editFormRef   = useRef<InterviewKitCriterionFormState | null>(null);

    const { request, toast } = useFetch();

    const [tableData,    setTableData   ] = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(false);

    // ── Load table data ───────────────────────────────────────────────────────
    useEffect(() => {
        setTableLoading(true);
        const id = setTimeout(() => {
            const parentId = Number(kitId);
            const rows     = INTERVIEW_KIT_CRITERIA_BY_KIT_ID[parentId] ?? [];
            setTableData(rows);
            setTableLoading(false);
        }, 500);
        return () => clearTimeout(id);
    }, [kitId]);

    const columns      = useMemo(() => mapColumns(INTERVIEW_KIT_CRITERIA_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();

    // ── Fetch criterion data when Edit drawer opens ───────────────────────────
    useEffect(() => {
        if (!editDrawer.isOpen || !selectedCriterion) {
            setEditFormData(undefined);
            return;
        }
        let cancelled = false;
        setEditLoading(true);

        api.get<InterviewKitCriterionFormState>(`/evaluationCriteria/${selectedCriterion.id}`)
            .then(res => {
                if (cancelled) return;
                const fallback = rowToFormState(selectedCriterion);
                const apiData  = res.data;
                const isValid  = apiData && typeof apiData === 'object' && 'criterionName' in apiData;
                setEditFormData(isValid ? apiData as InterviewKitCriterionFormState : fallback);
            })
            .catch(() => {
                if (!cancelled) setEditFormData(rowToFormState(selectedCriterion));
            })
            .finally(() => { if (!cancelled) setEditLoading(false); });

        return () => { cancelled = true; };
    }, [editDrawer.isOpen, selectedCriterion]);

    // ── API actions ───────────────────────────────────────────────────────────

    const handleDelete = useCallback(async () => {
        if (!criterionToDelete) return;
        const res = await request(() =>
            api.delete(`/evaluationCriteria/${criterionToDelete.id}`)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            setCriterionToDelete(null);
        }
    }, [criterionToDelete, request, toast]);

    const handleCreate = useCallback(async () => {
        if (!createFormRef.current) return;
        const res = await request(() =>
            api.post('/evaluationCriteria', createFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            createDrawer.close();
        }
    }, [createDrawer, request, toast]);

    const handleEdit = useCallback(async () => {
        if (!editFormRef.current || !selectedCriterion) return;
        const res = await request(() =>
            api.put(`/evaluationCriteria/${selectedCriterion.id}`, editFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            editDrawer.close();
            setSelectedCriterion(null);
        }
    }, [editDrawer, request, selectedCriterion, toast]);

    const handleConfirm = useCallback(async () => {
        if (createDrawer.isOpen) return handleCreate();
        return handleEdit();
    }, [createDrawer.isOpen, handleCreate, handleEdit]);

    const handleEditDrawerClose = useCallback(() => {
        editDrawer.close();
        setSelectedCriterion(null);
    }, [editDrawer]);

    // ── Modal ─────────────────────────────────────────────────────────────────
    const modal = useActionModal({
        toastMessages : {},
        onDelete      : handleDelete,
        onConfirm     : handleConfirm,
    });

    const actions = useMemo(() => mapActions(
        INTERVIEW_KIT_CRITERIA_actionDefs.map(a => {
            if (a.type === 'edit') return {
                ...a,
                onClick: (row: RowTableData) => { setEditLoading(true); setSelectedCriterion(row); editDrawer.open(); },
            };
            if (a.type === 'delete') return {
                ...a,
                onClick: (row: RowTableData) => { setCriterionToDelete(row); modal.openDelete(); },
            };
            return a;
        })
    ), [editDrawer, modal]);

    const handleCreateCriterion = useCallback((data: InterviewKitCriterionFormState) => {
        createFormRef.current = data;
    }, []);

    const handleEditCriterion = useCallback((data: InterviewKitCriterionFormState) => {
        editFormRef.current = data;
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={tableData}
                columns={columns}
                actions={actions}
                rowKey="id"
                loading={tableLoading}
                title={kitName}
                toolbar={
                    <div className="flex items-center max-xs:w-full max-xs:flex-wrap gap-2">
                        <ButtonComponent
                            variant="confirmation"
                            label={t('lblCreateEvaluationCriterion')}
                            className="max-xs:w-full"
                            onClick={createDrawer.open}
                        />
                    </div>
                }
                emptyMessage={t('msgNoEvaluationCriteria')}
                hasPagination={false}
                onAddNew={createDrawer.open}
            />

            {/* ── Create Drawer ─────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t('lblCreateEvaluationCriterion')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('create-interview-kit-criterion-form')} />
                    </div>
                }
            >
                <CreateInterviewKitCriterionForm
                    onSubmit={handleCreateCriterion}
                    type="create"
                    formId="create-interview-kit-criterion-form"
                />
            </DrawerComponent>

            {/* ── Edit Drawer ───────────────────────────────────────────────── */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={handleEditDrawerClose}
                title={t('lblEditEvaluationCriterion')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={handleEditDrawerClose} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('edit-interview-kit-criterion-form')} />
                    </div>
                }
            >
                <CreateInterviewKitCriterionForm
                    key={selectedCriterion ? String(selectedCriterion.id) : 'edit'}
                    onSubmit={handleEditCriterion}
                    type="edit"
                    initialData={editFormData}
                    formId="edit-interview-kit-criterion-form"
                    loading={editLoading}
                />
            </DrawerComponent>

            {/* ── Action Modal ──────────────────────────────────────────────── */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t('msgConfirmDeleteCriterion', { name: criterionToDelete?.criterionName ?? '' })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>
        </div>
    );
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function rowToFormState(row: RowTableData): InterviewKitCriterionFormState {
    return {
        rank         : Number(row.rank  ?? 0),
        criterionName: String(row.criterionName ?? ''),
        isMandatory  : Boolean(row.isMandatory  ?? false),
    };
}

