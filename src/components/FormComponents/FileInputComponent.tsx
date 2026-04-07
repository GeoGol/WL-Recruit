import { memo, useId, useRef, useState, useEffect, DragEvent, ChangeEvent } from 'react';
import { FileInputComponentProps, InputSize, InputVariant } from '@/models';
import { RiCloseLine } from '@/components/IconComponent/Icons';

// ─── Style maps ───────────────────────────────────────────────────────────────

const sizeClasses: Record<InputSize, { text: string; subText: string; icon: number }> = {
    sm: { text: 'text-sm',  subText: 'text-xs',  icon: 24 },
    md: { text: 'text-sm',  subText: 'text-sm',  icon: 28 },
    lg: { text: 'text-base', subText: 'text-base', icon: 32 },
};

const variantClasses: Record<InputVariant, { border: string; helper: string }> = {
    default: {
        border: 'border-gray-300 hover:border-primary-700',
        helper: 'text-primary',
    },
    success: {
        border: 'border-green-500',
        helper: 'text-green-600',
    },
    error: {
        border: 'border-danger',
        helper: 'text-danger',
    },
};

// ─── Upload icon (inline SVG — no extra dep) ──────────────────────────────────

function UploadIcon({ size }: Readonly<{ size: number }>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M11 15V7.828l-2.586 2.586L7 9l5-5 5 5-1.414 1.414L13 7.828V15h-2zm-6 4h14v-6h2v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7h2v6z" />
        </svg>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

const FileInputComponent = memo<FileInputComponentProps>(({
    id,
    name,
    label,
    helperText,
    hint,
    accept,
    multiple    = false,
    maxSizeMB,
    disabled    = false,
    required    = false,
    size        = 'md',
    variant     = 'default',
    fullWidth   = false,
    className   = '',
    value,
    valueName,
    onChange,
}) => {
    const generatedId               = useId();
    const inputId                   = id ?? generatedId;
    const inputRef                  = useRef<HTMLInputElement>(null);
    const [dragging, setDragging]   = useState(false);
    const [files, setFiles]         = useState<File[]>([]);
    const [sizeError, setSizeError] = useState<string | null>(null);
    const [existingValue, setExistingValue] = useState<string | null>(value ?? null);

    // Keep existingValue in sync when the value prop changes externally
    useEffect(() => {
        setExistingValue(value ?? null);
    }, [value]);

    const isImageUrl = (url: string) => /\.(png|jpe?g|gif|svg|webp)$/i.test(url) || url.startsWith('data:image');

    const { text: textClass, subText, icon: iconSize } = sizeClasses[size];
    const { border: borderClass, helper: helperClass }  = variantClasses[variant];

    // ── Helpers ───────────────────────────────────────────────────────────────

    const validateAndEmit = (incoming: FileList | null) => {
        setSizeError(null);
        if (!incoming || incoming.length === 0) return;

        if (maxSizeMB) {
            const oversized = Array.from(incoming).find(f => f.size > maxSizeMB * 1024 * 1024);
            if (oversized) {
                setSizeError(`"${oversized.name}" exceeds the ${maxSizeMB} MB limit.`);
                return;
            }
        }

        const next = multiple
            ? [...files, ...Array.from(incoming)]
            : [incoming[0]];

        setFiles(next);

        const dt = new DataTransfer();
        next.forEach(f => dt.items.add(f));
        onChange?.(dt.files);
    };

    const removeFile = (index: number) => {
        const next = files.filter((_, i) => i !== index);
        setFiles(next);
        setSizeError(null);
        if (inputRef.current) inputRef.current.value = '';
        if (next.length === 0) {
            onChange?.(null);
        } else {
            const dt = new DataTransfer();
            next.forEach(f => dt.items.add(f));
            onChange?.(dt.files);
        }
    };

    const removeExisting = () => {
        setExistingValue(null);
        onChange?.(null);
    };

    // ── Drag handlers ─────────────────────────────────────────────────────────

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
    };

    const handleDragLeave = () => setDragging(false);

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
        if (disabled) return;
        validateAndEmit(e.dataTransfer.files);
    };

    // ── Input change ─────────────────────────────────────────────────────────

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        validateAndEmit(e.target.files);
    };

    // ─────────────────────────────────────────────────────────────────────────

    const activeError  = sizeError ?? (variant === 'error' ? helperText : null);
    const shownHelper  = sizeError ?? helperText;

    const paddingMap: Record<InputSize, string> = { sm: 'p-3', md: 'p-4', lg: 'p-6' };
    const paddingClass = paddingMap[size];

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className={`${fullWidth ? 'w-full' : 'w-fit'} ${className}`}>

            {/* Label */}
            {label && (
                <div className="justify-start items-center gap-1 flex mb-2">
                    <label className="text-muted text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                        {label}
                    </label>
                    {required && <span className="ml-1 text-danger text-sm" aria-hidden="true">*</span>}
                </div>
            )}

            {/* Drop zone */}
            <label
                htmlFor={inputId}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={[
                    'flex flex-col items-center justify-center w-full',
                    'border-2 border-dashed rounded-lg cursor-pointer',
                    'bg-gray-50 transition-colors duration-150',
                    dragging
                        ? 'border-primary-700 bg-primary-50'
                        : `${borderClass} hover:bg-gray-100`,
                    disabled
                        ? 'opacity-50 cursor-not-allowed pointer-events-none'
                        : '',
                    activeError ? 'border-danger' : '',
                    paddingClass,
                ].join(' ')}
            >
                <div className="flex flex-col items-center justify-center gap-2 text-center">

                    {/* Icon */}
                    <span className="text-gray-400">
                        <UploadIcon size={iconSize} />
                    </span>

                    <p className={`${textClass} font-semibold text-primary`}>
                        {'Click to upload '}
                        <span className="font-normal text-muted">or drag &amp; drop</span>
                    </p>
                    {accept && (
                        <p className={`${subText} text-muted`}>{accept.toUpperCase().replace(/,/g, ', ')}</p>
                    )}
                    {maxSizeMB && (
                        <p className={`${subText} text-muted`}>Max {maxSizeMB} MB</p>
                    )}
                </div>

                {/* Hidden native input */}
                <input
                    ref={inputRef}
                    id={inputId}
                    name={name}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    required={required}
                    className="hidden"
                    onChange={handleChange}
                />
            </label>

            {/* Existing value preview */}
            {existingValue && files.length === 0 && (
                <ul className="flex flex-col gap-1 mt-1">
                    <li className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-2 min-w-0">
                            {isImageUrl(existingValue) ? (
                                <img
                                    src={existingValue}
                                    alt="current"
                                    className="w-8 h-8 object-cover rounded shrink-0 border border-gray-200"
                                />
                            ) : (
                                <span className="text-blue-500 shrink-0">
                                    <UploadIcon size={16} />
                                </span>
                            )}
                            <span className={`${subText} text-primary font-medium truncate`}>
                                {valueName || existingValue.split('/').pop()}
                            </span>
                            {/*<span className={`${subText} text-muted shrink-0`}>(current)</span>*/}
                        </div>
                        <button
                            type="button"
                            onClick={removeExisting}
                            disabled={disabled}
                            className="shrink-0 text-muted hover:text-danger transition-colors"
                            aria-label="Remove current file"
                        >
                            <RiCloseLine size={16} />
                        </button>
                    </li>
                </ul>
            )}

            {/* Newly selected files list */}
            {files.length > 0 && (
                <ul className="flex flex-col gap-1 mt-1">
                    {files.map((file, i) => (
                        <li
                            key={`${file.name}-${i}`}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-8 h-8 object-cover rounded shrink-0 border border-gray-200"
                                    />
                                ) : (
                                    <span className="text-green-500 shrink-0">✓</span>
                                )}
                                <span className={`${subText} text-primary font-medium truncate`}>{file.name}</span>
                                <span className={`${subText} text-muted shrink-0`}>({formatSize(file.size)})</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="shrink-0 text-muted hover:text-danger transition-colors"
                                aria-label={`Remove ${file.name}`}
                            >
                                <RiCloseLine size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Helper / error text */}
            {shownHelper && (
                <p className={`text-xs ${sizeError ? 'text-danger' : helperClass}`}>
                    {shownHelper}
                </p>
            )}

            {/* Hint */}
            {hint && !shownHelper && (
                <p className="text-xs text-muted">{hint}</p>
            )}
        </div>
    );
});

FileInputComponent.displayName = 'FileInputComponent';

export default FileInputComponent;

