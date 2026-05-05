import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InterviewKitFormState, RowTableData } from '@/models';
import useFetch from '@/hooks/useFetch';
import {
    INTERVIEW_KITS_actionDefs,
    INTERVIEW_KITS_columnDefs,
    INTERVIEW_KITS_MOCK_DATA,
} from '@/demoData';
import { mapActions, mapColumns } from '@/helpers/TableDataHelper';
import { useActionModal, useModal } from '@/hooks/useModal';
import api from '@/api/api';
import TableComponent from '@/components/TableComponent/TableComponent';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { PAGE_SIZE_OPTIONS } from '@/constant/CONSTANTS';
import DrawerComponent from '@/components/DrawerComponent/DrawerComponent';
import ModalComponent from '@/components/ModalComponent/ModalComponent';
import CreateInterviewKitForm from '@/forms/settings/CreateInterviewKitForm';

export default function InterviewKits() {
    const { t }    = useTranslation();
    const navigate = useNavigate();

    const [selectedInterviewKit, setSelectedInterviewKit] = useState<RowTableData | null>(null);
    const [interviewKitToDelete, setInterviewKitToDelete] = useState<RowTableData | null>(null);

    const [tableData,    setTableData   ] = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(true);

    const { request, toast } = useFetch();

    const createFormRef = useRef<InterviewKitFormState | null>(null);
    const editFormRef   = useRef<InterviewKitFormState | null>(null);

    const columns      = useMemo(() => mapColumns(INTERVIEW_KITS_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();

    useEffect(() => {
        setTableLoading(true);
        const id = setTimeout(() => {
            setTableData(INTERVIEW_KITS_MOCK_DATA);
            setTableLoading(false);
        }, 500);
        return () => clearTimeout(id);
    }, []);

    // ── API actions ───────────────────────────────────────────────────────────

    const handleDelete = useCallback(async () => {
        if (!interviewKitToDelete) return;
        const res = await request(() =>
            api.delete(`/evaluationForms/${interviewKitToDelete.id}`)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            setInterviewKitToDelete(null);
        }
    }, [interviewKitToDelete, request, toast]);

    const handleCreate = useCallback(async () => {
        if (!createFormRef.current) return;
        const res = await request(() =>
            api.post('/evaluationForms', createFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            createDrawer.close();
        }
    }, [createDrawer, request, toast]);

    const handleEdit = useCallback(async () => {
        if (!editFormRef.current || !selectedInterviewKit) return;
        const res = await request(() =>
            api.put(`/evaluationForms/${selectedInterviewKit.id}`, editFormRef.current!)
        );
        if (!res.error) {
            toast.success(t('msgActionSuccess'));
            editDrawer.close();
            setSelectedInterviewKit(null);
        }
    }, [editDrawer, request, selectedInterviewKit, toast]);

    const handleConfirm = useCallback(async () => {
        if (createDrawer.isOpen) return handleCreate();
        return handleEdit();
    }, [createDrawer.isOpen, handleCreate, handleEdit]);

    const editInitialData: Partial<InterviewKitFormState> | undefined = selectedInterviewKit
        ? { interviewKitName: String(selectedInterviewKit.interviewKitName as string ?? '') }
        : undefined;

    const modal = useActionModal({
        toastMessages : {},
        onDelete      : handleDelete,
        onConfirm     : handleConfirm,
    });

    const actions = useMemo(() => mapActions(
        INTERVIEW_KITS_actionDefs.map(a => {
            if (a.type === 'edit') return {
                ...a,
                onClick: (row: RowTableData) => { setSelectedInterviewKit(row); editDrawer.open(); },
            };
            if (a.type === 'navigate') return {
                ...a,
                onClick: (row: RowTableData) => navigate(`/interview-kit-criteria?kitId=${String(row.id)}`, {
                    state: { kitName: row.interviewKitName as string },
                }),
            };
            if (a.type === 'delete') return {
                ...a,
                onClick: (row: RowTableData) => { setInterviewKitToDelete(row); modal.openDelete(); },
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
                title={t('lblManageEvaluationForms')}
                toolbar={
                    <ButtonComponent
                        variant="confirmation"
                        label={t('lblCreateEvaluationForm')}
                        onClick={createDrawer.open}
                    />
                }
                emptyMessage={t('msgNoEvaluationForms')}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onAddNew={() => createDrawer.open()}
            />

            {/* Create drawer */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t('lblCreateEvaluationForm')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('create-interview-kit-form')} />
                    </div>
                }
            >
                <CreateInterviewKitForm
                    type="create"
                    onSubmit={data => { createFormRef.current = data; }}
                    formId="create-interview-kit-form"
                />
            </DrawerComponent>

            {/* Edit drawer */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={() => { editDrawer.close(); setSelectedInterviewKit(null); }}
                title={t('lblEditEvaluationForm')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={() => { editDrawer.close(); setSelectedInterviewKit(null); }} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('edit-interview-kit-form')} />
                    </div>
                }
            >
                <CreateInterviewKitForm
                    key={selectedInterviewKit ? String(selectedInterviewKit.id) : 'edit'}
                    type="edit"
                    onSubmit={data => { editFormRef.current = data; }}
                    initialData={editInitialData}
                    formId="edit-interview-kit-form"
                />
            </DrawerComponent>

            {/* Single action modal */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t('msgConfirmDeleteEvaluationForm', { name: String(interviewKitToDelete?.interviewKitName as string ?? '') })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>
        </div>
    );
}
