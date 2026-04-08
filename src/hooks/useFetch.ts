import { useState, useCallback } from 'react';
import type { ApiResponse, ApiError } from '@/api/types';
import { ErrorCode } from '@/api/types';
import { executeErrorAction } from '@/api/errorActions';
import { useToast } from '@/hooks/useToast';

interface UseFetchReturn {
    loading    : boolean;
    error      : ApiError | null;
    request    : <T>(apiCall: () => Promise<ApiResponse<T>>) => Promise<ApiResponse<T>>;
    clearError : () => void;
    toast      : { success: (msg: string) => void; warning: (msg: string) => void; error: (msg: string) => void; };
}

const useFetch = (): UseFetchReturn => {
    const [loading, setLoading]             = useState<boolean>(false);
    const [error,   setError  ]             = useState<ApiError | null>(null);
    const { success, warning, error: showError } = useToast();

    const request = useCallback(async <T,>(
        apiCall: () => Promise<ApiResponse<T>>
    ): Promise<ApiResponse<T>> => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiCall();

            if (result.error) {
                setError(result.error);
                showError(result.error.message);
                executeErrorAction(result.error);
            }

            return result;
        } catch (err) {
            const apiError: ApiError = {
                message : err instanceof Error ? err.message : 'An unexpected error occurred',
                status  : 0,
                code    : ErrorCode.UNKNOWN,
            };
            setError(apiError);
            showError(apiError.message);
            return { data: null, error: apiError, status: 0 };
        } finally {
            setLoading(false);
        }
    }, [showError]);

    const clearError = useCallback(() => setError(null), []);

    return { loading, error, request, clearError, toast: { success, warning, error: showError } };
};

export default useFetch;
