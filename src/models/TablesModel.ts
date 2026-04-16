import type {ReactNode} from "react";

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

export interface ServerPaginationConfig {
    page             : number;
    pageSize         : number;
    total            : number;
    onPageChange     : (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    /** Current sort key owned by the parent (reflects server request params) */
    sortKey?         : string | null;
    /** Current sort direction owned by the parent */
    sortDir?         : SortDirection;
    /** Called when the user clicks a sortable column header */
    onSortChange?    : (key: string | null, dir: SortDirection) => void;
}

export interface TableProps<T> {
    data              : T[];
    columns           : TableColumn<T>[];
    rowKey            : keyof T;
    actions?          : TableAction<T>[];
    selectable?       : boolean;
    selectedKeys?     : (string | number)[];
    onSelectionChange?: (keys: (string | number)[]) => void;
    initialPage?      : number;
    initialPageSize?  : number;
    pageSizeOptions?  : number[];
    clientSort?       : boolean;
    loading?          : boolean;
    emptyMessage?     : string;
    className?        : string;
    striped?          : boolean;
    hoverable?        : boolean;
    onRowClick?       : (row: T) => void;
    /** Callback for the empty-state "Add new" button (only shown when edit/delete actions exist) */
    onAddNew?         : () => void;
    /** Optional toolbar slot rendered above the table */
    toolbar?          : ReactNode;
    /** Table caption / title shown in the top-left of the card */
    title?            : string;
    /** Subtitle shown below the title */
    subtitle?         : string;
    /** Pagination behavior: local (client) or controlled by parent/API (server) */
    paginationMode?   : 'client' | 'server';
    /** Required when paginationMode is "server" */
    serverPagination? : ServerPaginationConfig;
}

export interface TablePaginationProps {
    config: {
        page: number;
        pageSize: number;
        total: number;
        onPageChange: (page: number) => void;
        pageSizeOptions?: number[];
        onPageSizeChange?: (size: number) => void;
    };
}

export interface TableHeadProps {
    columns: any[];
    handleSort: (key: string) => void;
    selectable: boolean;
    allSelected: boolean;
    someSelected: boolean;
    toggleAll: () => void;
    actions?: any[];
}

export interface TableActionCellProps<T> {
    row    : T;
    actions: any[];
}





export type RowTableData = { [key: string]: unknown };

export type ActionDef<T> = {
    label    : string;
    icon?    : React.ReactNode;
    variant? : "primary" | "secondary" | "outline" | "confirmation" | "ghost" | "danger" | "link";
    onClick  : (row: T) => void;
    disabled?: (row: T) => boolean;
    type?    : 'edit' | 'delete' | 'view' | 'toggle' | 'download' | 'share' | 'export' | 'lock' | string;
};

export type ColumnDef = {
    key         : string;
    label       : string;
    sortable?   : boolean;
    headerClass?: string;
    cellClass?  : string;
    width?      : string;
    type?       : string;
    hidden?     : boolean;
    dateOptions?: object;
    colorMap?   : Record<string, BadgeColor>;
    defaultColor?: BadgeColor;
    imageKey?   : string;
    subtitleKey?: string;
    render?: (row: any) => React.ReactNode;
};

export type BadgeColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'indigo' | 'purple' | 'pink';

export const badgeColorMap: Record<BadgeColor, string> = {
    gray:   'bg-gray-100 text-gray-800',
    blue:   'bg-blue-100 text-blue-800',
    green:  'bg-success-bg text-accent-green',
    red:    'bg-error-bg text-danger',
    yellow: 'bg-yellow-100 text-yellow-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink:   'bg-pink-100 text-pink-800',
};