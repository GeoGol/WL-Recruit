import { RiCheckboxLine, RiCheckboxBlankLine } from '@/components/IconComponent/Icons';

interface TableHeadProps {
  columns: any[];
  handleSort: (key: string) => void;
  selectable: boolean;
  allSelected: boolean;
  someSelected: boolean;
  toggleAll: () => void;
  actions?: any[];
}

function TableHead({
  columns,
  handleSort,
  selectable,
  allSelected,
  someSelected,
  toggleAll,
  actions,
}: Readonly<Omit<TableHeadProps, 'sortKey' | 'sortDir'>>) {
  let headerCheckboxIcon;
  if (allSelected) {
    headerCheckboxIcon = <RiCheckboxLine size={18} className="text-primary-600" />;
  } else if (someSelected) {
    headerCheckboxIcon = <RiCheckboxLine size={18} className="text-primary-300" />;
  } else {
    headerCheckboxIcon = <RiCheckboxBlankLine size={18} />;
  }

  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {selectable && (
          <th scope="col" className="w-10 p-4">
            <button
              type="button"
              onClick={toggleAll}
              aria-label="Select all"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              {headerCheckboxIcon}
            </button>
          </th>
        )}
        {columns.map(col => (
          <th
            key={String(col.key)}
            scope="col"
            onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
            className={[
              'px-4 py-3',
              col.width ?? '',
              col.headerClass ?? '',
              col.sortable ? 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-600' : '',
            ].filter(Boolean).join(' ')}
          >
            <span className="inline-flex items-center gap-1">
              {col.label}
              {col.sortable && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </span>
          </th>
        ))}
        {actions && actions.length > 0 && (
          <th scope="col" className="px-4 py-3 text-right">
            <span className="sr-only">Actions</span>
          </th>
        )}
      </tr>
    </thead>
  );
}

export default TableHead;
