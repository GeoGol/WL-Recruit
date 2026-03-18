interface TableBodyProps<T> {
  data: T[];
  columns: any[];
  actions?: any[];
  selectable?: boolean;
  selectedKeys?: (string | number)[];
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  colCount: number;
  onRowClick?: (row: T) => void;
  onToggleRow?: (key: string | number) => void;
  rowKey: keyof T;
}

function TableBody<T extends Record<string, unknown>>({
  data,
  columns,
  actions,
  selectable,
  selectedKeys,
  striped,
  hoverable,
  loading,
  emptyMessage,
  colCount,
  onRowClick,
  onToggleRow,
  rowKey,
}: Readonly<TableBodyProps<T>>) {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={colCount} className="text-center py-4">Loading...</td>
        </tr>
      </tbody>
    );
  }
  if (!data.length) {
    return (
      <tbody>
        <tr>
          <td colSpan={colCount} className="text-center py-4">{emptyMessage ?? 'No data available.'}</td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {data.map((row, idx) => {
        const key = row[rowKey] as string | number;
        const isSelected = selectable && selectedKeys?.includes(key);
        return (
          <tr
            key={key}
            className={[
              striped && idx % 2 === 1 ? 'bg-gray-50 dark:bg-gray-700' : '',
              hoverable ? 'hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer' : '',
              isSelected ? 'bg-primary-50 dark:bg-primary-900' : '',
            ].filter(Boolean).join(' ')}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {selectable && (
              <td className="w-10 p-4">
                <input
                  type="checkbox"
                  checked={!!isSelected}
                  onChange={() => onToggleRow && onToggleRow(key)}
                  className="accent-primary-600"
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={String(col.key)} className={col.cellClass ?? ''}>
                {col.render ? col.render(row, idx) : String(row[col.key] ?? '')}
              </td>
            ))}
            {actions && actions.length > 0 && (
              <td className="px-4 py-3 text-right">
                {actions.map((action, actionIdx) => (
                  <button
                    key={action.label + actionIdx}
                    type="button"
                    className={`mx-1 ${action.variant ?? 'primary'}`}
                    disabled={action.disabled ? action.disabled(row) : false}
                    onClick={() => action.onClick(row)}
                  >
                    {action.icon && <span className="mr-1">{action.icon}</span>}
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
