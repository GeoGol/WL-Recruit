export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
    status: number;
}

export interface ApiError {
    message: string;
    status: number;
    code: ErrorCode;
}

// Enum for error classification
export enum ErrorCode {
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    VALIDATION = 'VALIDATION',
    RATE_LIMITED = 'RATE_LIMITED',
    SERVER_ERROR = 'SERVER_ERROR',
    NETWORK_ERROR = 'NETWORK_ERROR',
    TIMEOUT = 'TIMEOUT',
    UNKNOWN = 'UNKNOWN',
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions<TBody = unknown> {
    method?: HttpMethod;
    body?: TBody | null;
    headers?: Record<string, string>;
    timeout?: number;
}
