import ReactDOM from 'react-dom';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Toast } from 'flowbite-react';
import {
    RiCheckboxCircleLine,
    RiErrorWarningLine,
    RiCloseCircleLine,
    RiInformationLine
} from '@/components/IconComponent/Icons';
import { useToast } from '@/hooks/useToast';
import CustomToastToggle from './CustomToastToggle';

const FADE_DURATION    = 300;  // ms — keep in sync with useToast.ts
const VISIBLE_DURATION = 8000; // ms — keep in sync with useToast.ts

const toastConfig = {
    info    : { icon: <RiInformationLine    size={20} />, iconClass: 'text-info',    borderColor: 'border-info',    backgroundColor: 'bg-info-bg' },
    success : { icon: <RiCheckboxCircleLine size={20} />, iconClass: 'text-success', borderColor: 'border-success', backgroundColor: 'bg-success-bg' },
    warning : { icon: <RiErrorWarningLine   size={20} />, iconClass: 'text-warning', borderColor: 'border-warning', backgroundColor: 'bg-warning-bg' },
    error   : { icon: <RiCloseCircleLine    size={20} />, iconClass: 'text-danger',  borderColor: 'border-danger',  backgroundColor: 'bg-error-bg'   },
};

export default function ToastContainer() {
    const { toasts, dismiss } = useToast();
    const [fadingIds, setFadingIds] = useState<Set<number>>(new Set());
    const scheduledRef = useRef<Set<number>>(new Set());

    const addFading = useCallback((id: number) => {
        setFadingIds(prev => new Set(prev).add(id));
    }, []);

    // schedule auto-fade for each new toast
    useEffect(() => {
        toasts.forEach(toast => {
            if (scheduledRef.current.has(toast.id)) return;
            scheduledRef.current.add(toast.id);
            const id = toast.id;
            setTimeout(() => addFading(id), VISIBLE_DURATION);
        });
    }, [toasts, addFading]);

    const handleDismiss = useCallback((id: number) => {
        setFadingIds(prev => new Set(prev).add(id));
        setTimeout(() => {
            dismiss(id);
            setFadingIds(prev => { const n = new Set(prev); n.delete(id); return n; });
            scheduledRef.current.delete(id);
        }, FADE_DURATION);
    }, [dismiss]);

    if (!toasts.length) return null;

    return ReactDOM.createPortal(
        <div className="fixed top-3 right-4 z-[2000] flex flex-col gap-3 w-80">
            {toasts.map(toast => {
                const { icon, iconClass, borderColor, backgroundColor } = toastConfig[toast.type];
                const isFading = fadingIds.has(toast.id);
                return (
                    <div
                        key={toast.id}
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
                            <CustomToastToggle onDismiss={() => handleDismiss(toast.id)} />
                        </Toast>
                    </div>
                );
            })}
        </div>,
        document.body
    );
}
