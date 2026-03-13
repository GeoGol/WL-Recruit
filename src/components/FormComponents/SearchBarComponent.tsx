import React, { useState, useMemo, useRef } from 'react';
import { TextInput } from 'flowbite-react';
import type { RemixiconComponentType } from '@remixicon/react';
import { RiSearchLine, RiCloseLine } from '@remixicon/react';

interface SearchBarProps {
    placeholder?: string;
    sizing?: 'sm' | 'md' | 'lg';
    icon?: RemixiconComponentType;
    color?: 'gray' | 'info' | 'failure' | 'warning' | 'success';
    debounceMs?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    maxWidth?: string;
    className?: string;
    onSearch?: (value: string) => void;
    onChange?: (value: string) => void;
    borderColor?: string;
}

const toFlowbiteIcon = (RemixIcon: RemixiconComponentType) => {
    const WrappedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
        <RemixIcon {...(props as any)} size={16} className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
    );
    return WrappedIcon;
};

const searchInputTheme = (sizing: 'sm' | 'md' | 'lg', borderColor: string ) => ({
    field: {
        icon: {
            base: `absolute inset-y-0 left-3 flex items-center pl-0 pointer-events-none`,
        },
        input: {
            sizes: {
                sm: `py-2 text-xs text-primary ${borderColor}`,
                md: `py-2 text-sm text-primary ${borderColor}`,
                lg: `py-2 text-base text-primary ${borderColor}`,
            },
            withIcon: {
                on: "pl-10 pr-3",
                off: "px-3",
            },
        },
    },
});


const SearchBar: React.FC<SearchBarProps> = ({
                                                 placeholder = 'Search...',
                                                 sizing = 'md',
                                                 icon: Icon = RiSearchLine,
                                                 color = 'gray',
                                                 debounceMs = 300,
                                                 disabled = false,
                                                 fullWidth = false,
                                                 maxWidth = 'max-w-md',
                                                 className = '',
                                                 onSearch,
                                                 onChange,
                                                 borderColor = 'border-main focus:ring-light-gray-focus focus:border-light-gray-focus',
                                             }) => {
    const [value, setValue] = useState<string>('');

    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
        if (onSearch) {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => onSearch(newValue), debounceMs);
        }
    };

    const handleClear = (): void => {
        setValue('');
        onChange?.('');
        onSearch?.('');
    };

    const FlowbiteIcon = useMemo(() => toFlowbiteIcon(Icon), [Icon]);

    return (
        <div className = {`relative ${fullWidth ? 'w-full' : maxWidth} ${className}`}>
            <TextInput
                type = "search"
                value = {value}
                onChange = {handleChange}
                disabled = {disabled}
                placeholder = {placeholder}
                sizing = {sizing}
                color = {color}
                icon = {FlowbiteIcon}
                className = "[&_input]:pr-10 [&::-webkit-search-cancel-button]:appearance-none"
                theme = {searchInputTheme(sizing, borderColor)}
            />

            {/* Clear button */}
            {value && (
                <button
                    type = "button"
                    onClick = {handleClear}
                    className = "absolute inset-y-0 right-0 flex items-center pr-3 z-10"
                >
                    <RiCloseLine className = "h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"/>
                </button>
            )}
        </div>
    );
};

export default SearchBar;
