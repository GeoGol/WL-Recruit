import { memo, useState, useRef } from 'react';
import type { RemixiconComponentType } from '@/components/IconComponent/Icons';
import { RiSearchLine, RiCloseLine } from '@/components/IconComponent/Icons';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';

interface SearchBarProps {
    placeholder?: string;
    sizing?: 'sm' | 'md' | 'lg';
    icon?: RemixiconComponentType;
    debounceMs?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    maxWidth?: string;
    className?: string;
    onSearch?: (value: string) => void;
    onChange?: (value: string) => void;
}

const sizingClasses = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-sm',
    lg: 'py-2.5 text-base',
};

const SearchBar = memo<SearchBarProps>(
    ({
        placeholder = 'Search...',
        sizing = 'md',
        icon: Icon = RiSearchLine,
        debounceMs = 300,
        disabled = false,
        fullWidth = false,
        maxWidth = 'max-w-md',
        className = '',
        onSearch,
        onChange,
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

        return (
            <div className={`relative ${fullWidth ? 'w-full' : maxWidth} ${className}`}>
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <Icon size={16} className="h-4 w-4 text-muted" />
                </div>
                <input
                    type="search"
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`w-full rounded-lg border border-main pl-9 pr-9 text-primary focus:border-light-gray-focus focus:outline-none focus:ring-1 focus:ring-light-gray-focus disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:appearance-none ${sizingClasses[sizing]}`}
                />
                {value && (
                    <ButtonComponent
                        variant="ghost"
                        size="sm"
                        aria-label="Clear search"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 !p-0 pr-3 z-10 rounded-none"
                        leftIcon={<RiCloseLine className="h-4 w-4 mr-2 text-gray-400 hover:text-gray-600" />}
                    />
                )}
            </div>
        );
    }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
