import React from 'react';
import {TablePaginationProps} from "@/models";
import {t} from "i18next";
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine
} from "@/components/IconComponent/Icons";


const TablePagination: React.FC<TablePaginationProps> = ({ config }) => {
  const { page, pageSize, total, onPageChange, pageSizeOptions = [5, 10, 20, 50], onPageSizeChange } = config;
  const pageCount = Math.ceil(total / pageSize);

  if (pageCount <= 1) return null;

  return (
    <nav className="flex items-center justify-between p-3 border-t border-main" aria-label="Table navigation">
      <div className="flex gap-1 text-sm font-normal text-primary">
        <span className="font-semibold">{(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)}</span>
        {t('lblFrom')}
        <span className="font-semibold">{total}</span>
      </div>
      {onPageSizeChange && (
        <select
          className="ml-4 p-1 rounded border border-gray-300 text-sm bg-white"
          value={pageSize}
          onChange={e => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size} / page</option>
          ))}
        </select>
      )}
      <ul className="inline-flex items-center -space-x-px text-sm">
        <li>
          <button
              className = "block px-1.5 py-1 leading-tight text-gray-500 bg-surface border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              disabled={page === 1}
              onClick={() => onPageChange(1)}
              aria-label="Previous page"
          >
            <RiArrowLeftDoubleLine className = "w-3 h-3"/>
          </button>
        </li>
        <li>
          <button
              className = "block px-1.5 py-1 leading-tight text-gray-500 bg-surface border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous page"
          >
            <RiArrowLeftSLine className = "w-3 h-3"/>
          </button>
        </li>
        {Array.from({length: pageCount}).map((_, idx) => (
            <li key={idx}>
              <button
                  className={`block px-2 py-1 leading-tight border border-gray-300 bg-surface text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${page === idx + 1 ? 'font-semibold text-primary' : ''}`}
                  disabled={page === idx + 1}
                  onClick={() => onPageChange(idx + 1)}
                  aria-label={page === idx + 1 ? 'page' : undefined}
              >
                {String(idx + 1)}
              </button>
            </li>
        ))}
        <li>
          <button
              className = "block px-1.5 py-1 leading-tight text-gray-500 bg-surface border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              disabled={page === pageCount}
              onClick={() => onPageChange(page + 1)}
              aria-label="Next page"
          >
            <RiArrowRightSLine className = "w-3 h-3"/>
          </button>
        </li>
        <li>
          <button
              className = "block px-1.5 py-1 leading-tight text-gray-500 bg-surface border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              disabled={page === pageCount}
              onClick={() => onPageChange(pageCount)}
              aria-label="Next page"
          >
            <RiArrowRightDoubleLine className = "w-3 h-3"/>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TablePagination;
