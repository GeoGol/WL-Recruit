import {ActionDef, ColumnDef, TableAction, TableColumn} from '@/models/TablesModel';
import { TableBadge } from '@/components/TableComponent/TableBadge';
import { TableImageCell } from '@/components/TableComponent/TableImageCell';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value: unknown, options?: Intl.DateTimeFormatOptions): string {
    if (!value) return '';
    const d = value instanceof Date ? value : new Date(String(value));
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString(undefined, options);
}

// ─── mapColumns ───────────────────────────────────────────────────────────────

export function mapColumns(
    defs: ColumnDef[]
): TableColumn<any>[] {
    return defs
        .filter(def => !def.hidden)
        .map(def => {
        const base: TableColumn<any> = {
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
                    render: (row: any) => {
                        const value = String(row[def.key] ?? '');
                        const color = def.colorMap?.[value] ?? def.defaultColor ?? 'gray';
                        return <TableBadge label={value} color={color} />;
                    },
                };

            case 'image':
                return {
                    ...base,
                    render: (row: any) => {
                        const firstName = row['firstName'] ? String(row['firstName']) : '';
                        const lastName  = row['lastName']  ? String(row['lastName'])  : '';
                        const fallback  = String(row[def.key] ?? '');
                        // If both firstName and lastName exist, combine them; otherwise use key value
                        const name = firstName && lastName
                            ? `${firstName} ${lastName}`
                            : firstName || lastName || fallback;
                        return (
                            <TableImageCell
                                src={def.imageKey ? String(row[def.imageKey] ?? '') : undefined}
                                name={name}
                                subtitle={def.subtitleKey ? String(row[def.subtitleKey] ?? '') : undefined}
                            />
                        );
                    },
                };

            case 'date':
                return {
                    ...base,
                    render: (row: any) => formatDate(row[def.key], def.dateOptions),
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
        hidden  : def.hidden,
    }));
}
