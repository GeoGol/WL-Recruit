import {ReactNode, SelectHTMLAttributes} from "react";
import {RemixiconComponentType} from "@/components/IconComponent/Icons";

export type InputSize    = 'sm' | 'md' | 'lg';
export type InputType    = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
export type InputVariant = 'default' | 'success' | 'error';

export interface SearchBarProps {
    placeholder?: string;
    sizing?: 'sm' | 'md' | 'lg';
    icon?: string;
    color?: 'gray' | 'info' | 'failure' | 'warning' | 'success';
    debounceMs?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    maxWidth?: string;
    className?: string;
    onSearch?: (value: string) => void;
    onChange?: (value: string) => void;
}

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface SelectComponentProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size'> {
    options: SelectOption[];
    value: string | number;
    onChange: (value: string | number | undefined) => void;
    placeholder?: string;
    isSearchable?: boolean;
    label?: string;
    size?: InputSize;
    // name?: string;
    disabled?: boolean;
    removeSelectedValue?: boolean;
    className?: string;
    wrapperClassName?: string;
    hint?: string;
    // error?: string;
}

export interface InputProps {
    // Content
    id?             : string;
    name?           : string;
    value?          : string | number;
    defaultValue?   : string | number;
    placeholder?    : string;
    label?          : string;
    helperText?     : string;   // shown in variant color (error/success/gray)
    hint?           : string;   // always shown in gray, below helperText

    // Appearance
    type?           : InputType;
    size?           : InputSize;
    variant?        : InputVariant;
    className?      : string;
    fullWidth?      : boolean;

    // Icons / addons
    leftIcon?       : RemixiconComponentType;
    rightIcon?      : RemixiconComponentType;
    leftAddon?      : string;
    rightAddon?     : string;

    // States
    disabled?       : boolean;
    readOnly?       : boolean;
    required?       : boolean;
    autoFocus?      : boolean;
    autoComplete?   : string;

    // Form
    form?           : string;
    min?            : number | string;
    max?            : number | string;
    minLength?      : number;
    maxLength?      : number;
    pattern?        : string;
    step?           : number | string;

    // Events
    onChange?       : (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?         : (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?        : (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?      : (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?        : (e: React.KeyboardEvent<HTMLInputElement>) => void;
}


export interface TooltipComponentProps {
    content: ReactNode;
    children: ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
    delay?: number;
}


export interface CheckboxComponentProps{
    label?: string;
    name: string;
    id?: string;
    size?: InputSize;
    checked: boolean;
    onChange?: (checked: boolean, name: string) => void;
    className?: string;
    wrapperClass?: string;
    disabled?: boolean;
}