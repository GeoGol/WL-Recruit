import CheckboxComponent from "@/components/FormComponents/CheckboxComponent";
import TableActionCell from "@/components/TableComponent/TableActionCell";

// ─── TableBody ────────────────────────────────────────────────────────────────

interface TableBodyProps<T> {
    data         : T[];
    columns      : any[];
    actions?     : any[];
    selectable?  : boolean;
    selectedKeys?: (string | number)[];
    striped?     : boolean;
    hoverable?   : boolean;
    loading?     : boolean;
    emptyMessage?: string;
    colCount     : number;
    onRowClick?  : (row: T) => void;
    onToggleRow? : (key: string | number) => void;
    rowKey       : keyof T;
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
                    <td colSpan={colCount} className="text-center text-md text-primary py-4">
                        {emptyMessage ?? 'No data available.'}
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="text-base text-primary bg-surface">
            {data.map((row, idx) => {
                const key        = row[rowKey] as string | number;
                const isSelected = selectable && selectedKeys?.includes(key);

                return (
                    <tr
                        key={key}
                        className={[
                            '[&:not(:last-child)]:border-b [&:not(:last-child)]:border-main group',
                            striped && idx % 2 === 1 ? 'bg-gray-50' : '',
                            hoverable ? 'hover:bg-primary cursor-pointer' : '',
                            isSelected ? 'bg-primary-50' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                        {selectable && (
                            <td className="w-10 p-4">
                                <CheckboxComponent
                                    name={`select-item-${key}`}
                                    checked={!!isSelected}
                                    onChange={() => onToggleRow?.(key)}
                                />
                            </td>
                        )}

                        {columns.map((col) => (
                            <td key={String(col.key)} className={`px-4 py-3 ${col.cellClass ?? ''}`}>
                                {col.render ? col.render(row, idx) : String(row[col.key] ?? '')}
                            </td>
                        ))}

                        {actions && actions.length > 0 && (
                            <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                                <TableActionCell row={row} actions={actions} />
                            </td>
                        )}
                    </tr>
                );
            })}
        </tbody>
    );
}

export default TableBody;
