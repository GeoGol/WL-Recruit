import type {ButtonVariant} from "@/components/FormComponents/ButtonComponent";
import type {ReactNode} from "react";

export interface ModalAction {
    label    : string;
    variant? : ButtonVariant;
    onClick  : () => void;
    loading? : boolean;
    disabled?: boolean;
}

/** Built-in variant presets — used internally by ModalComponent */
// 'delete' | 'confirm' | 'cancel'

/**
 * Custom variant config – used when you pass a string other than the built-ins,
 * or when you want to override parts of a built-in variant.
 */
export interface ModalVariantConfig {
    /** Icon rendered in the header */
    icon?        : ReactNode;
    /** Extra CSS classes applied to the header row */
    headerClass? : string;
    /** Default footer actions rendered when neither `footer` nor `actions` are supplied */
    actions?     : ModalAction[];
}

export interface ModalProps {
    isOpen          : boolean;
    onClose         : () => void;
    title?          : string;
    icon?           : ReactNode;
    children?       : ReactNode;
    footer?         : ReactNode;
    actions?        : ModalAction[];
    size?           : 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closable?       : boolean;
    closeOnBackdrop?: boolean;
    className?      : string;
    /**
     * Preset variant OR a custom string key paired with `variantConfig`.
     * Built-ins: 'delete' | 'confirm' | 'cancel'
     */
    variant?        : string;
    /**
     * Config for a custom variant (or to override parts of a built-in one).
     * Ignored when `variant` is not set.
     */
    variantConfig?  : ModalVariantConfig;
    /** Confirm-button label override (used by built-in variants) */
    confirmLabel?   : string;
    /** Cancel-button label override (used by built-in variants) */
    cancelLabel?    : string;
    /** Called when the confirm action of a built-in variant is clicked */
    onConfirm?      : () => void;
}