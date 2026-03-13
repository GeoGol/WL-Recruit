import React, { memo } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import {NavigationItem} from "@/models/NavigationModel";

interface NavDropdownItemProps {
    item: NavigationItem;
}

const NavDropdownItem: React.FC<NavDropdownItemProps> = memo(({ item }) => {
    return (
        <Dropdown
            label=""
            dismissOnClick={true}
            renderTrigger={() => (
                <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {item.icon && <i className={`${item.icon} text-base`} aria-hidden="true" />}
                    {item.label}
                    <i className="ri-arrow-down-s-line text-sm" aria-hidden="true" />
                </button>
            )}
        >
            {item.children!.map((child) => (
                <DropdownItem
                    key={child.id}
                    as="a"
                    href={child.link ?? "#"}
                    icon={() =>
                        child.icon ? (
                            <i className={`${child.icon} mr-2 text-base text-gray-400`} aria-hidden="true" />
                        ) : null
                    }
                >
                    {child.label}
                </DropdownItem>
            ))}
        </Dropdown>
    );
});

NavDropdownItem.displayName = "NavDropdownItem";
export default NavDropdownItem;
