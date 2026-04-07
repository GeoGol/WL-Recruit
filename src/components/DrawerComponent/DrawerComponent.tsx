import { memo, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { RiCloseLine } from '@/components/IconComponent/Icons';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import {DrawerProps} from "@/models";

// ─── Size map (width for left/right, height for top/bottom) ──────────────────

const sizeMap = {
    horizontal: { sm: 'md:w-64', md: 'md:w-80', lg: 'md:w-96', xl: 'md:w-[480px]', full: 'md:w-full' },
    vertical  : { sm: 'h-48', md: 'h-64', lg: 'h-96', xl: 'h-[480px]', full: 'h-full' },
};

// ─── Translate classes per placement ─────────────────────────────────────────

const placementClasses: Record<NonNullable<DrawerProps['placement']>, {
    base    : string;
    open    : string;
    closed  : string;
}> = {
    right : { base: 'top-0 right-0 h-full',  open: 'translate-x-0',    closed: 'translate-x-full'  },
    left  : { base: 'top-0 left-0 h-full',   open: 'translate-x-0',    closed: '-translate-x-full' },
    top   : { base: 'top-0 left-0 w-full',   open: 'translate-y-0',    closed: '-translate-y-full' },
    bottom: { base: 'bottom-0 left-0 w-full',open: 'translate-y-0',    closed: 'translate-y-full'  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const DrawerComponent = memo(({
    isOpen,
    onClose,
    title,
    children,
    footer,
    actions,
    placement       = 'right',
    size            = 'md',
    closable        = true,
    closeOnBackdrop = true,
    className       = '',
}: DrawerProps) => {

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

    const isHorizontal = placement === 'left' || placement === 'right';
    const sizeClass    = isHorizontal ? sizeMap.horizontal[size] : sizeMap.vertical[size];
    const { base, open, closed } = placementClasses[placement];

    return ReactDOM.createPortal(
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[1000] bg-gray-900/50 transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={closeOnBackdrop && closable ? onClose : undefined}
                aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
                className={`fixed z-[1001] flex flex-col bg-surface shadow-xl
                    transition-transform duration-300 ease-in-out
                    ${base} w-full ${sizeClass}
                    ${isOpen ? open : closed}
                    ${className}`}
                aria-labelledby={title ? 'drawer-title' : undefined}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-main shrink-0">
                    {title && (
                        <h3 id="drawer-title" className="text-xl md:text-2xl font-bold text-primary ">
                            {title}
                        </h3>
                    )}
                    {closable && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-auto text-muted hover:text-primary hover:bg-primary rounded-lg transition-colors"
                            aria-label="Close"
                        >
                            <RiCloseLine size={20} />
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>

                {/* Footer */}
                {(footer || actions?.length) && (
                    <div className="flex items-center justify-end gap-3 p-4 border-t border-main shrink-0">
                        {footer ?? actions?.map((action, idx) => (
                            <ButtonComponent
                                key={action.label + idx}
                                type={action.type ?? 'button'}
                                form={action.form}
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
        </>,
        document.body
    );
});

DrawerComponent.displayName = 'DrawerComponent';

export default DrawerComponent;

