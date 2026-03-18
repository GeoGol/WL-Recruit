import { memo, useState, useMemo, useCallback } from 'react';
import TablePagination from './TablePagination';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { SortDirection, TableProps} from "@/models";

// ─── Main component ───────────────────────────────────────────────────────────

function TableComponent<T extends Record<string, unknown>>({
    data,
    columns,
    rowKey,
    actions,
    selectable        = false,
    selectedKeys      = [],
    onSelectionChange,
    initialPage       = 1,
    initialPageSize   = 5,
    pageSizeOptions   = [5, 10, 20, 50],
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
}: Readonly<TableProps<T>>) {

    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<SortDirection>(null);
    // Add internal pagination state
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const total = data.length;

    const sortedData = useMemo(() => {
        if (!clientSort || !sortKey || !sortDir) return data;
        return [...data].sort((a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];
            if (av === bv) {
                return 0;
            } else if ((av ?? '') < (bv ?? '')) {
                return sortDir === 'asc' ? -1 : 1;
            } else {
                return sortDir === 'asc' ? 1 : -1;
            }
        });
    }, [data, clientSort, sortKey, sortDir]);

    // Slice data for current page
    const paginatedData = useMemo(() => {
        return sortedData.slice((page - 1) * pageSize, page * pageSize);
    }, [sortedData, page, pageSize]);

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


    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className={`w-full bg-surface rounded-lg border border-main ${className}`}>

            {/* ── Card header: title + toolbar ─────────────────────────── */}
            {(title || toolbar) && (
                <div className="flex max-md:flex-col items-start md:items-center justify-between gap-3 p-3 border-b border-main">
                    {title && (
                        <div>
                            <h5 className="font-semibold text-primary ">{title}</h5>
                            {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
                        </div>
                    )}
                    {toolbar && <div className="flex items-center gap-2 w-full md:w-auto">{toolbar}</div>}
                </div>
            )}

            {/* ── Table ────────────────────────────────────────────────── */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">

                    {/* Head */}
                    <TableHead
                        columns={columns}
                        handleSort={handleSort}
                        selectable={selectable}
                        allSelected={allSelected}
                        someSelected={someSelected}
                        toggleAll={toggleAll}
                        actions={actions}
                    />

                    {/* Body */}
                    <TableBody
                        data={paginatedData}
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
            <TablePagination config={{
                page,
                pageSize,
                total,
                onPageChange: setPage,
                pageSizeOptions,
                onPageSizeChange: (s: number) => { setPageSize(s); setPage(1); },
            }} />
        </div>
    );
}

export default memo(TableComponent) as typeof TableComponent;