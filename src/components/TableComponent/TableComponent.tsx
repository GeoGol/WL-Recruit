import { memo, useState, useMemo, useCallback } from 'react';
import {
    DndContext, closestCenter, PointerSensor,
    useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import TablePagination from './TablePagination';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableSkeleton from './TableSkeleton';
import { SortDirection, TableProps} from "@/models";
import SelectComponent from "@/components/FormComponents/SelectComponent";

// ─── Smart comparator ────────────────────────────────────────────────────────
const DATE_REGEX = /^\d{1,2}\/\d{1,2}\/\d{4}/;

function smartCompare(a: unknown, b: unknown): number {
    // Both numbers
    if (typeof a === 'number' && typeof b === 'number') return a - b;

    const aStr = String(a ?? '');
    const bStr = String(b ?? '');

    // Both look like dates (MM/DD/YYYY ...)
    if (DATE_REGEX.test(aStr) && DATE_REGEX.test(bStr)) {
        const aTime = new Date(aStr).getTime();
        const bTime = new Date(bStr).getTime();
        if (!isNaN(aTime) && !isNaN(bTime)) return aTime - bTime;
    }

    // Fallback: locale string comparison (handles accents, case, etc.)
    return aStr.localeCompare(bStr, undefined, { numeric: true, sensitivity: 'base' });
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
    onAddNew,
    paginationMode    = 'client',
    serverPagination,
    hideActions,
    onRowReorder,
}: Readonly<TableProps<T>>) {

    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<SortDirection>(null);
    const [clientPage, setClientPage] = useState(initialPage);
    const [clientPageSize, setClientPageSize] = useState(initialPageSize);

    // ── DnD ───────────────────────────────────────────────────────────────────
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id || !onRowReorder) return;
        const oldIdx = data.findIndex(r => (r[rowKey] as string | number) === active.id);
        const newIdx = data.findIndex(r => (r[rowKey] as string | number) === over.id);
        if (oldIdx !== -1 && newIdx !== -1) onRowReorder(arrayMove([...data], oldIdx, newIdx));
    }, [data, rowKey, onRowReorder]);

    const isServerPagination = paginationMode === 'server' && !!serverPagination;

    const page = isServerPagination ? serverPagination.page : clientPage;
    const pageSize = isServerPagination ? serverPagination.pageSize : clientPageSize;
    const total = isServerPagination ? serverPagination.total : data.length;
    const canClientSort = clientSort && !isServerPagination;

    // ── Sorting data ─────────────────────────────────────────────────────────
    const sortedData = useMemo(() => {
        if (!canClientSort || !sortKey || !sortDir) return data;
        return [...data].sort((a, b) => {
            const result = smartCompare(a[sortKey], b[sortKey]);
            return sortDir === 'asc' ? result : -result;
        });
    }, [data, canClientSort, sortKey, sortDir]);

    // Slice data for current page
    const paginatedData = useMemo(() => {
        if (isServerPagination) return sortedData;
        return sortedData.slice((page - 1) * pageSize, page * pageSize);
    }, [isServerPagination, sortedData, page, pageSize]);

    // Effective sort state — server-controlled or local
    const activeSortKey = isServerPagination ? (serverPagination.sortKey ?? null) : sortKey;
    const activeSortDir = isServerPagination ? (serverPagination.sortDir ?? null) : sortDir;

    // ── Sorting ──────────────────────────────────────────────────────────────
    const handleSort = useCallback((key: string) => {
        if (isServerPagination) {
            if (!serverPagination.onSortChange) return;
            const nextDir: SortDirection =
                serverPagination.sortKey === key
                    ? serverPagination.sortDir === 'asc' ? 'desc' : 'asc'
                    : 'asc';
            // Reset to page 1 when sort changes
            serverPagination.onPageChange(1);
            serverPagination.onSortChange(key, nextDir);
            return;
        }
        if (!canClientSort) return;
        setClientPage(1);
        if (sortKey !== key) {
            setSortKey(key);
            setSortDir('asc');
        } else {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        }
    }, [isServerPagination, serverPagination, canClientSort, sortKey]);

    const handlePageChange = useCallback((nextPage: number) => {
        if (isServerPagination) {
            serverPagination.onPageChange(nextPage);
            return;
        }
        setClientPage(nextPage);
    }, [isServerPagination, serverPagination]);

    const handlePageSizeChange = useCallback((nextSize: number) => {
        if (isServerPagination) {
            serverPagination.onPageSizeChange?.(nextSize);
            return;
        }
        setClientPage(1);
        setClientPageSize(nextSize);
    }, [isServerPagination, serverPagination]);

    // ── Selection ─────────────────────────────────────────────────────────────
    const allSelected  = useMemo(
        () => data.length > 0 && data.every(row => selectedKeys.includes(row[rowKey] as string | number)),
        [data, selectedKeys, rowKey]
    );

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

    const colCount = columns.length + (selectable ? 1 : 0) + (actions?.length ? 1 : 0) + (onRowReorder ? 1 : 0);

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className={`w-full min-w-0 bg-surface rounded-lg ${className} border border-main`}>

            {/* ── title ────────────────────────── */}
            {(title || toolbar) && (
                <div className="flex max-md:flex-col items-start md:items-center justify-between gap-3 p-4 border-b border-main">
                    {title && (
                        <div>
                            <h5 className="text-xl md:text-2xl font-bold text-primary ">{title}</h5>
                            {subtitle && <p className="text-md text-muted">{subtitle}</p>}
                        </div>
                    )}
                </div>
            )}

            {/* ── toolbar ───────────────────────── */}
            {(toolbar) && (
                <div className="flex items-end max-sm:flex-wrap justify-between gap-3 p-4">
                    {toolbar}
                    <div className={'flex items-center max-sm:justify-end gap-1'}>
                        <SelectComponent
                            options={pageSizeOptions?.map(size => ({ label: `${size}`, value: size })) || []}
                            value={pageSize}
                            size={"sm"}
                            onChange={(value) => handlePageSizeChange(Number(value))}
                            className={''}
                        />

                        <span className={'text-sm text-muted'}>entries per page</span>
                    </div>
                </div>
            )}

            {/* ── Table ────────────────────────────────────────────────── */}
            <div className="overflow-x-auto">
                {loading ? (
                    <TableSkeleton
                        colCount={columns.length + (selectable ? 1 : 0)}
                        rowCount={5}
                        hasActions={!!actions?.length}
                    />
                ) : (
                    <>
                        {onRowReorder ? (
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext
                                    items={paginatedData.map(r => r[rowKey] as string | number)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <table className="w-full text-sm text-left text-primary">
                                        <TableHead columns={columns} handleSort={handleSort} selectable={selectable} allSelected={allSelected} toggleAll={toggleAll} actions={actions} sortKey={activeSortKey} sortDir={activeSortDir} reorderMode />
                                        <TableBody data={paginatedData} columns={columns} actions={actions} selectable={selectable} selectedKeys={selectedKeys} striped={striped} hoverable={hoverable} loading={loading} emptyMessage={emptyMessage} colCount={colCount} onRowClick={onRowClick} onToggleRow={toggleRow} rowKey={rowKey} onAddNew={onAddNew} hideActions={hideActions} reorderMode />
                                    </table>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <table className="w-full text-sm text-left text-primary">
                                <TableHead columns={columns} handleSort={handleSort} selectable={selectable} allSelected={allSelected} toggleAll={toggleAll} actions={actions} sortKey={activeSortKey} sortDir={activeSortDir} />
                                <TableBody data={paginatedData} columns={columns} actions={actions} selectable={selectable} selectedKeys={selectedKeys} striped={striped} hoverable={hoverable} loading={loading} emptyMessage={emptyMessage} colCount={colCount} onRowClick={onRowClick} onToggleRow={toggleRow} rowKey={rowKey} onAddNew={onAddNew} hideActions={hideActions} />
                            </table>
                        )}

                        {/* ── Pagination ───────────────────────────────────────────── */}
                        <TablePagination config={{
                            page,
                            pageSize,
                            total,
                            onPageChange: handlePageChange,
                        }} />
                    </>
                )}
            </div>
        </div>
    );
}

export default memo(TableComponent) as typeof TableComponent;

