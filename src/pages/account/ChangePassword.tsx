import { useTranslation } from 'react-i18next';
import ChangePasswordForm from '@/forms/account/ChangePasswordForm';

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChangePassword() {
    const { t } = useTranslation();

    const handleSubmit = (currentPassword: string, newPassword: string) => {
        console.log('Change password:', { currentPassword, newPassword });
        // TODO: call API
    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <div className="w-full p-4 bg-white rounded-lg shadow sm:max-w-md sm:p-4">
                <div className="mb-4">
                    <h2 className="mb-2 text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
                        {t('lblChangePassword')}
                    </h2>
                    <p className="text-base text-muted">{t('msgEnterNewPassword')}</p>
                </div>
                <ChangePasswordForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
