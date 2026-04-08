import { ColumnDef, RowTableData } from '@/models/TablesModel';

export async function exportToExcel(
    data: RowTableData[],
    columnDefs: ColumnDef[],
    fileName = 'export'
): Promise<void> {
    const XLSX = await import('xlsx');

    const rows = data.map(row =>
        columnDefs.reduce<Record<string, unknown>>((acc, def) => {
            const raw = row[def.key];
            acc[def.label] = def.type === 'image' && row['lastName']
                ? `${String(raw ?? '')} ${String(row['lastName'] ?? '')}`.trim()
                : String(raw ?? '');
            return acc;
        }, {})
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook  = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    worksheet['!cols'] = columnDefs.map(def => ({
        wch: Math.max(
            def.label.length,
            ...data.map(row => String(row[def.key] ?? '').length)
        ) + 2,
    }));

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
