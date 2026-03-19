import {RiExpandUpDownLine} from '@/components/IconComponent/Icons';
import type { TableColumn } from "@/models";
import CheckboxComponent from "@/components/FormComponents/CheckboxComponent";

function TableHead<T>({
  columns,
  handleSort,
  selectable,
  allSelected,
  toggleAll,
  actions,
}: Readonly<{
  columns: TableColumn<T>[];
  handleSort: (key: string) => void;
  selectable: boolean;
  allSelected: boolean;
  toggleAll: () => void;
  actions?: any[];
}>) {

  return (
    <thead className="text-sm text-secondary uppercase bg-surface">
      <tr>
        {selectable && (
          <th scope="col" className="px-4 py-3">
            <CheckboxComponent
                name={'select-all'}
                checked={allSelected}
                onChange={(_checked, _name) => toggleAll()}
            />
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
              col.sortable ? 'cursor-pointer select-none group hover:text-primary' : '',
            ].filter(Boolean).join(' ')}
          >
            <span className="inline-flex items-center gap-1 group-hover:text-primary">
              {col.label}
              {col.sortable && (
                  <RiExpandUpDownLine className={'w-3 h-3 text-secondary group-hover:text-primary'}/>
              )}
            </span>
          </th>
        ))}

        {actions && actions.length > 0 && (
          <th scope="col" className="px-4 py-3 text-left">
            {/*<span className="sr-only">Actions</span>*/}
            <span>Actions</span>
          </th>
        )}
      </tr>
    </thead>
  );
}

export default TableHead;
