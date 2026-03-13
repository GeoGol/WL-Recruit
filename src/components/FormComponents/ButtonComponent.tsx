import { memo } from 'react';
import type { RemixiconComponentType } from '@/components/IconComponent/Icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'confirmation' | 'ghost' | 'danger' | 'link';
export type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType    = 'button' | 'submit' | 'reset';

interface ButtonProps {
    // Content
    label?          : string;
    name?           : string;
    value?          : string;

    // Appearance
    variant?        : ButtonVariant;
    size?           : ButtonSize;
    className?      : string;
    fullWidth?      : boolean;
    pill?           : boolean;

    // Icons
    leftIcon?       : RemixiconComponentType;
    rightIcon?      : RemixiconComponentType;

    // States
    disabled?       : boolean;
    loading?        : boolean;
    autoFocus?      : boolean;

    // Behaviour
    type?           : ButtonType;
    onClick?        : (e: React.MouseEvent<HTMLButtonElement>) => void;

    // Form association
    form?           : string;
    formAction?     : string;
    formMethod?     : 'get' | 'post';
    formEncType?    : string;
    formNoValidate? : boolean;
    formTarget?     : string;
}

// ─── Style maps ───────────────────────────────────────────────────────────────
// w-full rounded-lg border border-main bg-white pl-9 pr-9 text-primary focus:border-light-gray-focus focus:outline-none focus:ring-1 focus:ring-light-gray-focus disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-white [&::-webkit-search-cancel-button]:appearance-none py-2.5 text-base
const variantClasses: Record<ButtonVariant, string> = {
    primary:        'bg-primary text-primary hover:bg-base focus:ring-light-gray-focus',
    secondary:      'bg-secondary text-primary hover:bg-light-gray-focus hover:text-inverse focus:ring-light-gray-focus',
    outline:        'bg-transparent text-primary border border-primary hover:bg-primary focus:ring-light-gray',
    confirmation:   'bg-blue-700 text-inverse hover:bg-blue-800 focus:ring-blue-300',
    ghost:          'bg-white hover:bg-gray-50 hover:border-slate-200 click:bg-slate-200',
    danger:         'bg-danger text-inverse hover:bg-danger-bg border border-transparent focus:ring-danger',
    link:           'bg-transparent text-link underline hover:text-link-dark border border-transparent focus:!ring-0 focus:ring-offset-0',
};

const sizeClasses: Record<ButtonSize, string> = {
    xs: 'px-2 py-1 text-xs gap-1',
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-5 py-2.5 text-md gap-2',
    xl: 'px-6 py-3 text-lg gap-2.5',
};

const iconSizeMap: Record<ButtonSize, number> = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size}
        fill="currentColor"
        className="animate-spin"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z" />
    </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

const ButtonComponent = memo<ButtonProps>(({
    label,
    name,
    value,
    variant        = 'primary',
    size           = 'md',
    className      = '',
    fullWidth      = false,
    pill           = false,
    leftIcon       : LeftIcon,
    rightIcon      : RightIcon,
    disabled       = false,
    loading        = false,
    autoFocus      = false,
    type           = 'button',
    onClick,
    form,
    formAction,
    formMethod,
    formEncType,
    formNoValidate,
    formTarget,
}) => {
    const isDisabled = disabled || loading;
    const iconSize   = iconSizeMap[size];

    const baseClasses = [
        'inline-flex items-center justify-center font-medium',
        'focus:outline-none focus:ring-1 focus:ring-offset-1',
        'transition-colors duration-150',
        pill ? 'rounded-full' : 'rounded-lg',
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            name={name}
            value={value}
            disabled={isDisabled}
            autoFocus={autoFocus}
            onClick={onClick}
            className={baseClasses}
            aria-busy={loading}
            form={form}
            formAction={formAction}
            formMethod={formMethod}
            formEncType={formEncType}
            formNoValidate={formNoValidate}
            formTarget={formTarget}
        >
            {!loading && LeftIcon && <LeftIcon size={iconSize} aria-hidden="true" />}
            {label && <span>{label}</span>}
            {!loading && RightIcon && <RightIcon size={iconSize} aria-hidden="true" />}
            {loading && <Spinner size={iconSize} />}
        </button>
    );
});

ButtonComponent.displayName = 'ButtonComponent';

export default ButtonComponent;
