import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputComponent from '@/components/FormComponents/InputComponent';
import RichTextEditor from '@/components/FormComponents/RichTextEditor';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { useActionModal } from '@/hooks/useModal';
import ModalComponent from '@/components/ModalComponent/ModalComponent';

export default function NewSupportRequest({formId = 'new-support-request-form'}: Readonly<{ formId?: string }>) {
    const { t } = useTranslation();

    const [subject, setSubject] = useState('');
    const [body, setBody]       = useState('');

    const modal = useActionModal({
        toastMessages: {
            confirm: { type: 'success', message: t('msgConfirmAction') },
        },
        onConfirm: () => console.log('Support request submitted:', subject, body),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submit', subject, body);
        // TODO: send support request
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        if (e.key === 'Enter' && target.isContentEditable) {
            e.preventDefault();
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 p-4 bg-surface rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold text-primary">
                {t('lblNewSupportRequest')}
            </h2>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */}
            <form id={formId} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                <div className="flex flex-col gap-4">
                    <InputComponent
                        id="subject"
                        name="subject"
                        label={t('lblSubject')}
                        size={'md'}
                        placeholder={t('lblSubject')}
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        required
                        fullWidth
                    />
                    <RichTextEditor
                        label={t('lblMessage')}
                        placeholder={t('lblWriteYourMessage')}
                        maxLength={2000}
                        onChange={setBody}
                        value={body}
                    />
                    <div className="flex justify-end">
                        <ButtonComponent
                            type="button"
                            variant="confirmation"
                            label={t('lblSubmitRequest')}
                            onClick={() => modal.openConfirm(formId)}
                        />
                    </div>
                </div>
            </form>

            <ModalComponent {...modal.modalProps} size="md">
                {modal.variant === 'confirm' && (
                    <p className="text-primary text-md">{t('msgConfirmAction')}</p>
                )}
            </ModalComponent>
        </div>
    );
}
