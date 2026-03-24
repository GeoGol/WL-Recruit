import React, { memo } from "react";
import {NavigationItem} from "@/models/NavigationModel";

interface DropdownMenuProps {
    items: NavigationItem[];
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = memo(
    ({ items, isOpen, onMouseEnter, onMouseLeave }) => {
        if (!isOpen) return null;

        return (
            <div
                className="absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-main bg-white shadow-lg"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                role="menu"
            >
                <ul className="py-2">
                    {items.map((child) => (
                        <li key={child.id} role="menuitem">
                            <a
                                href={child.link ?? "#"}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                            >
                                {/*{child.icon && (*/}
                                {/*    <i className={`${child.icon} text-base text-gray-400`} aria-hidden="true" />*/}
                                {/*)}*/}
                                {child.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
);

DropdownMenu.displayName = "DropdownMenu";
export default DropdownMenu;
