import type {ButtonVariant} from "@/components/FormComponents/ButtonComponent";
import type {ReactNode} from "react";

export interface DrawerAction {
    label    : string;
    variant? : ButtonVariant;
    onClick  : () => void;
    loading? : boolean;
    disabled?: boolean;
    form?    : string;
    type?    : 'button' | 'submit' | 'reset';
}

export interface DrawerProps {
    isOpen          : boolean;
    onClose         : () => void;
    title?          : string;
    children?       : ReactNode;
    footer?         : ReactNode;
    actions?        : DrawerAction[];
    placement?      : 'left' | 'right' | 'top' | 'bottom';
    size?           : 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closable?       : boolean;
    closeOnBackdrop?: boolean;
    className?      : string;
}