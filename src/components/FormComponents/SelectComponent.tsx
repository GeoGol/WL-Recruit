import {memo, useEffect, useRef, useState, useMemo, KeyboardEvent} from 'react';
import ReactDOM from 'react-dom';
import {InputSize, SelectComponentProps, SelectOption} from "@/models";
import {RiArrowDownSLine, RiCloseLine, RiInformationLine} from "@/components/IconComponent/Icons";
import TooltipComponent from "@/components/FormComponents/TooltipComponent";
import {useTranslation} from "react-i18next";

const sizeClasses: Record<InputSize, { padding: string; font: string; height: string; }> = {
    sm: { padding: 'p-2.5',   font: 'text-sm', height: 'h-8'  },
    md: { padding: 'p-2.5',   font: 'text-md', height: 'h-9'  },
    lg: { padding: 'p-2.5',   font: 'text-lg', height: 'h-10' },
};

const SelectComponent = memo(({
    options,
    value,
    onChange,
    placeholder = "Select...",
    isSearchable = false,
    label,
    size = 'md',
    disabled = false,
    removeSelectedValue = false,
    wrapperClassName = '',
    className = '',
    hint,
    // error,
  // ...rest
}: SelectComponentProps) => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [listStyle, setListStyle] = useState<React.CSSProperties>({});
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Derived — no local state, always in sync with parent value
    const selectedOption = useMemo(
        () => options.find((o) => o.value === value) ?? undefined,
        [options, value]
    );

    const DROPDOWN_MAX_HEIGHT = 160;

    const calculatePosition = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const openUpward = spaceBelow < DROPDOWN_MAX_HEIGHT;
        return {
            position: 'fixed' as const,
            width: rect.width,
            left: rect.left,
            ...(openUpward
                ? { bottom: window.innerHeight - rect.top + 4 }
                : { top: rect.bottom + 4 }),
            zIndex: 9999,
            maxHeight: DROPDOWN_MAX_HEIGHT,
        };
    };

    // Always-on: close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !listRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Only when open: recalculate position on scroll/resize
    useEffect(() => {
        if (!isOpen) return;
        const update = () => {
            const pos = calculatePosition();
            if (pos) setListStyle(pos);
        };
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update, true);
        };
    }, [isOpen]);

    const handleSelect = (option: SelectOption | undefined) => {
        onChange(option?.value ?? undefined);
        setIsOpen(false);
        setSearch("");
    };

    const toggleDropdown = () => {
        if (disabled) return;
        if (!isOpen) {
            const pos = calculatePosition();
            if (pos) setListStyle(pos);
        }
        setIsOpen((prev) => !prev);
        inputRef.current?.focus();
        setSearch("");
    };

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
        setSearch("");
    };

    // Filtering options (assume label is string for search)
    const filteredOptions = useMemo(() => {
        if (!isSearchable || !search) return options;
        return options.filter(option =>
            option.label?.toLowerCase?.().includes(search.toLowerCase())
        );
    }, [options, search, isSearchable]);

    // Keyboard navigation for dropdown
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) return;
        if (e.key === 'Escape') {
            setIsOpen(false);
            setSearch("");
        } else if (e.key === 'ArrowDown') {
            setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            handleSelect(filteredOptions[highlightedIndex]);
        }
    };

    // Extracted selected value display
    let selectedDisplay;
    if (selectedOption?.label && selectedOption.label.length > 50) {
        selectedDisplay = (
            <TooltipComponent content={selectedOption.label ?? placeholder}>
                <span className="text-muted text-sm line-clamp-1">
                  {t(selectedOption.label) ?? placeholder}
                </span>
            </TooltipComponent>
        );
    }
    else {
        selectedDisplay = (
            <span className={`${sizeClasses[size].font} ${selectedOption ? 'text-primary' : 'text-muted'} line-clamp-1`}>
                {selectedOption?.label ? t(selectedOption.label) : placeholder}
            </span>
        );
    }

    // RemoveSelectedValue: prevent dropdown from closing when clicking clear
    const handleRemoveSelected = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleSelect(undefined);
    };

    return (
        <div className={`relative min-w-12 ${wrapperClassName ?? "w-full"}`} ref={dropdownRef}>
            {/* ...existing label/hint code... */}
            {label && (
                <div className="justify-between items-center gap-1 flex mb-2">
                    <label className="text-muted text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                        {label}
                    </label>
                    {hint &&
                        <TooltipComponent content={<p>{hint}</p>}>
                            <RiInformationLine className="text-muted w-4 h-4 cursor-pointer" />
                        </TooltipComponent>
                    }
                </div>
            )}
            <div
                ref={triggerRef}
                className={`w-full ${sizeClasses[size].padding} pr-6 bg-gray-50 text-primary border border-gray-300 rounded-lg justify-between items-center gap-2 flex cursor-pointer ${sizeClasses[size].height} 
                    ${isOpen && !disabled ? "ring-1 border-primary-700 ring-primary-700" : ""} 
                    ${disabled ? "cursor-not-allowed opacity-50" : ""} 
                    ${className}`}
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
            >
                {isSearchable ? (
                    <input
                        type="text"
                        ref={inputRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`bg-transparent text-primary ${sizeClasses[size].font} border-none p-0`}
                        placeholder={selectedOption?.label ?? placeholder}
                        onClick={handleInputClick}
                    />
                ) : selectedDisplay}

                {removeSelectedValue && selectedOption && (
                    <div className="absolute right-4 flex gap-1 items-center px-2 text-muted">
                        <RiCloseLine
                            className="w-4 h-4 hover:text-gray-400"
                            onClick={handleRemoveSelected}
                        />
                        <span>|</span>
                    </div>
                )}

                <div className="absolute right-0 flex items-center px-1 text-gray-700">
                    <RiArrowDownSLine className="w-4 h-4 text-primary"/>
                </div>
            </div>

            {isOpen && !disabled && ReactDOM.createPortal(
                <ul
                    ref={listRef}
                    style={listStyle}
                    className="bg-surface border border-gray-200 rounded-sm shadow-lg overflow-y-auto"
                    role="listbox"
                >
                    {filteredOptions?.map((option, idx) => (
                        <li
                            key={option.value}
                            className={`flex items-center justify-between p-2 text-primary ${sizeClasses[size].font} cursor-pointer hover:bg-blue-100 text-left ${highlightedIndex === idx ? 'bg-blue-100' : ''}`}
                            onClick={() => handleSelect(option)}
                            onMouseEnter={() => setHighlightedIndex(idx)}
                            role="option"
                            aria-selected={selectedOption?.value === option.value}
                            tabIndex={-1}
                        >
                            <span>{option.label ? t(option.label) : ''}</span>
                        </li>
                    ))}
                </ul>,
                document.body
            )}
        </div>
    );


});

SelectComponent.displayName = 'SelectComponent';

export default SelectComponent;

