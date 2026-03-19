import React from 'react';
import {TablePaginationProps} from "@/models";
import {t} from "i18next";
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine
} from "@/components/IconComponent/Icons";

// Moved outside component to avoid re-creation on every render
function getPaginationRange(page: number, pageCount: number): (number | string)[] {
  const totalNumbers = 5;
  if (pageCount <= totalNumbers) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const range: (number | string)[] = [];
  const leftSibling  = Math.max(page - 1, 2);
  const rightSibling = Math.min(page + 1, pageCount - 1);

  range.push(1);
  if (leftSibling > 2) range.push('...');
  for (let i = leftSibling; i <= rightSibling; i++) range.push(i);
  if (rightSibling < pageCount - 1) range.push('...');
  range.push(pageCount);
  return range;
}

const TablePagination: React.FC<TablePaginationProps> = ({ config }) => {
  const { page, pageSize, total, onPageChange } = config;
  const pageCount = Math.ceil(total / pageSize);

  // Guard: no data
  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to   = Math.min(page * pageSize, total);

  return (
    <nav className="flex items-center justify-between p-3 border-t border-main" aria-label="Table navigation">
      <div className="flex gap-1 text-sm font-normal text-primary">
        <span className="font-semibold">{from}-{to}</span>
        {t('lblFrom')}
        <span className="font-semibold">{total}</span>
      </div>

      {pageCount > 1 && (
        <ul className="inline-flex items-center -space-x-px text-sm">
          <li>
            <button
                className="block px-1.5 py-1 h-6 leading-tight text-gray-500 bg-surface border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                disabled={page === 1}
                onClick={() => onPageChange(1)}
                aria-label="First page"
            >
              <RiArrowLeftDoubleLine className="w-3 h-3"/>
            </button>
          </li>
          <li>
            <button
                className="block px-1.5 py-1 h-6 leading-tight text-gray-500 bg-surface border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                aria-label="Previous page"
            >
              <RiArrowLeftSLine className="w-3 h-3"/>
            </button>
          </li>

          {getPaginationRange(page, pageCount).map((item, idx) => (
            <li key={idx}>
              {typeof item === 'number' ? (
                <button
                  className={`block px-2 py-1 h-6 leading-tight border min-w-6 ${page === item ? 'font-semibold text-link bg-blue-50 border-blue-300' : 'border-gray-300 bg-surface text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                  disabled={page === item}
                  onClick={() => onPageChange(item)}
                  aria-current={page === item ? 'page' : undefined}
                >
                  {String(item)}
                </button>
              ) : (
                <span className="block px-2 py-1 h-6 leading-tight border min-w-6 border-gray-300 bg-surface text-gray-500 select-none text-center">
                  ...
                </span>
              )}
            </li>
          ))}

          <li>
            <button
                className="block px-1.5 py-1 h-6 leading-tight text-gray-500 bg-surface border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                disabled={page === pageCount}
                onClick={() => onPageChange(page + 1)}
                aria-label="Next page"
            >
              <RiArrowRightSLine className="w-3 h-3"/>
            </button>
          </li>
          <li>
            <button
                className="block px-1.5 py-1 h-6 leading-tight text-gray-500 bg-surface border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                disabled={page === pageCount}
                onClick={() => onPageChange(pageCount)}
                aria-label="Last page"
            >
              <RiArrowRightDoubleLine className="w-3 h-3"/>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default TablePagination;
