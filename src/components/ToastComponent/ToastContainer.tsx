import ReactDOM from 'react-dom';
import { useState, useCallback, useEffect, useRef, memo } from 'react';
import { Toast } from 'flowbite-react';
import {
    RiCheckboxCircleLine,
    RiErrorWarningLine,
    RiCloseCircleLine,
    RiInformationLine
} from '@/components/IconComponent/Icons';
import { useToast, type ToastMessage } from '@/hooks/useToast';
import CustomToastToggle from './CustomToastToggle';

const FADE_DURATION    = 300;
const VISIBLE_DURATION = 8000;

const toastConfig = {
    info    : { icon: <RiInformationLine    size={20} />, iconClass: 'text-info',    borderColor: 'border-info',    backgroundColor: 'bg-info-bg'    },
    success : { icon: <RiCheckboxCircleLine size={20} />, iconClass: 'text-success', borderColor: 'border-success', backgroundColor: 'bg-success-bg' },
    warning : { icon: <RiErrorWarningLine   size={20} />, iconClass: 'text-warning', borderColor: 'border-warning', backgroundColor: 'bg-warning-bg' },
    error   : { icon: <RiCloseCircleLine    size={20} />, iconClass: 'text-danger',  borderColor: 'border-danger',  backgroundColor: 'bg-error-bg'   },
};

// ─── Memoized single toast row ────────────────────────────────────────────────

interface ToastItemProps {
    toast     : ToastMessage;
    isFading  : boolean;
    onDismiss : (id: number) => void;
}

const ToastItem = memo(({ toast, isFading, onDismiss }: ToastItemProps) => {
    const { icon, iconClass, borderColor, backgroundColor } = toastConfig[toast.type];
    return (
        <div
            style={{
                transition: `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease`,
                opacity  : isFading ? 0 : 1,
                transform: isFading ? 'translateX(20px)' : 'translateX(0)',
            }}
        >
            <Toast className={`p-2 rounded-l-none w-full border-l-4 ${borderColor} ${backgroundColor}`}>
                <div className={`inline-flex shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
                    {icon}
                </div>
                <div className="ml-3 text-base font-normal text-primary">
                    {toast.message}
                </div>
                <CustomToastToggle onDismiss={() => onDismiss(toast.id)} />
            </Toast>
        </div>
    );
});
ToastItem.displayName = 'ToastItem';

// ─── Container ────────────────────────────────────────────────────────────────

export default function ToastContainer() {
    const { toasts, dismiss }           = useToast();
    const [fadingIds, setFadingIds]     = useState<Set<number>>(new Set());
    const scheduledRef                  = useRef<Set<number>>(new Set());
    const fadeTimersRef                 = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
    const dismissTimersRef              = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

    const addFading = useCallback((id: number) => {
        setFadingIds(prev => new Set(prev).add(id));
    }, []);

    // Schedule auto-fade for each new toast
    useEffect(() => {
        toasts.forEach(toast => {
            if (scheduledRef.current.has(toast.id)) return;
            scheduledRef.current.add(toast.id);
            const id    = toast.id;
            const timer = setTimeout(() => addFading(id), VISIBLE_DURATION);
            fadeTimersRef.current.set(id, timer);
        });
    }, [toasts, addFading]);

    // Clean up all pending timers on unmount
    useEffect(() => {
        return () => {
            fadeTimersRef.current.forEach(clearTimeout);
            dismissTimersRef.current.forEach(clearTimeout);
        };
    }, []);

    const handleDismiss = useCallback((id: number) => {
        // Cancel pending auto-fade timer if the user dismisses manually
        const existing = fadeTimersRef.current.get(id);
        if (existing) { clearTimeout(existing); fadeTimersRef.current.delete(id); }

        setFadingIds(prev => new Set(prev).add(id));

        const timer = setTimeout(() => {
            dismiss(id);
            setFadingIds(prev => { const n = new Set(prev); n.delete(id); return n; });
            scheduledRef.current.delete(id);
            dismissTimersRef.current.delete(id);
        }, FADE_DURATION);
        dismissTimersRef.current.set(id, timer);
    }, [dismiss]);

    if (!toasts.length) return null;

    return ReactDOM.createPortal(
        <section
            aria-live="polite"
            aria-atomic="false"
            aria-label="Notifications"
            className="fixed top-3 right-4 z-[2000] flex flex-col gap-3 w-80"
        >
            {toasts.map(toast => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    isFading={fadingIds.has(toast.id)}
                    onDismiss={handleDismiss}
                />
            ))}
        </section>,
        document.body
    );
}
