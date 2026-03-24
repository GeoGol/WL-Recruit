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
                className="w-10 h-10 rounded-lg object-cover border border-main bg-gray-100 flex-shrink-0"
            />
        )}
        <div className="min-w-0">
            <p className="font-semibold text-primary truncate">{name}</p>
            {subtitle && <p className="text-sm text-muted truncate">{subtitle}</p>}
        </div>
    </div>
));
TableImageCell.displayName = 'TableImageCell';

