import { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import InputComponent from "@/components/FormComponents/InputComponent";

// ─── Validation ───────────────────────────────────────────────────────────────

const MIN_LENGTH = 6;

const validatePassword = (password: string): string | null => {
    if (!password)                                                      return 'msgMustSpecifyNewPassword';
    if (password.length < MIN_LENGTH)                                   return 'msgPasswordRules';
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[^A-Za-z0-9]/.test(password))
                                                                        return 'msgPasswordRules';
    return null;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChangePassword() {
    const { t } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword]         = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Errors — only shown after the field has been touched
    const [errors, setErrors] = useState({
        currentPassword : '',
        newPassword     : '',
        confirmPassword : '',
    });

    const validateCurrentPassword = (value: string) => {
        if (!value) return t('msgMustSpecifyCurrentPassword');
        return '';
    };

    const validateNewPassword = (value: string) => {
        const key = validatePassword(value);
        return key ? t(key, { 0: MIN_LENGTH }) : '';
    };

    const validateConfirmPassword = (value: string, newPwd = newPassword) => {
        if (!value)           return t('msgMustSpecifyNewPassword');
        if (value !== newPwd) return t('msgPasswordsDontMatch');
        return '';
    };

    const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCurrentPassword(val);
        setErrors(prev => ({ ...prev, currentPassword: validateCurrentPassword(val) }));
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNewPassword(val);
        setErrors(prev => ({
            ...prev,
            newPassword     : validateNewPassword(val),
            // Re-validate confirm immediately if it already has a value
            confirmPassword : confirmPassword ? validateConfirmPassword(confirmPassword, val) : prev.confirmPassword,
        }));
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setConfirmPassword(val);
        setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(val) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const currentErr = validateCurrentPassword(currentPassword);
        const newErr     = validateNewPassword(newPassword);
        const confirmErr = validateConfirmPassword(confirmPassword);

        setErrors({
            currentPassword : currentErr,
            newPassword     : newErr,
            confirmPassword : confirmErr,
        });

        if (currentErr || newErr || confirmErr) return;

        // TODO: call API to change password
    };

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <div className="w-full p-4 bg-white rounded-lg shadow sm:max-w-md sm:p-4">
                <div className={'mb-4'}>
                    <h2 className="mb-2 text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
                        {t('lblChangePassword')}
                    </h2>
                    <p className="text-base text-gray-500">{t('msgEnterNewPassword')}</p>

                </div>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <InputComponent
                        type="password"
                        id="current-password"
                        name="current-password"
                        label={t('lblCurrentPassword')}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        variant={errors.currentPassword ? 'error' : 'default'}
                        helperText={errors.currentPassword || undefined}
                        size={'sm'}
                        required
                        fullWidth
                    />
                    <InputComponent
                        type="password"
                        id="new-password"
                        name="new-password"
                        label={t('lblNewPassword')}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        variant={errors.newPassword ? 'error' : 'default'}
                        helperText={errors.newPassword || undefined}
                        // hint={t('msgPasswordRules')}
                        size={'sm'}
                        required
                        fullWidth
                    />
                    <InputComponent
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        label={t('lblRepeatNewPassword')}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        variant={errors.confirmPassword ? 'error' : 'default'}
                        helperText={errors.confirmPassword || undefined}
                        size={'sm'}
                        required
                        fullWidth
                    />
                    <p className="text-xs text-danger">(*) {t('lblIsMandatory')}</p>

                    <ButtonComponent
                        type="submit"
                        variant="confirmation"
                        fullWidth
                        label={t('lblChangePassword')}
                    />
                </form>
            </div>
        </div>
    );
}

