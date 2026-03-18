import { memo } from 'react';
import {TableAction} from "@/models";

interface TableActionCellProps<T> {
  actions: TableAction<T>[];
  row: T;
  compact?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

function TableActionCell<T>({ actions, row, compact = false, orientation = 'horizontal' }: Readonly<TableActionCellProps<T>>) {
  if (!actions || actions.length === 0) return null;
  return (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} gap-1`}>
      {actions.map((action, idx) => (
        <button
          key={action.label + idx}
          type="button"
          className={`inline-flex items-center ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'} ${action.variant ?? 'primary'} disabled:opacity-50`}
          disabled={action.disabled ? action.disabled(row) : false}
          onClick={() => action.onClick(row)}
          aria-label={action.label}
        >
          {action.icon && <span className={orientation === 'vertical' ? 'mb-1' : 'mr-1'}>{action.icon}</span>}
          {!compact && action.label}
        </button>
      ))}
    </div>
  );
}

export default memo(TableActionCell);

