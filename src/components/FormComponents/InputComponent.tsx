import { memo, useId } from 'react';
import {InputProps, InputSize, InputVariant} from "@/models";


// ─── Style maps ───────────────────────────────────────────────────────────────

const sizeClasses: Record<InputSize, { input: string; icon: number; addon: string; height: string }> = {
    sm: { input: 'p-2 text-sm',    icon: 14, addon: 'px-3 py-2 text-xs', height: 'h-8'  },
    md: { input: 'p-2.5 text-md',  icon: 16, addon: 'px-3 py-2.5 text-sm', height: 'h-9'  },
    lg: { input: 'p-2.5 text-lg',  icon: 18, addon: 'px-4 py-4 text-base', height: 'h-10' },
};

const variantClasses: Record<InputVariant, { input: string; helper: string }> = {
    default: {
        input:  'border-gray-300 bg-gray-50 text-primary placeholder-gray-400 focus:border-primary-600 focus:ring-primary-600',
        helper: 'text-primary',
    },
    success: {
        input:  'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500',
        helper: 'text-green-600',
    },
    error: {
        input:  'border-danger bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500',
        helper: 'text-danger',
    },
};

// ─── Component ────────────────────────────────────────────────────────────────

const InputComponent = memo<InputProps>(({
    id,
    name,
    value,
    defaultValue,
    placeholder,
    label,
    helperText,
    hint,
    type           = 'text',
    size           = 'md',
    variant        = 'default',
    className      = '',
    fullWidth      = false,
    leftIcon       : LeftIcon,
    rightIcon      : RightIcon,
    leftAddon,
    rightAddon,
    disabled       = false,
    readOnly       = false,
    required       = false,
    autoFocus      = false,
    autoComplete,
    form,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    step,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
}) => {
    const generatedId = useId();
    const inputId     = id ?? generatedId;
    const { input: sizeInput, icon: iconSize, addon: addonClass, height: heightClass } = sizeClasses[size];
    const { input: variantInput, helper: helperClass }            = variantClasses[variant];

    const hasLeftAddon  = Boolean(leftAddon);
    const hasRightAddon = Boolean(rightAddon);
    const hasLeftIcon   = Boolean(LeftIcon) && !hasLeftAddon;
    const hasRightIcon  = Boolean(RightIcon) && !hasRightAddon;

    const borderRadius = hasLeftAddon ? 'rounded-r-lg rounded-l-none'
                       : (hasRightAddon ? 'rounded-l-lg rounded-r-none' : 'rounded-lg');

    const inputClasses = [
        'block border focus:outline-none focus:ring-1 transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-50',
        borderRadius,
        hasLeftIcon   ? 'pl-10'  : '',
        hasRightIcon  ? 'pr-10'  : '',
        fullWidth     ? 'w-full' : '',
        heightClass,
        sizeInput,
        variantInput,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={fullWidth ? 'w-full' : ''}>

            {/* Label */}
            {label && (
                <div className="justify-start items-center gap-1 flex mb-2">
                    <label className="text-muted text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                        {label}
                    </label>
                    {required && <span className="ml-1 text-danger text-sm" aria-hidden="true">*</span>}
                </div>
            )}

            {/* Input wrapper (handles addons + icons) */}
            <div className="flex">

                {/* Left addon */}
                {hasLeftAddon && (
                    <span className={`inline-flex items-center border border-r-0 border-gray-300 bg-gray-200 text-primary rounded-l-lg ${addonClass}`}>
                        {leftAddon}
                    </span>
                )}

                <div className="relative flex-1">
                    {/* Left icon */}
                    {hasLeftIcon && LeftIcon && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <LeftIcon size={iconSize} className="text-muted" aria-hidden="true" />
                        </div>
                    )}

                    <input
                        id={inputId}
                        name={name}
                        type={type}
                        value={value}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        autoFocus={autoFocus}
                        autoComplete={autoComplete}
                        form={form}
                        min={min}
                        max={max}
                        minLength={minLength}
                        maxLength={maxLength}
                        pattern={pattern}
                        step={step}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        className={inputClasses}
                        aria-invalid={variant === 'error'}
                        aria-describedby={helperText ? `${inputId}-helper` : undefined}
                    />

                    {/* Right icon */}
                    {hasRightIcon && RightIcon && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <RightIcon size={iconSize} className="text-muted" aria-hidden="true" />
                        </div>
                    )}
                </div>

                {/* Right addon */}
                {hasRightAddon && (
                    <span className={`inline-flex items-center border border-l-0 border-gray-300 bg-gray-200 text-primary rounded-r-lg ${addonClass}`}>
                        {rightAddon}
                    </span>
                )}
            </div>

            {/* Helper / error text */}
            {helperText && (
                <p id={`${inputId}-helper`} className={`mt-2 text-xs ${helperClass}`}>
                    {helperText}
                </p>
            )}

            {/* Hint — always gray, independent of variant */}
            {hint && (
                <p className="mt-2 text-xs text-muted">
                    {hint}
                </p>
            )}
        </div>
    );
});

InputComponent.displayName = 'InputComponent';

export default InputComponent;

