import * as XLSX from 'xlsx';
import { ColumnDef, RowTableData } from '@/models/TablesModel';

/**
 * Exports an array of rows to an Excel (.xlsx) file using column definitions
 * to map keys → human-readable headers.
 */
export function exportToExcel(
    data: RowTableData[],
    columnDefs: ColumnDef[],
    fileName = 'export'
): void {
    // Map each row to an ordered array matching headers
    const rows = data.map(row =>
        columnDefs.reduce<Record<string, unknown>>((acc, def) => {
            const rawValue = row[def.key];
            // image type combines firstName + lastName if lastName exists in the row
            const value = def.type === 'image' && row['lastName']
                ? `${rawValue ?? ''} ${row['lastName']}`.trim()
                : rawValue ?? '';
            acc[def.label] = value;
            return acc;
        }, {})
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook  = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Auto-fit column widths based on content length
    const colWidths = columnDefs.map(def => {
        const maxLen = Math.max(
            def.label.length,
            ...data.map(row => String(row[def.key] ?? '').length)
        );
        return { wch: maxLen + 2 };
    });
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

