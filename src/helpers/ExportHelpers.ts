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
    // Build header map: key → label
    const headers = columnDefs.map(c => c.label);
    const keys    = columnDefs.map(c => c.key);

    // Map each row to an ordered array matching headers
    const rows = data.map(row =>
        keys.reduce<Record<string, unknown>>((acc, key, idx) => {
            acc[headers[idx]] = row[key] ?? '';
            return acc;
        }, {})
    );

    const worksheet  = XLSX.utils.json_to_sheet(rows);
    const workbook   = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Auto-fit column widths based on content length
    const colWidths = headers.map((h, i) => {
        const maxLen = Math.max(
            h.length,
            ...data.map(row => String(row[keys[i]] ?? '').length)
        );
        return { wch: maxLen + 2 };
    });
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

