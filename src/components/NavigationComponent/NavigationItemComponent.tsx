import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { NavigationItem } from "@/models/NavigationModel";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import { RiArrowDownSLine } from "@/components/IconComponent/Icons";

interface NavDropdownItemProps {
    item: NavigationItem;
}

const NavDropdownItem: React.FC<NavDropdownItemProps> = memo(({ item }) => {
    const [open, setOpen] = useState(false);
    const ref             = useRef<HTMLDivElement>(null);

    const handleOutsideClick = useCallback((e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }, []);

    useEffect(() => {
        if (open) document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [open, handleOutsideClick]);

    return (
        <div ref={ref} className="relative">
            <ButtonComponent
                variant="ghost"
                size="sm"
                aria-haspopup="menu"
                aria-expanded={open}
                label={item.label}
                rightIcon={
                    <RiArrowDownSLine
                        className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                }
                className="rounded-lg"
                onClick={() => setOpen(prev => !prev)}
            />

            {open && (
                <ul
                    role="menu"
                    className="absolute left-0 top-full mt-1 z-50 min-w-40 bg-surface border border-main rounded-lg shadow-lg py-1"
                >
                    {item.children?.map(child => {
                        const Icon = child.icon;
                        return (
                            <li key={child.id} role="none">
                                <a
                                    href={child.link ?? '#'}
                                    role="menuitem"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-base text-primary hover:bg-secondary transition-colors"
                                >
                                    {Icon && <Icon size={16} className="text-muted shrink-0" aria-hidden="true" />}
                                    {child.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
});

NavDropdownItem.displayName = "NavDropdownItem";
export default NavDropdownItem;
