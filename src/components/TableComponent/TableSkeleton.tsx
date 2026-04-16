import { memo } from 'react';

interface TableSkeletonProps {
    colCount  : number;
    rowCount? : number;
    hasActions?: boolean;
}

const TableSkeleton = memo(({ colCount, rowCount = 5, hasActions = false }: Readonly<TableSkeletonProps>) => {
    const totalCols = colCount + (hasActions ? 1 : 0);

    return (
        <table className="w-full text-sm text-left text-primary">

            {/* Skeleton head */}
            <thead className="bg-surface border-b-2 border-main">
                <tr className={'min-h-12'}>
                    {Array.from({ length: totalCols }).map((_, i) => (
                        <th key={i} scope="col" className="px-4 py-3 h-12">
                            <div className="h-5 w-1/2 bg-light-gray-focus rounded animate-pulse" />
                        </th>
                    ))}
                </tr>
            </thead>

            {/* Skeleton body */}
            <tbody>
                {Array.from({ length: rowCount }).map((_, rowIdx) => (
                    <tr key={rowIdx} className={'[&:not(:last-child)]:border-b [&:not(:last-child)]:border-main group'}>
                        {Array.from({ length: colCount+1 }).map((_, colIdx) => (
                            <td key={colIdx} className="px-4 py-3 h-[52px]">
                                <div className="h-5 w-full bg-light-gray rounded animate-pulse" />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table>
    );
});

TableSkeleton.displayName = 'TableSkeleton';

export default TableSkeleton;

