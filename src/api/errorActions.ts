import { ErrorCode } from './types';
import type { ApiError } from './types';

type ErrorActionCallback = {
    onUnauthorized?: () => void;
    onForbidden?: () => void;
    onNotFound?: () => void;
    onServerError?: () => void;
    onNetworkError?: () => void;
    onDefault?: (error: ApiError) => void;
};

/**
 * Execute side effects based on error code
 */
export const executeErrorAction = (
    error: ApiError,
    callbacks?: ErrorActionCallback
): void => {
    const actions: Record<string, (() => void) | undefined> = {
        [ErrorCode.UNAUTHORIZED]: callbacks?.onUnauthorized ?? defaultUnauthorized,
        [ErrorCode.FORBIDDEN]: callbacks?.onForbidden,
        [ErrorCode.NOT_FOUND]: callbacks?.onNotFound,
        [ErrorCode.SERVER_ERROR]: callbacks?.onServerError,
        [ErrorCode.NETWORK_ERROR]: callbacks?.onNetworkError,
    };

    const action = actions[error.code];

    if (action) {
        action();
    } else {
        callbacks?.onDefault?.(error);
    }
};

// Default: redirect to login on 401
const defaultUnauthorized = (): void => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};
