import { memo } from 'react';

interface TableSkeletonRowProps {
  colCount: number;
  rowCount?: number;
  className?: string;
}

const TableSkeletonRow = memo(({ colCount, rowCount = 1, className = '' }: Readonly<TableSkeletonRowProps>) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <tr key={rowIdx} className={className}>
          {Array.from({ length: colCount }).map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
});

export default TableSkeletonRow;

