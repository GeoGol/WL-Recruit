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
