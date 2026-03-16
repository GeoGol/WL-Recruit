import React, { memo } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import { NavigationItem } from "@/models/NavigationModel";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import { RiArrowDownSLine } from "@/components/IconComponent/Icons";

interface NavDropdownItemProps {
    item: NavigationItem;
}

const NavDropdownItem: React.FC<NavDropdownItemProps> = memo(({ item }) => {
    return (
        <Dropdown
            label=""
            dismissOnClick={true}
            renderTrigger={() => (
                <ButtonComponent
                    variant="ghost"
                    size="sm"
                    aria-haspopup="menu"
                    label={item.label}
                    rightIcon={<RiArrowDownSLine className="w-4 h-4" />}
                    className="rounded-lg"
                />
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
