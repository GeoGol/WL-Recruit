import CheckboxComponent from "@/components/FormComponents/CheckboxComponent";
import TableActionCell from "@/components/TableComponent/TableActionCell";
import {RiAddLine, RiFolderAddLine} from "@/components/IconComponent/Icons";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import {t} from "i18next";

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
    onAddNew?    : () => void;
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

    return (
        <tbody className="text-md text-primary bg-surface">
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

                        {!!actions?.length && (
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
