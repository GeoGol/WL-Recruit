import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';

export default function NotFound() {
    const navigate    = useNavigate();
    const { t }       = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh] gap-6 text-center p-8">
            <span className="text-8xl font-bold text-primary opacity-10 select-none">404</span>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-primary">
                    {t('lblPageNotFound') ?? 'Page not found'}
                </h1>
                <p className="text-muted text-md">
                    {t('lblPageNotFoundDescription') ?? 'The page you are looking for does not exist or has been moved.'}
                </p>
            </div>
            <ButtonComponent
                label={t('lblGoBack') ?? 'Go back'}
                variant="primary"
                onClick={() => navigate(-1)}
            />
        </div>
    );
}
