import TableComponent from '@/components/TableComponent/TableComponent';
import { mapColumns, mapActions } from '@/components/TableComponent/TableMapper';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import {PAGE_SIZE_OPTIONS} from "@/constant/CONSTANTS";
import {t} from "i18next";
import {actionDefs, columnDefs, MOCK_DATA} from "@/demoData";


// ─── Column definitions ───────────────────────────────────────────────────────

const columns = mapColumns(columnDefs);
const actions = mapActions(actionDefs);

// ─── Component ────────────────────────────────────────────────────────────────

export default function BillingHistory() {
    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={MOCK_DATA}
                columns={columns}
                actions={actions}
                rowKey="id"
                title={t('mnoBillingHistory')}
                subtitle="Subtitle"
                clientSort
                hoverable
                toolbar={
                    <ButtonComponent
                        variant="outline"
                        size="sm"
                        label="Export all"
                        onClick={() => console.log('export')}
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
