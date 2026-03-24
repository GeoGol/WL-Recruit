import TableComponent from '@/components/TableComponent/TableComponent';
import { mapColumns } from '@/helpers/TableDataHelper';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import { PAGE_SIZE_OPTIONS } from "@/constant/CONSTANTS";
import { t } from "i18next";
import { BILLING_HISTORY_columnDefs, BILLING_HISTORY_MOCK_DATA } from "@/demoData";
import { exportToExcel } from "@/helpers/ExportHelpers";


export default function BillingHistory() {

    const columns = mapColumns(BILLING_HISTORY_columnDefs);

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={BILLING_HISTORY_MOCK_DATA}
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
                        onClick={() => exportToExcel(BILLING_HISTORY_MOCK_DATA, BILLING_HISTORY_columnDefs, 'billing-history')}
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
