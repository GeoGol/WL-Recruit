import {useEffect, useMemo, useState} from "react";
import {QuestionFormState, RowTableData} from "@/models";
import {
    QUESTIONS_MOCK_DATA,
    QUESTIONS_actionDefs,
    QUESTIONS_columnDefs
} from "@/demoData";
import {mapActions, mapColumns} from "@/helpers/TableDataHelper";
import {useActionModal, useModal} from "@/hooks/useModal";
import {t} from "i18next";
import TableComponent from "@/components/TableComponent/TableComponent";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import {PAGE_SIZE_OPTIONS} from "@/constant/CONSTANTS";
import DrawerComponent from "@/components/DrawerComponent/DrawerComponent";
import ModalComponent from "@/components/ModalComponent/ModalComponent";
import CreateQuestionForm from "@/forms/settings/CreateQuestionForm";

export default function Questions() {
    const [questionToEdit,   setQuestionToEdit  ] = useState<RowTableData | null>(null);
    const [questionToDelete, setQuestionToDelete] = useState<RowTableData | null>(null);

    // ── Mock initial load skeleton ────────────────────────────────────────────
    const [tableData,    setTableData   ] = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(true);

    useEffect(() => {
        setTableLoading(true);
        const id = setTimeout(() => {
            setTableData(QUESTIONS_MOCK_DATA);
            setTableLoading(false);
        }, 500);
        return () => clearTimeout(id);
    }, []);

    const columns      = useMemo(() => mapColumns(QUESTIONS_columnDefs), []);
    const createDrawer = useModal();
    const editDrawer   = useModal();
    const modal        = useActionModal({
        toastMessages: {
            delete  : { type: 'success', message: t('msgActionSuccess') },
            confirm : { type: 'success', message: t('msgActionSuccess') },
        },
        onDelete: () => {
            console.log('Delete question:', questionToDelete);
            setQuestionToDelete(null);
        },
    });

    const actions = useMemo(() => mapActions(
        QUESTIONS_actionDefs.map(a => {
            if (a.label === 'Edit') return {
                ...a,
                onClick: (row: RowTableData) => { setQuestionToEdit(row); editDrawer.open(); },
            };
            if (a.label === 'Delete') return {
                ...a,
                onClick: (row: RowTableData) => { setQuestionToDelete(row); modal.openDelete(); },
            };
            return a;
        })
    ), [editDrawer, modal]);

    const handleCreate = (data: QuestionFormState) => {
        console.log('Create question:', data);
        createDrawer.close();
    };

    const handleEdit = (data: QuestionFormState) => {
        console.log('Update question:', data);
        editDrawer.close();
        setQuestionToEdit(null);
    };

    const editInitialData: Partial<QuestionFormState> | undefined = questionToEdit ?? undefined;

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={tableData}
                loading={tableLoading}
                columns={columns}
                actions={actions}
                rowKey="id"
                title={t('roleManageQuestions')}
                toolbar={
                    <ButtonComponent
                        variant="confirmation"
                        label={t('lblCreateQuestion')}
                        onClick={createDrawer.open}
                    />
                }
                emptyMessage={t('msgNoQuestions')}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onAddNew={() => createDrawer.open()}
            />

            {/* Create drawer */}
            <DrawerComponent
                isOpen={createDrawer.isOpen}
                onClose={createDrawer.close}
                title={t('lblCreateQuestion')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={createDrawer.close} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('create-question-form')} />
                    </div>
                }
            >
                <CreateQuestionForm type="create" onSubmit={handleCreate} formId="create-question-form" />
            </DrawerComponent>

            {/* Edit drawer */}
            <DrawerComponent
                isOpen={editDrawer.isOpen}
                onClose={() => { editDrawer.close(); setQuestionToEdit(null); }}
                title={t('lblEditQuestion')}
                placement="right"
                size="xl"
                footer={
                    <div className="flex gap-3">
                        <ButtonComponent type="button" variant="main"         label={t('btnCancel')} onClick={() => { editDrawer.close(); setQuestionToEdit(null); }} />
                        <ButtonComponent type="button" variant="confirmation" label={t('btnSave')}   onClick={() => modal.openConfirm('edit-question-form')} />
                    </div>
                }
            >
                <CreateQuestionForm
                    key={questionToEdit ? String(questionToEdit.id) : 'edit'}
                    type="edit"
                    onSubmit={handleEdit}
                    initialData={editInitialData}
                    formId="edit-question-form"
                />
            </DrawerComponent>

            {/* Single action modal */}
            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'delete' && (
                    <p className="text-primary text-md">
                        {t('msgConfirmDeleteQuestion', { name: String(questionToDelete?.question ?? '') })}
                    </p>
                )}
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>

        </div>
    );
}
