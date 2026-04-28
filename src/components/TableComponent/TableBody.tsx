import CheckboxComponent from "@/components/FormComponents/CheckboxComponent";
import TableActionCell from "@/components/TableComponent/TableActionCell";
import SortableRow from "@/components/TableComponent/SortableRow";
import {RiAddLine, RiFolderAddLine} from "@/components/IconComponent/Icons";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import {t} from "i18next";

// ─── TableBody ────────────────────────────────────────────────────────────────

interface TableBodyProps<T> {
    data              : T[];
    columns           : any[];
    actions?          : any[];
    selectable?       : boolean;
    selectedKeys?     : (string | number)[];
    striped?          : boolean;
    hoverable?        : boolean;
    loading?          : boolean;
    emptyMessage?     : string;
    colCount          : number;
    onRowClick?       : (row: T) => void;
    onToggleRow?      : (key: string | number) => void;
    rowKey            : keyof T;
    onAddNew?         : () => void;
    hideActions?      : (row: T) => boolean;
    reorderMode?      : boolean;
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
    onAddNew,
    hideActions,
    reorderMode = false,
}: Readonly<TableBodyProps<T>>) {
    if (loading) return null;

    if (data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={colCount} className="text-center text-md text-primary py-6">
                        {onAddNew ? (
                            <div className={'flex flex-col justify-center items-center gap-3 border-2 border-dashed rounded-lg border-main cursor-pointer p-5 mx-4'} onClick={onAddNew}>
                                <RiFolderAddLine className={'text-muted'} size={48}/>

                                <div className={'flex flex-col gap-1 text-md'}>
                                    <span className={'font-semibold text-primary'}>{t('msgNoRecords')}</span>
                                    <span className={'font-medium text-secondary'}>{t('msgCreateNewEntry')}</span>
                                </div>

                                <ButtonComponent
                                    type={'button'}
                                    variant={'confirmation'}
                                    label={t('lblNewEntry')}
                                    onClick={onAddNew}
                                    leftIcon={<RiAddLine size={18}/>}
                                />

                            </div>
                        ) : (
                            emptyMessage ?? 'No data available.'
                        )}

                    </td>
                </tr>
            </tbody>
        );
    }

    const rowCells = (row: T, idx: number) => (<>
        {selectable && (
            <td className="w-10 p-4">
                <CheckboxComponent
                    name={`select-item-${row[rowKey] as string}`}
                    checked={!!(selectable && selectedKeys?.includes(row[rowKey] as string | number))}
                    onChange={() => onToggleRow?.(row[rowKey] as string | number)}
                />
            </td>
        )}
        {columns.map((col) => (
            <td key={String(col.key)} className={`px-4 py-3 ${col.cellClass ?? ''}`}>
                {col.render ? t(col.render(row, idx)) : t(String(row[col.key] ?? ''))}
            </td>
        ))}
        {!!actions?.length && (() => {
            if (hideActions?.(row)) return <td />;
            const visible = actions.filter(a => !a.hidden?.(row));
            return visible.length > 0 ? (
                <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                    <TableActionCell row={row} actions={visible} />
                </td>
            ) : <td />;
        })()}
    </>);

    return (
        <tbody className="text-md text-primary bg-surface">
            {data.map((row, idx) => {
                const key        = row[rowKey] as string | number;
                const isSelected = selectable && selectedKeys?.includes(key);
                const trClass    = [
                    '[&:not(:last-child)]:border-b [&:not(:last-child)]:border-main group',
                    striped && idx % 2 === 1 ? 'bg-gray-50' : '',
                    hoverable ? 'hover:bg-primary cursor-pointer' : '',
                    isSelected ? 'bg-primary-50' : '',
                ].filter(Boolean).join(' ');

                if (reorderMode) {
                    return (
                        <SortableRow
                            key={key}
                            id={key}
                            className={trClass}
                            onClick={onRowClick ? () => onRowClick(row) : undefined}
                        >
                            {rowCells(row, idx)}
                        </SortableRow>
                    );
                }

                return (
                    <tr
                        key={key}
                        className={trClass}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                        {rowCells(row, idx)}
                    </tr>
                );
            })}
        </tbody>
    );
}

export default TableBody;
