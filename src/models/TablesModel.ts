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
    /** Optional toolbar slot rendered above the table */
    toolbar?          : ReactNode;
    /** Table caption / title shown in the top-left of the card */
    title?            : string;
    /** Subtitle shown below the title */
    subtitle?         : string;
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
    label: string;
    icon?: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "confirmation" | "ghost" | "danger" | "link";
    onClick: (row: T) => void;
    disabled?: (row: T) => boolean;
};

export type ColumnDef = {
    key: string;
    label: string;
    sortable?: boolean;
    headerClass?: string;
    cellClass?: string;
    width?: string;
    type?: string;
    dateOptions?: object;
    colorMap?: Record<string, BadgeColor>;
    defaultColor?: BadgeColor;
    imageKey?: string;
    subtitleKey?: string;
    render?: (row: any) => React.ReactNode;
};

export type BadgeColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'indigo' | 'purple' | 'pink';

export const badgeColorMap: Record<BadgeColor, string> = {
    gray:   'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    blue:   'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    green:  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    red:    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    pink:   'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
};