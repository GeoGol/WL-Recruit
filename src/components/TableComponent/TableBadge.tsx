import { memo } from 'react';
import { BadgeColor, badgeColorMap } from '@/models';

interface TableBadgeProps {
    label : string;
    color?: BadgeColor;
}

export const TableBadge = memo(({ label, color = 'gray' }: TableBadgeProps) => (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeColorMap[color]}`}>
        {label}
    </span>
));
TableBadge.displayName = 'TableBadge';

