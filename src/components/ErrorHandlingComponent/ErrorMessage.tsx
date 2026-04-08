import { memo } from 'react';
import { ErrorCode } from '@/api/types';
import type { ApiError } from '@/api/types';

interface ErrorMessageProps {
    error: ApiError | null;
    onRetry?: () => void;
    onDismiss?: () => void;
}

const ErrorMessage = memo(function ErrorMessage({
                                                    error,
                                                    onRetry,
                                                    onDismiss,
                                                }: Readonly<ErrorMessageProps>) {
    if (!error) return null;

    const errorConfig: Record<string, { icon: string; color: string }> = {
        [ErrorCode.UNAUTHORIZED]:  { icon: 'i-lock',    color: '#e74c3c' },
        [ErrorCode.FORBIDDEN]:     { icon: 'i-ban',     color: '#e74c3c' },
        [ErrorCode.NOT_FOUND]:     { icon: 'i-search',  color: '#f39c12' },
        [ErrorCode.VALIDATION]:    { icon: 'i-warning', color: '#f39c12' },
        [ErrorCode.RATE_LIMITED]:  { icon: 'i-clock',   color: '#f39c12' },
        [ErrorCode.SERVER_ERROR]:  { icon: 'i-server',  color: '#e74c3c' },
        [ErrorCode.NETWORK_ERROR]: { icon: 'i-wifi',    color: '#e74c3c' },
        [ErrorCode.TIMEOUT]:       { icon: 'i-clock',   color: '#e74c3c' },
        [ErrorCode.UNKNOWN]:       { icon: 'i-alert',   color: '#e74c3c' },
    };

    const config = errorConfig[error.code] || errorConfig[ErrorCode.UNKNOWN];

    return (
        <div
            role="alert"
            style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: `${config.color}15`,
                border: `1px solid ${config.color}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
            }}
        >
            <i className={config.icon} style={{ color: config.color, fontSize: '20px' }} />

            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: config.color, fontWeight: 600 }}>
                    {error.message}
                </p>
                <small style={{ color: '#888' }}>
                    Error {error.status > 0 ? error.status : ''} — {error.code}
                </small>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                {onRetry && (
                    <button onClick={onRetry}>Retry</button>
                )}
                {onDismiss && (
                    <button onClick={onDismiss}>✕</button>
                )}
            </div>
        </div>
    );
});

export default ErrorMessage;
