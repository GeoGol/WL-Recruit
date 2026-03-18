import { RiEyeLine, RiEditLine, RiDeleteBinLine, RiDownloadLine, RiShareLine, RiExportLine, RiLockUnlockLine, RiToggleLine } from 'react-icons/ri';
import { ActionDef, ColumnDef, RowTableData } from "@/models/TablesModel";


export const MOCK_DATA: RowTableData[] = [
    { id: 'ENT-2024-0019', date: '2024-09-01', plan: 'Professional', amount: '$49.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-0018', date: '2024-08-01', plan: 'Professional', amount: '$49.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-0017', date: '2024-07-01', plan: 'Professional', amount: '$49.00', status: 'Pending', entryUrl: '#' },
    { id: 'ENT-2024-0016', date: '2024-06-01', plan: 'Starter', amount: '$19.00', status: 'Failed', entryUrl: '#' },
    { id: 'ENT-2024-0015', date: '2024-05-01', plan: 'Starter', amount: '$19.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-0014', date: '2024-04-01', plan: 'Starter', amount: '$19.00', status: 'Refunded', entryUrl: '#' },
    { id: 'ENT-2024-0013', date: '2024-03-01', plan: 'Enterprise', amount: '$99.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-0012', date: '2024-02-01', plan: 'Enterprise', amount: '$99.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-0011', date: '2024-01-01', plan: 'Enterprise', amount: '$99.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-0010', date: '2024-09-01', plan: 'Professional', amount: '$49.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-009', date: '2024-09-01', plan: 'Professional', amount: '$49.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-008', date: '2024-08-01', plan: 'Professional', amount: '$49.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-007', date: '2024-07-01', plan: 'Professional', amount: '$49.00', status: 'Pending', entryUrl: '#' },
    { id: 'ENT-2024-006', date: '2024-06-01', plan: 'Starter', amount: '$19.00', status: 'Failed', entryUrl: '#' },
    { id: 'ENT-2024-005', date: '2024-05-01', plan: 'Starter', amount: '$19.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-004', date: '2024-04-01', plan: 'Starter', amount: '$19.00', status: 'Refunded', entryUrl: '#' },
    { id: 'ENT-2024-003', date: '2024-03-01', plan: 'Enterprise', amount: '$99.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-002', date: '2024-02-01', plan: 'Enterprise', amount: '$99.00', status: 'Paid', entryUrl: '#' },
    { id: 'ENT-2024-001', date: '2024-01-01', plan: 'Enterprise', amount: '$99.00', status: 'Paid', entryUrl: '#' },
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
        label: 'View',
        icon: <RiEyeLine />,
        variant: 'link',
        onClick: (row: RowTableData) => viewEntry(String(row.id)),
    },
    {
        label: 'Edit',
        icon: <RiEditLine />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry(String(row.id)),
        disabled: (row: RowTableData) => String(row.status) !== 'Paid',
    },
    {
        label: 'Delete',
        icon: <RiDeleteBinLine />,
        variant: 'danger',
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
    {
        label: 'Enable/Disable',
        icon: <RiToggleLine />,
        variant: 'confirmation',
        onClick: (row: RowTableData) => toggleEntryEnabled(String(row.id)),
        disabled: (row: RowTableData) => String(row.status) === 'Failed',
    },
    {
        label: 'Download',
        icon: <RiDownloadLine />,
        variant: 'link',
        onClick: (row: RowTableData) => window.open(String(row.entryUrl), '_blank'),
    },
    {
        label: 'Share',
        icon: <RiShareLine />,
        variant: 'link',
        onClick: (row: RowTableData) => shareEntry(String(row.id)),
    },
    {
        label: 'Export',
        icon: <RiExportLine />,
        variant: 'outline',
        onClick: (row: RowTableData) => exportEntry(String(row.id)),
    },
    {
        label: 'Lock/Unlock',
        icon: <RiLockUnlockLine />,
        variant: 'secondary',
        onClick: (row: RowTableData) => toggleEntryLock(String(row.id)),
        disabled: (row: RowTableData) => String(row.status) === 'Pending',
    },
];

export const columnDefs: ColumnDef[] = [
    {
        key     : 'id',
        label   : 'Entry',
        sortable: true,
        cellClass: 'font-medium text-gray-900 dark:text-white',
    },
    {
        key        : 'date',
        label      : 'Date',
        type       : 'date',
        sortable   : true,
        dateOptions: { day: '2-digit', month: 'short', year: 'numeric' },
    },
    {
        key     : 'plan',
        label   : 'Plan',
        sortable: true,
    },
    {
        key     : 'amount',
        label   : 'Amount',
        sortable: true,
        cellClass: 'font-semibold text-gray-900 dark:text-white',
    },
    {
        key         : 'status',
        label       : 'Status',
        type        : 'badge',
        sortable    : true,
        colorMap    : {
            Paid    : 'green',
            Pending : 'yellow',
            Failed  : 'red',
            Refunded: 'blue',
        },
        defaultColor: 'gray',
    },
];
