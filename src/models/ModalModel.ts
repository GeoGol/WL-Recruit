import type {ButtonVariant} from "@/components/FormComponents/ButtonComponent";
import type {ReactNode} from "react";

export interface ModalAction {
    label    : string;
    variant? : ButtonVariant;
    onClick  : () => void;
    loading? : boolean;
    disabled?: boolean;
}

export interface ModalProps {
    isOpen         : boolean;
    onClose        : () => void;
    title?         : string;
    children?      : ReactNode;
    footer?        : ReactNode;
    actions?       : ModalAction[];
    size?          : 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closable?      : boolean;
    closeOnBackdrop?: boolean;
    className?     : string;
}