import { memo, useId } from 'react';
import {InputSize, RadioComponentProps, RadioItemProps} from '@/models';

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<InputSize, { label: string; helper: string; dot: string; ring: string }> = {
    sm: { label: 'text-sm',  helper: 'text-sm',  dot: 'w-2.5 h-2.5', ring: 'w-4 h-4'   },
    md: { label: 'text-md',  helper: 'text-base',  dot: 'w-3 h-3',     ring: 'w-5 h-5'   },
    lg: { label: 'text-lg',  helper: 'text-md',  dot: 'w-4 h-4', ring: 'w-6 h-6'},
};

const RadioItem = memo(({ option, name, checked, disabled, bordered, size, onChange, baseId }: RadioItemProps) => {
    const id         = `${baseId}-${option.value}`;
    const isDisabled = disabled || !!option.disabled;
    const sc         = sizeClasses[size];

    return (
        <label
            htmlFor={id}
            className={[
                'flex items-start items-center gap-3 cursor-pointer select-none',
                bordered
                    ? `w-full px-4 py-3 rounded-lg border transition-colors ${
                        checked
                            ? 'border-primary-700 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`
                    : '',
                isDisabled ? 'opacity-50 cursor-not-allowed' : '',
            ].filter(Boolean).join(' ')}
        >
            {/* Hidden native input */}
            <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                disabled={isDisabled}
                onChange={() => !isDisabled && onChange(option.value)}
                className="sr-only"
            />

            {/* Custom radio ring */}
            <div className={`shrink-0 ${sc.ring} rounded-full border-2 flex items-center justify-center transition-colors
                ${checked
                    ? 'border-primary-700 bg-white'
                    : 'border-gray-400 bg-white hover:border-gray-500'}
                ${isDisabled ? 'border-gray-300' : ''}
            `}>
                {/* Inner dot */}
                <div className={`${sc.dot} rounded-full transition-all duration-150
                    ${checked ? 'bg-quaternary scale-100' : 'scale-0 bg-transparent'}
                `} />
            </div>

            {/* Label + helper */}
            <div className="flex flex-col justify-center items-center min-w-0">
                <span className={`font-medium text-primary leading-tight ${sc.label}`}>
                    {option.label}
                </span>
                {option.helper && (
                    <span className={`text-muted mt-0.5 ${sc.helper}`}>
                        {option.helper}
                    </span>
                )}
            </div>
        </label>
    );
});
RadioItem.displayName = 'RadioItem';

// ─── Radio group ──────────────────────────────────────────────────────────────

const RadioComponent = memo(({
    name,
    options,
    value,
    onChange,
    label,
    helperText,
    layout     = 'vertical',
    size       = 'md',
    disabled   = false,
    bordered   = false,
    className  = '',
}: RadioComponentProps) => {
    const baseId = useId();

    return (
        <div className={`flex flex-col ${className}`}>

            {/* Group label */}
            {label && (
                <div className="justify-start items-center gap-1 flex mb-2">
                    <label className="text-muted text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                        {label}
                    </label>
                </div>
            )}

            {/* Options */}
            <div className={[
                'flex',
                layout === 'horizontal'
                    ? 'flex-row flex-wrap gap-x-6 gap-y-2'
                    : 'flex-col gap-2',
            ].join(' ')}>
                {options.map(option => (
                    <RadioItem
                        key={option.value}
                        option={option}
                        name={name}
                        checked={value === option.value}
                        disabled={disabled}
                        bordered={bordered}
                        size={size}
                        onChange={onChange}
                        baseId={baseId}
                    />
                ))}
            </div>

            {/* Group helper text */}
            {helperText && (
                <p className= {`${sizeClasses[size].helper} text-muted mt-0.5`}>{helperText}</p>
            )}
        </div>
    );
});

RadioComponent.displayName = 'RadioComponent';

export default RadioComponent;