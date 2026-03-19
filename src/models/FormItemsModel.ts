import {ReactNode, SelectHTMLAttributes} from "react";

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

export interface SelectComponentProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    options: SelectOption[];
    value: string | number;
    onChange: (value: string | number | undefined) => void;
    placeholder?: string;
    isSearchable?: boolean;
    label?: string;
    // name?: string;
    disabled?: boolean;
    removeSelectedValue?: boolean;
    className?: string;
    wrapperClassName?: string;
    hint?: string;
    // error?: string;
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
    checked: boolean;
    onChange?: (checked: boolean, name: string) => void;
    className?: string;
    wrapperClass?: string;
    disabled?: boolean;
}