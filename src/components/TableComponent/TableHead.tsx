import {RiExpandUpDownLine, RiArrowUpSLine, RiArrowDownSLine} from '@/components/IconComponent/Icons';
import type { TableColumn, SortDirection } from "@/models";
import CheckboxComponent from "@/components/FormComponents/CheckboxComponent";
import { useTranslation } from "react-i18next";

function TableHead<T>({
  columns,
  handleSort,
  selectable,
  allSelected,
  toggleAll,
  actions,
  sortKey     = null,
  sortDir     = null,
  reorderMode = false,
}: Readonly<{
  columns      : TableColumn<T>[];
  handleSort   : (key: string) => void;
  selectable   : boolean;
  allSelected  : boolean;
  toggleAll    : () => void;
  actions?     : any[];
  sortKey?     : string | null;
  sortDir?     : SortDirection;
  reorderMode? : boolean;
}>) {
  const { t } = useTranslation();

  return (
    <thead className="text-md text-secondary uppercase bg-surface border-b-2 border-main">
      <tr className={'min-h-12'}>
        {/* Drag handle column header */}
        {reorderMode && <th scope="col" className="w-6 px-2 py-3" />}

        {selectable && (
          <th scope="col" className="px-4 py-3">
            <CheckboxComponent
                name={'select-all'}
                checked={allSelected}
                onChange={(_checked, _name) => toggleAll()}
            />
          </th>
        )}

        {columns.map(col => {
          const isActive = col.sortable && sortKey === String(col.key);
          return (
            <th
              key={String(col.key)}
              scope="col"
              onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
              className={[
                'px-4 py-3',
                col.width ?? '',
                col.headerClass ?? '',
                col.sortable ? 'cursor-pointer select-none group text-primary' : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="inline-flex items-center gap-1 text-primary">
                {t(col.label)}
                {col.sortable && (
                  isActive
                    ? sortDir === 'asc'
                      ? <RiArrowUpSLine   className="w-3 h-3 text-link" />
                      : <RiArrowDownSLine className="w-3 h-3 text-link" />
                    : <RiExpandUpDownLine className="w-3 h-3 text-primary" />
                )}
              </span>
            </th>
          );
        })}

        {actions && actions.length > 0 && (
          <th scope="col" className="px-4 py-3 text-left">
          </th>
        )}
      </tr>
    </thead>
  );
}

export default TableHead;
