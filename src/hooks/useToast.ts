import { useState, useCallback, useContext, createContext, useMemo, useRef, useEffect } from 'react';

export type ToastType = 'info' |'success' | 'warning' | 'error';

export interface ToastMessage {
    id      : number;
    type    : ToastType;
    message : string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface ToastContextValue {
    toasts     : ToastMessage[];
    show       : (type: ToastType, message: string) => void;
    dismiss    : (id: number) => void;
    startFade  : (id: number) => void;   // triggers fade → then dismiss after FADE_DURATION
    info       : (message: string) => void;
    success    : (message: string) => void;
    warning    : (message: string) => void;
    error      : (message: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const FADE_DURATION    = 300;   // ms  — keep in sync with ToastContainer
const VISIBLE_DURATION = 8000;  // ms before auto-dismiss starts


// ─── Internal state hook (used by ToastProvider) ──────────────────────────────

export function useToastState(): ToastContextValue {
    const [toasts, setToasts]   = useState<ToastMessage[]>([]);
    const idRef                 = useRef(0);
    const timersRef             = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

    const dismiss = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // startFade is called by ToastContainer's handleDismiss AND by the auto-timer
    // It signals "begin fading" — actual removal is handled by the caller after FADE_DURATION
    const startFade = useCallback((_id: number) => {
        // intentionally a no-op in state; ToastContainer owns the fade CSS state
    }, []);

    const show = useCallback((type: ToastType, message: string) => {
        const id = ++idRef.current;
        setToasts(prev => [...prev, { id, type, message }]);
        // After visible + fade duration, remove from state
        const removeById = (list: ToastMessage[]) => list.filter(t => t.id !== id);
        const timer = setTimeout(() => {
            setToasts(removeById);
            timersRef.current.delete(id);
        }, VISIBLE_DURATION + FADE_DURATION);
        timersRef.current.set(id, timer);
    }, []);

    // Clean up all pending timers if the provider unmounts
    useEffect(() => {
        return () => {
            timersRef.current.forEach(clearTimeout);
            timersRef.current.clear();
        };
    }, []);

    const info    = useCallback((msg: string) => show('info',    msg), [show]);
    const success = useCallback((msg: string) => show('success', msg), [show]);
    const warning = useCallback((msg: string) => show('warning', msg), [show]);
    const error   = useCallback((msg: string) => show('error',   msg), [show]);

    return useMemo(
        () => ({ toasts, show, dismiss, startFade, info, success, warning, error }),
        [toasts, show, dismiss, startFade, info, success, warning, error]
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
    return ctx;
}
