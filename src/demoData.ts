import type {ActionDef, ColumnDef} from "@/components/TableComponent/TableMapper";

type Invoice = {
    id       : string;
    date     : string;
    plan     : string;
    amount   : string;
    status   : 'Paid' | 'Pending' | 'Failed' | 'Refunded';
    invoiceUrl: string;
};

export const MOCK_DATA: Invoice[] = [
    { id: 'INV-2024-009', date: '2024-09-01', plan: 'Professional', amount: '$49.00', status: 'Paid',     invoiceUrl: '#' },
    { id: 'INV-2024-008', date: '2024-08-01', plan: 'Professional', amount: '$49.00', status: 'Paid',     invoiceUrl: '#' },
    { id: 'INV-2024-007', date: '2024-07-01', plan: 'Professional', amount: '$49.00', status: 'Pending',  invoiceUrl: '#' },
    { id: 'INV-2024-006', date: '2024-06-01', plan: 'Starter',      amount: '$19.00', status: 'Failed',   invoiceUrl: '#' },
    { id: 'INV-2024-005', date: '2024-05-01', plan: 'Starter',      amount: '$19.00', status: 'Paid',     invoiceUrl: '#' },
    { id: 'INV-2024-004', date: '2024-04-01', plan: 'Starter',      amount: '$19.00', status: 'Refunded', invoiceUrl: '#' },
    { id: 'INV-2024-003', date: '2024-03-01', plan: 'Enterprise',   amount: '$99.00', status: 'Paid',     invoiceUrl: '#' },
    { id: 'INV-2024-002', date: '2024-02-01', plan: 'Enterprise',   amount: '$99.00', status: 'Paid',     invoiceUrl: '#' },
    { id: 'INV-2024-001', date: '2024-01-01', plan: 'Enterprise',   amount: '$99.00', status: 'Paid',     invoiceUrl: '#' },
];

export const actionDefs: ActionDef<Invoice>[] = [
    {
        label  : 'Download',
        variant: 'link',
        onClick: (row: Invoice) => window.open(row.invoiceUrl, '_blank'),
    },
];

export const columnDefs: ColumnDef<Invoice>[] = [
    {
        key     : 'id',
        label   : 'Invoice',
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