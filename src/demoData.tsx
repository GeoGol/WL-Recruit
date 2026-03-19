import { RiEyeLine, RiEditLine, RiDeleteBinLine, RiDownloadLine, RiShareLine, RiExportLine, RiLockUnlockLine, RiToggleLine } from 'react-icons/ri';
import { ActionDef, ColumnDef, RowTableData } from "@/models/TablesModel";


export const MOCK_DATA: RowTableData[] = [
    { id: 1,  date: '03/14/2019 08:22:11 AM', totalSmartCVs: 100, consumedSmartCVs: 45,  balance: 55  },
    { id: 2,  date: '07/02/2020 03:47:59 PM', totalSmartCVs: 200, consumedSmartCVs: 198, balance: 2   },
    { id: 3,  date: '11/19/2020 11:05:33 AM', totalSmartCVs: 50,  consumedSmartCVs: 12,  balance: 38  },
    { id: 4,  date: '01/08/2021 06:30:00 PM', totalSmartCVs: 150, consumedSmartCVs: 150, balance: 0   },
    { id: 5,  date: '04/25/2021 09:14:22 AM', totalSmartCVs: 300, consumedSmartCVs: 87,  balance: 213 },
    { id: 6,  date: '06/13/2021 02:55:41 PM', totalSmartCVs: 75,  consumedSmartCVs: 60,  balance: 15  },
    { id: 7,  date: '09/01/2021 07:00:00 AM', totalSmartCVs: 500, consumedSmartCVs: 321, balance: 179 },
    { id: 8,  date: '12/12/2019 12:07:36 PM', totalSmartCVs: 80,  consumedSmartCVs: 0,   balance: 80  },
    { id: 9,  date: '02/28/2022 04:18:09 PM', totalSmartCVs: 120, consumedSmartCVs: 99,  balance: 21  },
    { id: 10, date: '05/17/2022 10:44:55 AM', totalSmartCVs: 250, consumedSmartCVs: 250, balance: 0   },
    { id: 11, date: '08/03/2022 01:30:27 PM', totalSmartCVs: 60,  consumedSmartCVs: 33,  balance: 27  },
    { id: 12, date: '10/21/2022 08:59:14 AM', totalSmartCVs: 400, consumedSmartCVs: 112, balance: 288 },
    { id: 13, date: '01/15/2023 05:22:48 PM', totalSmartCVs: 90,  consumedSmartCVs: 89,  balance: 1   },
    { id: 14, date: '03/30/2023 11:11:11 AM', totalSmartCVs: 175, consumedSmartCVs: 44,  balance: 131 },
    { id: 15, date: '06/06/2023 03:05:00 PM', totalSmartCVs: 350, consumedSmartCVs: 200, balance: 150 },
    { id: 16, date: '08/22/2023 09:38:30 AM', totalSmartCVs: 110, consumedSmartCVs: 110, balance: 0   },
    { id: 17, date: '10/10/2023 06:50:19 PM', totalSmartCVs: 225, consumedSmartCVs: 78,  balance: 147 },
    { id: 18, date: '12/01/2023 12:00:00 PM', totalSmartCVs: 500, consumedSmartCVs: 499, balance: 1   },
    { id: 19, date: '02/14/2024 07:25:43 AM', totalSmartCVs: 130, consumedSmartCVs: 55,  balance: 75  },
    { id: 20, date: '04/09/2024 02:42:17 PM', totalSmartCVs: 280, consumedSmartCVs: 140, balance: 140 },
];

// Placeholder handler functions
const viewEntry = (id: string) => alert(`View entry ${id}`);
const editEntry = (id: string) => alert(`Edit entry ${id}`);
const deleteEntry = (id: string) => alert(`Delete entry ${id}`);
const toggleEntryEnabled = (id: string) => alert(`Toggle enabled for entry ${id}`);
const shareEntry = (id: string) => alert(`Share entry ${id}`);
const exportEntry = (id: string) => alert(`Export entry ${id}`);
const toggleEntryLock = (id: string) => alert(`Toggle lock for entry ${id}`);

export const actionDefs: ActionDef<RowTableData>[] = [
    {
        label  : 'View',
        icon   : <RiEyeLine />,
        variant: 'link',
        onClick: (row: RowTableData) => viewEntry(String(row.id)),
    },
    {
        label  : 'Edit',
        icon   : <RiEditLine />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry(String(row.id)),
    },
    {
        label  : 'Delete',
        icon   : <RiDeleteBinLine />,
        variant: 'danger',
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
    {
        label  : 'Enable/Disable',
        icon   : <RiToggleLine />,
        variant: 'confirmation',
        onClick: (row: RowTableData) => toggleEntryEnabled(String(row.id)),
    },
    {
        label  : 'Download',
        icon   : <RiDownloadLine />,
        variant: 'link',
        onClick: (row: RowTableData) => window.open(String(row.id), '_blank'),
    },
    {
        label  : 'Share',
        icon   : <RiShareLine />,
        variant: 'link',
        onClick: (row: RowTableData) => shareEntry(String(row.id)),
    },
    {
        label  : 'Export',
        icon   : <RiExportLine />,
        variant: 'outline',
        onClick: (row: RowTableData) => exportEntry(String(row.id)),
    },
    {
        label  : 'Lock/Unlock',
        icon   : <RiLockUnlockLine />,
        variant: 'secondary',
        onClick: (row: RowTableData) => toggleEntryLock(String(row.id)),
    },
];

export const columnDefs: ColumnDef[] = [
    {
        key        : 'date',
        label      : 'Date',
        sortable   : true,
    },
    {
        key      : 'totalSmartCVs',
        label    : 'Total Smart CVs',
        sortable : true,
        cellClass: 'text-center',
        headerClass: 'text-center',
    },
    {
        key      : 'consumedSmartCVs',
        label    : 'Consumed Smart CVs',
        sortable : true,
        cellClass: 'text-center',
        headerClass: 'text-center',
    },
    {
        key      : 'balance',
        label    : 'Balance',
        sortable : true,
        cellClass: 'font-semibold text-right',
        headerClass: 'text-right',
    },
];
