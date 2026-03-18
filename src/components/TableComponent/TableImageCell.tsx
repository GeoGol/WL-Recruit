import { memo } from 'react';

interface TableImageCellProps {
    src?     : string;
    alt?     : string;
    name     : string;
    subtitle?: string;
}

export const TableImageCell = memo(({ src, alt, name, subtitle }: TableImageCellProps) => (
    <div className="flex items-center gap-3">
        {src && (
            <img
                src={src}
                alt={alt ?? name}
                className="w-10 h-10 rounded-lg object-cover border border-main dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex-shrink-0"
            />
        )}
        <div className="min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white truncate">{name}</p>
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{subtitle}</p>}
        </div>
    </div>
));
TableImageCell.displayName = 'TableImageCell';

