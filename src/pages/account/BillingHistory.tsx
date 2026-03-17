import { useState } from 'react';
import TableComponent from '@/components/TableComponent/TableComponent';
import { mapColumns, mapActions } from '@/components/TableComponent/TableMapper';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import {PAGE_SIZE_OPTIONS} from "@/constant/CONSTANTS";
import {actionDefs, columnDefs, MOCK_DATA} from "@/demoData";
import {t} from "i18next";


// ─── Column definitions ───────────────────────────────────────────────────────

const columns = mapColumns(columnDefs);
const actions = mapActions(actionDefs);

// ─── Component ────────────────────────────────────────────────────────────────

export default function BillingHistory() {
    const [page, setPage]         = useState(1);
    const [pageSize, setPageSize] = useState(5);


    const paginatedData = MOCK_DATA.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="mx-auto max-w-mdContainer w-full flex flex-col gap-4">
            <TableComponent
                data={paginatedData}
                columns={columns}
                actions={actions}
                rowKey="id"
                title= {t('mnoBillingHistory')}
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
                pagination={{
                    page,
                    pageSize,
                    total          : MOCK_DATA.length,
                    onPageChange   : setPage,
                    pageSizeOptions: PAGE_SIZE_OPTIONS,
                    onPageSizeChange: (s) => { setPageSize(s); setPage(1); },
                }}
                emptyMessage= {t('msgNoRecordsFoundForCriteria')}
            />
        </div>
    );
}
