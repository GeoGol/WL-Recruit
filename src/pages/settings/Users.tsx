import TableComponent from "@/components/TableComponent/TableComponent";
import { USERS_MOCK_DATA, USERS_columnDefs, USERS_actionDefs } from "@/demoData";
import { t } from "i18next";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";
import { PAGE_SIZE_OPTIONS } from "@/constant/CONSTANTS";
import { mapColumns, mapActions } from "@/helpers/TableDataHelper";

export default function Users() {

    const columns = mapColumns(USERS_columnDefs);
    const actions = mapActions(USERS_actionDefs);

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <TableComponent
                data={USERS_MOCK_DATA}
                columns={columns}
                actions={actions}
                rowKey="id"
                title={t('lblManageUsers')}
                toolbar={
                    <ButtonComponent
                        variant="confirmation"
                        size="sm"
                        label={t('lblCreateUser')}
                        onClick={() => console.log('create btn')}
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
