import { memo, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { RiMoreLine } from '@/components/IconComponent/Icons';
import {TableActionCellProps} from "@/models";

function TableActionCell<T extends Record<string, unknown>>({ row, actions }: Readonly<TableActionCellProps<T>>) {
    const [open, setOpen]   = useState(false);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const triggerRef        = useRef<HTMLDivElement>(null);
    const dropdownRef       = useRef<HTMLDivElement>(null);

    const calculateStyle = () => {
        if (!triggerRef.current) return;
        const rect       = triggerRef.current.getBoundingClientRect();
        const dropH      = actions.length * 40;
        const spaceBelow = window.innerHeight - rect.bottom;
        const openUpward = spaceBelow < dropH;
        setStyle({
            position: 'fixed',
            width   : 120,
            left    : rect.right - 120,
            zIndex  : 9999,
            ...(openUpward
                ? { bottom: window.innerHeight - rect.top }
                : { top: rect.bottom + 4 }),
        });
    };

    // Click outside
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (
                !triggerRef.current?.contains(e.target as Node) &&
                !dropdownRef.current?.contains(e.target as Node)
            ) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    if (!actions || actions.length === 0) return null;

    // // Single action — render directly
    // if (actions.length === 1) {
    //     const action = actions[0];
    //     return (
    //         <ButtonComponent
    //             variant={action.variant ?? 'ghost'}
    //             size="xs"
    //             leftIcon={action.icon}
    //             label={action.label}
    //             disabled={action.disabled?.(row)}
    //             onClick={() => action.onClick(row)}
    //         />
    //     );
    // }

    // Multiple actions — dropdown
    return (
        <div ref={triggerRef} className="inline-block">
            <ButtonComponent
                variant="ghost"
                size="xs"
                leftIcon={<RiMoreLine size={16} />}
                onClick={() => { calculateStyle(); setOpen(p => !p); }}
                aria-label="Actions"
                className={'!px-0'}
            />

            {open && ReactDOM.createPortal(
                <div
                    ref={dropdownRef}
                    style={style}
                    className="bg-surface border border-main rounded-lg shadow-lg overflow-hidden"
                >
                    {actions.map((action, idx) => (
                        <button
                            key={action.label + idx}
                            type="button"
                            disabled={action.disabled?.(row) ?? false}
                            onClick={() => { action.onClick(row); setOpen(false); }}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-base text-left
                                transition-colors
                                disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:font-semibold
                                ${action.variant === 'danger' ? 'text-danger' : 'text-primary'}
                            `}
                        >
                            {action.icon && <span className="w-4 h-4 flex items-center">{action.icon}</span>}
                            {action.label}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}

export default memo(TableActionCell) as typeof TableActionCell;
