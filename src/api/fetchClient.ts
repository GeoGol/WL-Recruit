import type { ApiResponse, FetchOptions } from './types';
import { handleResponseError, handleNetworkError } from './responseHandler';

const BASE_URL: string = import.meta.env.VITE_API_URL || '';

const fetchClient = async <TResponse, TBody = unknown>(
    endpoint: string,
    options: FetchOptions<TBody> = {}
): Promise<ApiResponse<TResponse>> => {
    const {
        method = 'GET',
        body = null,
        headers = {},
        timeout = 10000,
    } = options;

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: { ...defaultHeaders, ...headers },
            body: body ? JSON.stringify(body) : null,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await parseResponse<TResponse>(response);

        if (!response.ok) {
            const serverMessage = extractServerMessage(data);
            return {
                data: null,
                error: handleResponseError(response.status, serverMessage),
                status: response.status,
            };
        }

        return { data, error: null, status: response.status };
    } catch (err) {
        clearTimeout(timeoutId);
        return {
            data: null,
            error: handleNetworkError(err),
            status: 0,
        };
    }
};

const parseResponse = async <T>(response: Response): Promise<T> => {
    const contentType = response.headers.get('Content-Type') ?? '';

    // Always read as text first — body can only be consumed once
    const text = await response.text();

    if (!text) return null as unknown as T;

    if (contentType.includes('application/json') || text.trimStart().startsWith('{') || text.trimStart().startsWith('[')) {
        try {
            return JSON.parse(text) as T;
        } catch {
            return text as unknown as T;
        }
    }

    return text as unknown as T;
};

/**
 * Try to extract a message from the server error response
 */
const extractServerMessage = (data: unknown): string | undefined => {
    if (data && typeof data === 'object') {
        const obj = data as Record<string, unknown>;
        // Handle common API error formats
        if (typeof obj.message === 'string') return obj.message;
        if (typeof obj.error === 'string') return obj.error;
        if (typeof obj.title === 'string') return obj.title; // ASP.NET format
        if (Array.isArray(obj.errors)) {
            return obj.errors.join(', ');
        }
    }
    if (typeof data === 'string') return data;
    return undefined;
};

export default fetchClient;
