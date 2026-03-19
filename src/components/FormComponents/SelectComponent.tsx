import {memo, useEffect, useRef, useState, useMemo, KeyboardEvent} from 'react';
import {SelectComponentProps, SelectOption} from "@/models";
import {RiArrowDownSLine, RiCloseLine, RiInformationLine} from "@/components/IconComponent/Icons";
import TooltipComponent from "@/components/FormComponents/TooltipComponent";

const SelectComponent = memo(({
    options,
    value,
    onChange,
    placeholder = "Select...",
    isSearchable = false,
    label,
    // name,
    disabled = false,
    removeSelectedValue = false,
    wrapperClassName = '',
    className = '',
    hint,
    // error,
  // ...rest
}: SelectComponentProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedOption, setSelectedOption] = useState<SelectOption>();
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const initialOption = options.find((option) => option.value === value) || undefined;
        setSelectedOption(initialOption);
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option: SelectOption | undefined) => {
        setSelectedOption(option);
        onChange(option?.value ?? undefined);
        setIsOpen(false);
        setSearch("");
    };

    const toggleDropdown = () => {
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
                <span className="text-gray-500 text-sm line-clamp-1">
                  {selectedOption.label ?? placeholder}
                </span>
            </TooltipComponent>
        );
    }
    else {
        selectedDisplay = (
            <span className="text-primary text-sm line-clamp-1">
                {selectedOption?.label ?? placeholder}
            </span>
        );
    }

    // RemoveSelectedValue: prevent dropdown from closing when clicking clear
    const handleRemoveSelected = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleSelect(undefined);
    };

    return (
        <div className={`relative min-w-12 ${wrapperClassName ?? "w-full"}`} ref={dropdownRef} tabIndex={0} onKeyDown={handleKeyDown}>
            {label && (
                <div className="justify-between items-center gap-1 flex mb-1">
                    <div className="text-muted text-sm font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                        {label}
                    </div>
                    {hint &&
                        <TooltipComponent content={<p>{hint}</p>}>
                            <RiInformationLine className="text-muted w-4 h-4 cursor-pointer" />
                        </TooltipComponent>
                    }
                </div>
            )}
            <div
                className={`w-full p-2 pr-6 bg-surface border border-main rounded-lg justify-between items-center gap-2 flex cursor-pointer h-8 
                ${isOpen && !disabled ? "!border-secondary" : ""} ${disabled ? "cursor-not-allowed" : ""} ${className}`}
                onClick={toggleDropdown}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                tabIndex={0}
            >
                {isSearchable ? (
                    <input
                        type="text"
                        ref={inputRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent text-primary text-sm border-none p-0"
                        placeholder={selectedOption?.label ?? placeholder}
                        onClick={handleInputClick}
                    />
                ) : selectedDisplay}

                {removeSelectedValue && selectedOption && (
                    <div className="absolute right-4 flex gap-1 items-center px-2 text-gray-500">
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

            {isOpen && !disabled && (
                <ul
                    className={'absolute z-10 bg-surface border-blue rounded-b-sm shadow-lg mt-1 w-full max-h-40 overflow-y-scroll'}
                    role="listbox"
                >
                    {filteredOptions?.map((option, idx) => (
                        <li
                            key={option.value}
                            className={`flex items-center justify-between p-2 text-primary text-sm cursor-pointer hover:bg-blue-100 dark:hover:text-gray-500 text-left ${highlightedIndex === idx ? 'bg-blue-100' : ''}`}
                            onClick={() => handleSelect(option)}
                            onMouseEnter={() => setHighlightedIndex(idx)}
                            role="option"
                            aria-selected={selectedOption?.value === option.value}
                            tabIndex={-1}
                        >
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );


});

SelectComponent.displayName = 'SelectComponent';

export default SelectComponent;

// inline-flex items-center justify-center font-medium  rounded-lg  bg-transparent text-primary border border-main hover:bg-primary focus:ring-light-gray p-2 text-sm gap-1.5