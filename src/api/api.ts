import fetchClient from './fetchClient';
import type { ApiResponse, FetchOptions } from './types';

const api = {
    get: <TResponse>(
        endpoint: string,
        options?: Omit<FetchOptions, 'method' | 'body'>
    ): Promise<ApiResponse<TResponse>> =>
        fetchClient<TResponse>(endpoint, { ...options, method: 'GET' }),

    post: <TResponse, TBody = unknown>(
        endpoint: string,
        body: TBody,
        options?: Omit<FetchOptions, 'method' | 'body'>
    ): Promise<ApiResponse<TResponse>> =>
        fetchClient<TResponse, TBody>(endpoint, { ...options, method: 'POST', body }),

    put: <TResponse, TBody = unknown>(
        endpoint: string,
        body: TBody,
        options?: Omit<FetchOptions, 'method' | 'body'>
    ): Promise<ApiResponse<TResponse>> =>
        fetchClient<TResponse, TBody>(endpoint, { ...options, method: 'PUT', body }),

    patch: <TResponse, TBody = unknown>(
        endpoint: string,
        body: TBody,
        options?: Omit<FetchOptions, 'method' | 'body'>
    ): Promise<ApiResponse<TResponse>> =>
        fetchClient<TResponse, TBody>(endpoint, { ...options, method: 'PATCH', body }),

    delete: <TResponse>(
        endpoint: string,
        options?: Omit<FetchOptions, 'method' | 'body'>
    ): Promise<ApiResponse<TResponse>> =>
        fetchClient<TResponse>(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
