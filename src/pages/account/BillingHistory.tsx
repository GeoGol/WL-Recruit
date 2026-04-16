import TableComponent from '@/components/TableComponent/TableComponent';
import { useMemo, useState, useEffect } from 'react';
import { mapColumns } from '@/helpers/TableDataHelper';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { PAGE_SIZE_OPTIONS } from "@/constant/CONSTANTS";
import { t } from "i18next";
import { BILLING_HISTORY_columnDefs, BILLING_HISTORY_MOCK_DATA } from "@/demoData";
import { exportToExcel } from "@/helpers/ExportHelpers";
import { RowTableData } from '@/models';


export default function BillingHistory() {
    const columns = useMemo(() => mapColumns(BILLING_HISTORY_columnDefs), []);

    // ── Mock initial load skeleton ────────────────────────────────────────────
    const [tableData,    setTableData   ] = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(true);

    useEffect(() => {
        setTableLoading(true);
        const id = setTimeout(() => {
            setTableData(BILLING_HISTORY_MOCK_DATA);
            setTableLoading(false);
        }, 500);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={tableData}
                loading={tableLoading}
                columns={columns}
                rowKey="id"
                title={t('mnoBillingHistory')}
                subtitle="Subtitle"
                clientSort
                hoverable
                toolbar={
                    <ButtonComponent
                        variant="outline"
                        size="md"
                        label="Export all"
                        onClick={async () => exportToExcel(BILLING_HISTORY_MOCK_DATA, BILLING_HISTORY_columnDefs, 'billing-history')}
                    />
                }
                emptyMessage={t('msgNoRecordsFoundForCriteria')}
                initialPage={1}
                initialPageSize={5}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
        </div>
    );
}
