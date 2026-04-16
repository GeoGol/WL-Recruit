import { ErrorCode } from './types';
import type { ApiError } from './types';

/**
 * Maps an HTTP status code to a generic { code, message } fallback.
 * The caller (fetchClient) is responsible for preferring any server-provided
 * message over this fallback — this function knows nothing about the body.
 */
export const handleResponseError = (status: number): ApiError => {
    const errorMap: Record<number, { code: ErrorCode; message: string }> = {
        400: { code: ErrorCode.VALIDATION,    message: 'Invalid request. Please check your input.'                    },
        401: { code: ErrorCode.UNAUTHORIZED,  message: 'Your session has expired. Please log in again.'              },
        403: { code: ErrorCode.FORBIDDEN,     message: 'You do not have permission to perform this action.'          },
        404: { code: ErrorCode.NOT_FOUND,     message: 'The requested resource was not found.'                       },
        409: { code: ErrorCode.VALIDATION,    message: 'A conflict occurred. The resource may already exist.'        },
        422: { code: ErrorCode.VALIDATION,    message: 'The provided data is invalid.'                               },
        429: { code: ErrorCode.RATE_LIMITED,  message: 'Too many requests. Please try again later.'                  },
        500: { code: ErrorCode.SERVER_ERROR,  message: 'An internal server error occurred. Please try again later.'  },
        502: { code: ErrorCode.SERVER_ERROR,  message: 'The server is temporarily unavailable.'                      },
        503: { code: ErrorCode.SERVER_ERROR,  message: 'Service is under maintenance. Please try again later.'       },
        504: { code: ErrorCode.TIMEOUT,       message: 'The server took too long to respond.'                        },
    };

    const mapped = errorMap[status];

    return {
        status,
        code   : mapped?.code    ?? ErrorCode.UNKNOWN,
        message: mapped?.message ?? `Unexpected error (status: ${status})`,
    };
};

/**
 * Handles network-level errors (no response from server)
 */
export const handleNetworkError = (error: unknown): ApiError => {
    if (error instanceof DOMException && error.name === 'AbortError') {
        return {
            status: 0,
            code: ErrorCode.TIMEOUT,
            message: 'Request timed out. Please try again.',
        };
    }

    if (!navigator.onLine) {
        return {
            status: 0,
            code: ErrorCode.NETWORK_ERROR,
            message: 'No internet connection. Please check your network.',
        };
    }

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return {
            status: 0,
            code: ErrorCode.NETWORK_ERROR,
            message: 'Unable to reach the server. Please try again.',
        };
    }

    return {
        status: 0,
        code: ErrorCode.UNKNOWN,
        message: error instanceof Error ? error.message : 'An unexpected error occurred.',
    };
};
