import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { RowTableData } from '@/models';
import { PIPELINE_STAGES_columnDefs, PIPELINE_STAGES_MOCK_DATA } from '@/demoData';
import { mapColumns } from '@/helpers/TableDataHelper';
import TableComponent from '@/components/TableComponent/TableComponent';

export default function PipelineStages() {
    const { t }          = useTranslation();
    const [searchParams] = useSearchParams();
    const setId          = searchParams.get('setId');

    const [tableData,    setTableData   ] = useState<RowTableData[]>([]);
    const [tableLoading, setTableLoading] = useState(true);

    const columns = useMemo(() => mapColumns(PIPELINE_STAGES_columnDefs), []);

    // Simulate fetch — in production replace with api.get(`/pipeline-stages?setId=${setId}`)
    useEffect(() => {
        setTableLoading(true);
        const id = setTimeout(() => {
            // Re-assign rank according to array order so rank always reflects position
            setTableData(PIPELINE_STAGES_MOCK_DATA.map((row, i) => ({ ...row, rank: i + 1 })));
            setTableLoading(false);
        }, 500);
        return () => clearTimeout(id);
    }, [setId]);

    // Called by TableComponent after every drag-drop — update ranks to match new order
    const handleReorder = (reordered: RowTableData[]) =>
        setTableData(reordered.map((row, i) => ({ ...row, rank: i + 1 })));

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={tableData}
                loading={tableLoading}
                columns={columns}
                rowKey="id"
                title={t('lblManagePipelineStages')}
                subtitle={setId ? `Set ID: ${setId}` : undefined}
                emptyMessage={t('msgNoRecordsFoundForCriteria')}
                initialPage={1}
                initialPageSize={10}
                clientSort={false}
                onRowReorder={handleReorder}
            />
        </div>
    );
}
