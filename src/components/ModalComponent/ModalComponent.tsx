import { memo, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { RiCloseLine } from '@/components/IconComponent/Icons';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import {ModalProps} from "@/models";


// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
    sm : 'max-w-sm',
    md : 'max-w-md',
    lg : 'max-w-lg',
    xl : 'max-w-xl',
    '2xl': 'max-w-2xl',
};

// ─── Component ────────────────────────────────────────────────────────────────

const ModalComponent = memo(({
    isOpen,
    onClose,
    title,
    children,
    footer,
    actions,
    size           = 'md',
    closable       = true,
    closeOnBackdrop = true,
    className      = '',
}: ModalProps) => {

    // Close on Escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && closable) onClose();
    }, [closable, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[1000] bg-gray-900/50"
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className="fixed inset-0 z-[1001] flex items-center justify-center sm:p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
                onClick={closeOnBackdrop && closable ? onClose : undefined}
            >
                <div
                    className={`relative w-full ${sizeClasses[size]} bg-surface shadow-xl flex flex-col
                        h-auto max-h-[90vh] rounded-lg
                        ${className}`}
                    onClick={e => e.stopPropagation()}
                >

                    {/* Header */}
                    {(title || closable) && (
                        <div className="flex items-center justify-between px-4 py-3 border-b border-main rounded-t-lg">
                            {title && (
                                <h3
                                    id="modal-title"
                                    className="text-lg font-semibold text-primary"
                                >
                                    {title}
                                </h3>
                            )}
                            {closable && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="ml-auto text-muted hover:text-primary hover:bg-primary rounded-lg p-1.5 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <RiCloseLine size={20} />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {children}
                    </div>

                    {/* Footer — custom or generated from actions */}
                    {(footer || actions?.length) && (
                        <div className="flex items-center justify-end gap-3 p-4 border-t border-main rounded-b-lg">
                            {footer ?? actions?.map((action, idx) => (
                                <ButtonComponent
                                    key={action.label + idx}
                                    type="button"
                                    variant={action.variant ?? 'primary'}
                                    label={action.label}
                                    loading={action.loading}
                                    disabled={action.disabled}
                                    onClick={action.onClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>,
        document.body
    );
});

ModalComponent.displayName = 'ModalComponent';

export default ModalComponent;

