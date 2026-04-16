import { memo } from 'react';
import type { ReactNode } from 'react';
import type { RemixiconComponentType } from '@/components/IconComponent/Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'main' | 'outline' | 'confirmation' | 'ghost' | 'danger' | 'link';
export type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType    = 'button' | 'submit' | 'reset';
export type ButtonIcon    = RemixiconComponentType | ReactNode;

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

    // Icons — accepts a Remixicon component OR any pre-rendered ReactNode
    leftIcon?       : ButtonIcon;
    rightIcon?      : ButtonIcon;

    // States
    disabled?       : boolean;
    loading?        : boolean;
    autoFocus?      : boolean;

    // Behaviour
    type?           : ButtonType;
    onClick?        : (e: React.MouseEvent<HTMLButtonElement>) => void;

    // Accessibility
    role?               : string;
    'aria-expanded'?    : boolean | 'true' | 'false';
    'aria-haspopup'?    : boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
    'aria-label'?       : string;
    'aria-controls'?    : string;
    'aria-pressed'?     : boolean | 'true' | 'false' | 'mixed';

    // Form association
    form?           : string;
    formAction?     : string;
    formMethod?     : 'get' | 'post';
    formEncType?    : string;
    formNoValidate? : boolean;
    formTarget?     : string;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:        'bg-primary text-primary hover:bg-base focus:ring-light-gray-focus',
    secondary:      'min-w-28 bg-secondary text-primary hover:bg-light-gray-focus hover:text-inverse focus:ring-light-gray-focus',
    main:           'min-w-28 bg-surface text-primary border border-main hover:bg-tertiary focus:ring-light-gray',
    outline:        'min-w-28 bg-transparent text-primary border border-main hover:bg-primary focus:ring-light-gray',
    confirmation:   'min-w-28 bg-blue-700 text-inverse hover:bg-blue-800 focus:ring-primary-300',
    ghost:          'bg-white border border-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0',
    danger:         'min-w-28 bg-danger text-inverse hover:bg-danger-bg border border-transparent focus:ring-danger',
    link:           'min-w-28 bg-transparent text-link underline hover:text-link-dark border border-transparent focus:!ring-0 focus:ring-offset-0',
};

const sizeClasses: Record<ButtonSize, string> = {
    xs: 'px-2 py-1 text-xs gap-1',
    sm: 'p-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
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
    role,
    'aria-expanded'  : ariaExpanded,
    'aria-haspopup'  : ariaHaspopup,
    'aria-label'     : ariaLabel,
    'aria-controls'  : ariaControls,
    'aria-pressed'   : ariaPressed,
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
        'focus:outline-none',
        variant !== 'ghost' ? 'focus:ring-1 focus:ring-offset-1' : 'focus:ring-0 focus:ring-offset-0',
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
            role={role}
            aria-busy={loading}
            aria-expanded={ariaExpanded}
            aria-haspopup={ariaHaspopup}
            aria-label={ariaLabel}
            aria-controls={ariaControls}
            aria-pressed={ariaPressed}
            form={form}
            formAction={formAction}
            formMethod={formMethod}
            formEncType={formEncType}
            formNoValidate={formNoValidate}
            formTarget={formTarget}
        >
            {!loading && LeftIcon  && (typeof LeftIcon  === 'function' ? <LeftIcon  size={iconSize} aria-hidden="true" /> : LeftIcon)}
            {label && <span>{label}</span>}
            {!loading && RightIcon && (typeof RightIcon === 'function' ? <RightIcon size={iconSize} aria-hidden="true" /> : RightIcon)}
            {loading && <Spinner size={iconSize} />}
        </button>
    );
});

ButtonComponent.displayName = 'ButtonComponent';

export default ButtonComponent;
