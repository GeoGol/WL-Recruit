import type { ReactNode } from 'react';
import { ToastContext, useToastState } from '@/hooks/useToast';

export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
    const value = useToastState();
    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
}

