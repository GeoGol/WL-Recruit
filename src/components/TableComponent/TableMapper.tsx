import type { TableColumn, TableAction, BadgeColor } from './TableComponent';
import { TableBadge, TableImageCell } from './TableComponent';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ColumnDef<T> {
    key          : keyof T | string;
    label        : string;
    sortable?    : boolean;
    headerClass? : string;
    cellClass?   : string;
    width?       : string;
    /** 'text'  — raw string value (default)                           */
    /** 'badge' — renders a TableBadge; supply colorMap                */
    /** 'image' — renders a TableImageCell; supply imageKey/subtitleKey */
    /** 'date'  — formats value with toLocaleDateString                */
    type?        : 'text' | 'badge' | 'image' | 'date';
    /** For type='badge': maps cell value → BadgeColor */
    colorMap?    : Record<string, BadgeColor>;
    /** For type='badge': fallback color when value not in colorMap */
    defaultColor?: BadgeColor;
    /** For type='image': key of the image src field */
    imageKey?    : keyof T;
    /** For type='image': key used as the subtitle */
    subtitleKey? : keyof T;
    /** For type='date': locale string options */
    dateOptions? : Intl.DateTimeFormatOptions;
    /** Custom render — overrides type */
    render?      : TableColumn<T>['render'];
}

export interface ActionDef<T> {
    label    : string;
    icon?    : TableAction<T>['icon'];
    variant? : TableAction<T>['variant'];
    onClick  : (row: T) => void;
    disabled?: (row: T) => boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value: unknown, options?: Intl.DateTimeFormatOptions): string {
    if (!value) return '';
    const d = value instanceof Date ? value : new Date(String(value));
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString(undefined, options);
}

// ─── mapColumns ───────────────────────────────────────────────────────────────

export function mapColumns<T extends Record<string, unknown>>(
    defs: ColumnDef<T>[]
): TableColumn<T>[] {
    return defs.map(def => {
        const base: TableColumn<T> = {
            key        : def.key,
            label      : def.label,
            sortable   : def.sortable,
            headerClass: def.headerClass,
            cellClass  : def.cellClass,
            width      : def.width,
        };

        // Explicit render always wins
        if (def.render) return { ...base, render: def.render };

        switch (def.type) {
            case 'badge':
                return {
                    ...base,
                    render: (row) => {
                        const value = String(row[def.key as keyof T] ?? '');
                        const color = def.colorMap?.[value] ?? def.defaultColor ?? 'gray';
                        return <TableBadge label={value} color={color} />;
                    },
                };

            case 'image':
                return {
                    ...base,
                    render: (row) => (
                        <TableImageCell
                            src={def.imageKey ? String(row[def.imageKey] ?? '') : undefined}
                            name={String(row[def.key as keyof T] ?? '')}
                            subtitle={def.subtitleKey ? String(row[def.subtitleKey] ?? '') : undefined}
                        />
                    ),
                };

            case 'date':
                return {
                    ...base,
                    render: (row) => formatDate(row[def.key as keyof T], def.dateOptions),
                };

            default:
                return base;
        }
    });
}

// ─── mapActions ───────────────────────────────────────────────────────────────

export function mapActions<T>(defs: ActionDef<T>[]): TableAction<T>[] {
    return defs.map(def => ({
        label   : def.label,
        icon    : def.icon,
        variant : def.variant,
        onClick : def.onClick,
        disabled: def.disabled,
    }));
}

