import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputComponent from '@/components/FormComponents/InputComponent';
import RichTextEditor from '@/components/FormComponents/RichTextEditor';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';

export default function NewSupportRequest() {
    const { t } = useTranslation();

    const [subject, setSubject] = useState('');
    const [body, setBody]       = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submit', subject, body);
        // TODO: send support request
    };

    return (
        <div className="w-full flex flex-col gap-4 p-4 bg-surface rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold text-primary">
                {t('lblNewSupportRequest')}
            </h2>
            <form
                onSubmit={handleSubmit}
                onKeyDown={e => {
                    const target = e.target as HTMLElement;
                    if (e.key === 'Enter' && target.isContentEditable) {
                        e.preventDefault();
                    }
                }}
                className="flex flex-col gap-4"
            >
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
                        type="submit"
                        variant="confirmation"
                        label={t('lblSubmitRequest')}
                    />
                </div>
            </form>
        </div>
    );
}

