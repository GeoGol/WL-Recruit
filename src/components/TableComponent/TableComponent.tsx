import { memo, useState, useMemo, useCallback, type ReactNode } from 'react';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import {
    RiArrowDownSLine,
    RiArrowUpSLine,
    RiExpandUpDownLine,
    RiCheckboxLine,
    RiCheckboxBlankLine,
} from '@/components/IconComponent/Icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T> {
    key         : keyof T | string;
    label       : string;
    render?     : (row: T, index: number) => ReactNode;
    sortable?   : boolean;
    headerClass?: string;
    cellClass?  : string;
    width?      : string;
}

export interface TableAction<T> {
    label     : string;
    icon?     : ReactNode;
    onClick   : (row: T) => void;
    variant?  : 'primary' | 'secondary' | 'outline' | 'confirmation' | 'ghost' | 'danger' | 'link';
    disabled? : (row: T) => boolean;
}

export interface PaginationConfig {
    page             : number;
    pageSize         : number;
    total            : number;
    onPageChange     : (page: number) => void;
    pageSizeOptions? : number[];
    onPageSizeChange?: (size: number) => void;
}

export interface TableProps<T> {
    data              : T[];
    columns           : TableColumn<T>[];
    rowKey            : keyof T;
    actions?          : TableAction<T>[];
    selectable?       : boolean;
    selectedKeys?     : (string | number)[];
    onSelectionChange?: (keys: (string | number)[]) => void;
    pagination?       : PaginationConfig;
    clientSort?       : boolean;
    loading?          : boolean;
    emptyMessage?     : string;
    className?        : string;
    striped?          : boolean;
    hoverable?        : boolean;
    onRowClick?       : (row: T) => void;
    /** Optional toolbar slot rendered above the table */
    toolbar?          : ReactNode;
    /** Table caption / title shown in the top-left of the card */
    title?            : string;
    /** Subtitle shown below the title */
    subtitle?         : string;
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

const SortIcon = memo(({ direction }: { direction: SortDirection }) => {
    if (direction === 'asc')  return <RiArrowUpSLine     size={14} />;
    if (direction === 'desc') return <RiArrowDownSLine   size={14} />;
    return                           <RiExpandUpDownLine size={14} className="opacity-40" />;
});
SortIcon.displayName = 'SortIcon';

// ─── Skeleton row ─────────────────────────────────────────────────────────────

const SkeletonRow = memo(({ cols }: { cols: number }) => (
    <tr className="animate-pulse border-b border-gray-200 dark:border-gray-700">
        {Array.from({ length: cols }).map((_, i) => (
            <td key={i} className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-3/4" />
            </td>
        ))}
    </tr>
));
SkeletonRow.displayName = 'SkeletonRow';

// ─── Pagination ───────────────────────────────────────────────────────────────

const Pagination = memo(({ config }: { config: PaginationConfig }) => {
    const { page, pageSize, total, onPageChange, pageSizeOptions, onPageSizeChange } = config;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to   = Math.min(page * pageSize, total);

    const pages = useMemo(() => {
        const delta = 1;
        const range: (number | '...')[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
                range.push(i);
            } else if (range[range.length - 1] !== '...') {
                range.push('...');
            }
        }
        return range;
    }, [page, totalPages]);

    return (
        <nav
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 border-t border-gray-200 dark:border-gray-700"
            aria-label="Table navigation"
        >
            {/* Left: showing x-y of total */}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{from}–{to}</span>
                {' '}of{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{total}</span>
            </span>

            <div className="inline-flex items-center gap-1.5">
                {/* Page size */}
                {pageSizeOptions && onPageSizeChange && (
                    <select
                        value={pageSize}
                        onChange={e => onPageSizeChange(Number(e.target.value))}
                        className="text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        {pageSizeOptions.map(s => (
                            <option key={s} value={s}>{s} / page</option>
                        ))}
                    </select>
                )}

                {/* Prev */}
                <button
                    type="button"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Previous
                </button>

                {/* Pages */}
                {pages.map((p, i) =>
                    p === '...'
                        ? <span key={`e-${i}`} className="px-1 text-sm text-gray-400 select-none">…</span>
                        : <button
                            key={p}
                            type="button"
                            onClick={() => onPageChange(p as number)}
                            className={[
                                'flex items-center justify-center px-3 h-8 text-sm border rounded-lg',
                                p === page
                                    ? 'text-primary-600 border-primary-300 bg-primary-50 hover:bg-primary-100 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                            ].join(' ')}
                          >
                            {p}
                          </button>
                )}

                {/* Next */}
                <button
                    type="button"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Next
                </button>
            </div>
        </nav>
    );
});
Pagination.displayName = 'Pagination';

// ─── Action cell ─────────────────────────────────────────────────────────────

interface ActionCellProps<T> {
    row     : T;
    actions : TableAction<T>[];
}

function ActionCell<T>({ row, actions }: ActionCellProps<T>) {
    return (
        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-end gap-2">
                {actions.map((action, i) => (
                    <ButtonComponent
                        key={i}
                        variant={action.variant ?? 'link'}
                        size="xs"
                        label={action.icon ? undefined : action.label}
                        aria-label={action.label}
                        leftIcon={action.icon}
                        disabled={action.disabled?.(row)}
                        onClick={() => action.onClick(row)}
                    />
                ))}
            </div>
        </td>
    );
}

// ─── Table row ────────────────────────────────────────────────────────────────

interface TableRowProps<T> {
    row          : T;
    rowIndex     : number;
    columns      : TableColumn<T>[];
    actions?     : TableAction<T>[];
    selectable   : boolean;
    isSelected   : boolean;
    striped      : boolean;
    hoverable    : boolean;
    onRowClick?  : (row: T) => void;
    onToggleRow  : (key: string | number) => void;
    rowKey       : keyof T;
}

function TableRow<T extends Record<string, unknown>>({
    row, rowIndex, columns, actions, selectable,
    isSelected, striped, hoverable, onRowClick, onToggleRow, rowKey,
}: TableRowProps<T>) {
    const key = row[rowKey] as string | number;

    const rowClass = [
        'border-b dark:border-gray-700 transition-colors duration-100',
        striped && rowIndex % 2 !== 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900',
        hoverable  ? 'hover:bg-gray-50 dark:hover:bg-gray-600' : '',
        isSelected ? '!bg-primary-50 dark:!bg-primary-900/20' : '',
        onRowClick ? 'cursor-pointer' : '',
    ].filter(Boolean).join(' ');

    return (
        <tr key={key} onClick={onRowClick ? () => onRowClick(row) : undefined} className={rowClass}>

            {selectable && (
                <td className="w-10 p-4" onClick={e => e.stopPropagation()}>
                    <button
                        type="button"
                        onClick={() => onToggleRow(key)}
                        aria-label="Select row"
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        {isSelected
                            ? <RiCheckboxLine      size={18} className="text-primary-600" />
                            : <RiCheckboxBlankLine size={18} />
                        }
                    </button>
                </td>
            )}

            {columns.map(col => (
                <td key={String(col.key)} className={`px-4 py-3 ${col.cellClass ?? ''}`}>
                    {col.render ? col.render(row, rowIndex) : String(row[col.key as keyof T] ?? '')}
                </td>
            ))}

            {actions && actions.length > 0 && <ActionCell row={row} actions={actions} />}
        </tr>
    );
}

// ─── Table body ───────────────────────────────────────────────────────────────

interface TableBodyProps<T> {
    data         : T[];
    columns      : TableColumn<T>[];
    actions?     : TableAction<T>[];
    selectable   : boolean;
    selectedKeys : (string | number)[];
    striped      : boolean;
    hoverable    : boolean;
    loading      : boolean;
    emptyMessage : string;
    colCount     : number;
    onRowClick?  : (row: T) => void;
    onToggleRow  : (key: string | number) => void;
    rowKey       : keyof T;
}

function TableBody<T extends Record<string, unknown>>({
    data, columns, actions, selectable, selectedKeys,
    striped, hoverable, loading, emptyMessage, colCount,
    onRowClick, onToggleRow, rowKey,
}: TableBodyProps<T>) {
    if (loading) {
        return (
            <tbody>
                {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={colCount} />)}
            </tbody>
        );
    }

    if (data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={colCount} className="px-4 py-12 text-center text-sm text-gray-400 dark:text-gray-500">
                        {emptyMessage}
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {data.map((row, rowIndex) => (
                <TableRow
                    key={String(row[rowKey])}
                    row={row}
                    rowIndex={rowIndex}
                    columns={columns}
                    actions={actions}
                    selectable={selectable}
                    isSelected={selectedKeys.includes(row[rowKey] as string | number)}
                    striped={striped}
                    hoverable={hoverable}
                    onRowClick={onRowClick}
                    onToggleRow={onToggleRow}
                    rowKey={rowKey}
                />
            ))}
        </tbody>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

function TableComponent<T extends Record<string, unknown>>({
    data,
    columns,
    rowKey,
    actions,
    selectable        = false,
    selectedKeys      = [],
    onSelectionChange,
    pagination,
    clientSort        = true,
    loading           = false,
    emptyMessage      = 'No data available.',
    className         = '',
    striped           = false,
    hoverable         = true,
    onRowClick,
    toolbar,
    title,
    subtitle,
}: TableProps<T>) {

    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<SortDirection>(null);

    // ── Sorting ──────────────────────────────────────────────────────────────
    const handleSort = useCallback((key: string) => {
        if (sortKey !== key) {
            setSortKey(key);
            setSortDir('asc');
        } else if (sortDir === 'asc') {
            setSortDir('desc');
        } else {
            setSortKey(null);
            setSortDir(null);
        }
    }, [sortKey, sortDir]);

    const sortedData = useMemo(() => {
        if (!clientSort || !sortKey || !sortDir) return data;
        return [...data].sort((a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];
            const cmp = av === bv ? 0 : (av ?? '') < (bv ?? '') ? -1 : 1;
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [data, clientSort, sortKey, sortDir]);

    // ── Selection ─────────────────────────────────────────────────────────────
    const allSelected  = data.length > 0 && data.every(row => selectedKeys.includes(row[rowKey] as string | number));
    const someSelected = !allSelected && data.some(row => selectedKeys.includes(row[rowKey] as string | number));

    const toggleAll = useCallback(() => {
        if (!onSelectionChange) return;
        if (allSelected) {
            onSelectionChange(selectedKeys.filter(k => !data.some(row => row[rowKey] === k)));
        } else {
            const newKeys = data.map(row => row[rowKey] as string | number);
            onSelectionChange([...new Set([...selectedKeys, ...newKeys])]);
        }
    }, [allSelected, data, onSelectionChange, rowKey, selectedKeys]);

    const toggleRow = useCallback((key: string | number) => {
        if (!onSelectionChange) return;
        onSelectionChange(
            selectedKeys.includes(key)
                ? selectedKeys.filter(k => k !== key)
                : [...selectedKeys, key]
        );
    }, [onSelectionChange, selectedKeys]);

    const colCount = columns.length + (selectable ? 1 : 0) + (actions?.length ? 1 : 0);

    const headerCheckboxIcon = allSelected
        ? <RiCheckboxLine      size={18} className="text-primary-600" />
        : someSelected
        ? <RiCheckboxLine      size={18} className="text-primary-300" />
        : <RiCheckboxBlankLine size={18} />;

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className={`w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>

            {/* ── Card header: title + toolbar ─────────────────────────── */}
            {(title || toolbar) && (
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                    {title && (
                        <div>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h5>
                            {subtitle && <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
                        </div>
                    )}
                    {toolbar && <div className="flex items-center gap-2 w-full md:w-auto">{toolbar}</div>}
                </div>
            )}

            {/* ── Table ────────────────────────────────────────────────── */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                    {/* Head */}
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
                                        col.width      ?? '',
                                        col.headerClass ?? '',
                                        col.sortable ? 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-600' : '',
                                    ].filter(Boolean).join(' ')}
                                >
                                    <span className="inline-flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && (
                                            <SortIcon direction={sortKey === String(col.key) ? sortDir : null} />
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

                    {/* Body */}
                    <TableBody
                        data={sortedData}
                        columns={columns}
                        actions={actions}
                        selectable={selectable}
                        selectedKeys={selectedKeys}
                        striped={striped}
                        hoverable={hoverable}
                        loading={loading}
                        emptyMessage={emptyMessage}
                        colCount={colCount}
                        onRowClick={onRowClick}
                        onToggleRow={toggleRow}
                        rowKey={rowKey}
                    />
                </table>
            </div>

            {/* ── Pagination ───────────────────────────────────────────── */}
            {pagination && <Pagination config={pagination} />}
        </div>
    );
}

export default memo(TableComponent) as typeof TableComponent;

// ─── Reusable cell helpers (Flowbite advanced table style) ────────────────────

/** Coloured badge for status/category cells */
export type BadgeColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'indigo' | 'purple' | 'pink';

const badgeColorMap: Record<BadgeColor, string> = {
    gray:   'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    blue:   'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    green:  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    red:    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    pink:   'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
};

interface TableBadgeProps {
    label : string;
    color?: BadgeColor;
}

export const TableBadge = memo(({ label, color = 'gray' }: TableBadgeProps) => (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeColorMap[color]}`}>
        {label}
    </span>
));
TableBadge.displayName = 'TableBadge';

/** Image + name cell — matches Flowbite product table style */
interface TableImageCellProps {
    src?     : string;
    alt?     : string;
    name     : string;
    subtitle?: string;
}

export const TableImageCell = memo(({ src, alt, name, subtitle }: TableImageCellProps) => (
    <div className="flex items-center gap-3">
        {src && (
            <img
                src={src}
                alt={alt ?? name}
                className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex-shrink-0"
            />
        )}
        <div className="min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white truncate">{name}</p>
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{subtitle}</p>}
        </div>
    </div>
));
TableImageCell.displayName = 'TableImageCell';

