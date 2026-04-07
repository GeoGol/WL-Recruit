import { memo, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { RiCloseLine, RiErrorWarningLine, RiCheckboxCircleLine, RiCloseCircleLine } from '@/components/IconComponent/Icons';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { ModalProps, ModalVariantConfig } from "@/models";


// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
    sm : 'max-w-sm',
    md : 'max-w-md',
    lg : 'max-w-lg',
    xl : 'max-w-xl',
    '2xl': 'max-w-2xl',
};

// ─── Built-in variant presets ─────────────────────────────────────────────────

type BuiltInResolver = (opts: {
    onClose    : () => void;
    onConfirm? : () => void;
    confirmLabel? : string;
    cancelLabel?  : string;
}) => ModalVariantConfig;

const BUILT_IN_VARIANTS: Record<string, BuiltInResolver> = {
    delete: ({ onClose, onConfirm, confirmLabel = 'Delete', cancelLabel = 'Cancel' }) => ({
        icon        : <RiErrorWarningLine size={32} className="text-danger" />,
        headerClass : 'bg-danger/10',
        actions     : [
            { label: cancelLabel, variant: 'main',   onClick: onClose },
            { label: confirmLabel, variant: 'danger', onClick: onConfirm ?? onClose },
        ],
    }),
    confirm: ({ onClose, onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }) => ({
        icon        : <RiCheckboxCircleLine size={32} className="text-success" />,
        headerClass : 'bg-success/10',
        actions     : [
            { label: cancelLabel,  variant: 'main',         onClick: onClose },
            { label: confirmLabel, variant: 'confirmation', onClick: onConfirm ?? onClose },
        ],
    }),
    cancel: ({ onClose, onConfirm, confirmLabel = 'Yes, cancel', cancelLabel = 'Go back' }) => ({
        icon        : <RiCloseCircleLine size={32} className="text-warning" />,
        headerClass : 'bg-warning/10',
        actions     : [
            { label: cancelLabel,  variant: 'main',    onClick: onClose },
            { label: confirmLabel, variant: 'outline', onClick: onConfirm ?? onClose },
        ],
    }),
};

// ─── Component ────────────────────────────────────────────────────────────────

const ModalComponent = memo(({
    isOpen,
    onClose,
    title,
    icon,
    children,
    footer,
    actions,
    size           = 'md',
    closable       = true,
    closeOnBackdrop = true,
    className      = '',
    variant,
    variantConfig,
    confirmLabel,
    cancelLabel,
    onConfirm,
}: ModalProps) => {

    // Resolve variant config (built-in or custom), then merge with explicit overrides
    const resolved = useMemo((): ModalVariantConfig => {
        if (!variant) return {};
        const builtIn = BUILT_IN_VARIANTS[variant];
        const base: ModalVariantConfig = builtIn
            ? builtIn({ onClose, onConfirm, confirmLabel, cancelLabel })
            : {};
        // variantConfig overrides (or fully replaces) the built-in
        return { ...base, ...variantConfig };
    }, [variant, variantConfig, onClose, onConfirm, confirmLabel, cancelLabel]);

    // Explicit icon / actions props take highest priority
    const resolvedIcon    = icon    ?? resolved.icon;
    const resolvedActions = actions ?? resolved.actions;
    const headerClass     = resolved.headerClass ?? '';

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
            {/* Backdrop — button so click-to-close is accessible */}
            {closeOnBackdrop && closable ? (
                <button
                    type="button"
                    aria-label="Close modal"
                    className="fixed inset-0 z-[1003] bg-gray-900/50 cursor-default w-full border-0 p-0"
                    onClick={onClose}
                />
            ) : (
                <div className="fixed inset-0 z-[1003] bg-gray-900/50" aria-hidden="true" />
            )}

            {/* Modal panel */}
            <div className="fixed inset-0 z-[1005] flex items-center justify-center sm:p-4 pointer-events-none">
                <dialog
                    open
                    className={`relative w-full ${sizeClasses[size]} bg-surface shadow-xl flex flex-col
                        h-auto max-h-[90vh] rounded-lg pointer-events-auto m-0 p-0 border-0
                        ${className}`}
                    aria-labelledby={title ? 'modal-title' : undefined}
                >

                    {/* Header */}
                    {(title || closable) && (
                        <div className={`relative flex items-center justify-center px-10 py-3 border-b border-main rounded-t-lg ${headerClass}`}>
                            <div className="flex items-center gap-3 min-w-0">
                                {resolvedIcon && (
                                    <span className="shrink-0 text-primary flex items-center">
                                        {resolvedIcon}
                                    </span>
                                )}
                                {title && (
                                    <h3
                                        id="modal-title"
                                        className="text-lg font-semibold text-primary truncate"
                                    >
                                        {title}
                                    </h3>
                                )}
                            </div>
                            {closable && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 shrink-0 text-muted hover:text-primary hover:bg-primary rounded-lg p-1.5 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <RiCloseLine size={20} />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-4 max-w-[80%] mx-auto text-center">
                        {children}
                    </div>

                    {/* Footer — explicit footer > actions prop > variant actions */}
                    {(footer || resolvedActions?.length) && (
                        <div className="flex items-center justify-center gap-3 p-4 rounded-b-lg">
                            {footer ?? resolvedActions?.map((action, idx) => (
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
                </dialog>
            </div>
        </>,
        document.body
    );
});

ModalComponent.displayName = 'ModalComponent';

export default ModalComponent;

