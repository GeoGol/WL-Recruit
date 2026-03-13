import { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";

export default function ChangePassword() {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: implement change password logic
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
            <div className="w-full p-6 bg-white rounded-lg shadow sm:max-w-md sm:p-8">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    {t('lblChangePassword')}
                </h2>
                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900">
                            {t('lblCurrentPassword')}
                        </label>
                        <input
                            type="password"
                            id="current-password"
                            name="current-password"
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900">
                            {t('lblNewPassword')}
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            name="new-password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                            {t('lblRepeatNewPassword')}
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>
                    <ButtonComponent
                        type="submit"
                        variant="confirmation"
                        // loading={true}
                        // disabled={true}

                        fullWidth
                        label={t('lblChangePassword')}
                    />
                </form>
            </div>
        </div>
    );
}
