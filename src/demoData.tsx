import { RiEyeLine, RiEditLine, RiDeleteBinLine, RiDownloadLine, RiShareLine, RiExportLine, RiLockUnlockLine, RiToggleLine } from 'react-icons/ri';
import { ActionDef, ColumnDef, RowTableData } from "@/models/TablesModel";


export const BILLING_HISTORY_MOCK_DATA: RowTableData[] = [
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

export const USERS_MOCK_DATA: RowTableData[] = [
    { id: 1,  firstName: 'Georgia',   lastName: 'Golegou',     fullName: 'Georgia Golegou',     email: 'g.golegou@acme.com',      role: 'Administrator', status: 'Active'   },
    { id: 2,  firstName: 'Nikos',     lastName: 'Papadopoulos',fullName: 'Nikos Papadopoulos',   email: 'n.papadopoulos@acme.com', role: 'Manager',       status: 'Active'   },
    { id: 3,  firstName: 'Maria',     lastName: 'Ioannou',     fullName: 'Maria Ioannou',        email: 'm.ioannou@acme.com',      role: 'HR',            status: 'Active'   },
    { id: 4,  firstName: 'Dimitris',  lastName: 'Kostas',      fullName: 'Dimitris Kostas',      email: 'd.kostas@acme.com',       role: 'Manager',       status: 'Inactive' },
    { id: 5,  firstName: 'Elena',     lastName: 'Stavrou',     fullName: 'Elena Stavrou',        email: 'e.stavrou@acme.com',      role: 'HR',            status: 'Active'   },
    { id: 6,  firstName: 'Petros',    lastName: 'Alexiou',     fullName: 'Petros Alexiou',       email: 'p.alexiou@acme.com',      role: 'Interviewer',   status: 'Active'   },
    { id: 7,  firstName: 'Sofia',     lastName: 'Nikolaou',    fullName: 'Sofia Nikolaou',       email: 's.nikolaou@acme.com',     role: 'HR',            status: 'Inactive' },
    { id: 8,  firstName: 'Giorgos',   lastName: 'Dimitriou',   fullName: 'Giorgos Dimitriou',    email: 'g.dimitriou@acme.com',    role: 'Administrator', status: 'Active'   },
    { id: 9,  firstName: 'Anna',      lastName: 'Christodoulou',fullName: 'Anna Christodoulou',  email: 'a.christodoulou@acme.com',role: 'Manager',       status: 'Active'   },
    { id: 10, firstName: 'Kostas',    lastName: 'Georgiou',    fullName: 'Kostas Georgiou',      email: 'k.georgiou@acme.com',     role: 'Interviewer',   status: 'Inactive' },
];

export const USER_ROLE_OPTIONS = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Manager',       label: 'Manager'       },
    { value: 'HR',            label: 'HR'            },
    { value: 'Interviewer',   label: 'Interviewer'   },
    { value: 'Custom',        label: 'Custom'        },
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

export const BILLING_HISTORY_columnDefs: ColumnDef[] = [
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

export const USERS_columnDefs: ColumnDef[] = [
    {
        key        : 'fullName',
        label      : 'Full Name',
        // sortable   : true,
        // type       : 'image',
        subtitleKey: 'email',
        cellClass   : 'font-semibold',
    },
    {
        key     : 'role',
        label   : 'Role',
        // sortable: true,
    },
    {
        key         : 'status',
        label       : 'Status',
        // sortable    : true,
        type        : 'badge',
        headerClass : 'text-center',
        cellClass   : 'text-center',
        colorMap    : {
            'Active'  : 'green',
            'Inactive': 'red',
        },
        defaultColor: 'gray',
    },
];

export const USERS_actionDefs: ActionDef<RowTableData>[] = [
    {
        label  : 'Edit',
        icon   : <RiEditLine />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry(String(row.id)),
    },
    // {
    //     label  : 'Delete',
    //     icon   : <RiDeleteBinLine />,
    //     variant: 'danger',
    //     onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    // },
];

export const INACTIVITY_TIMEOUT_OPTIONS = [
    { value: '5',   label: '5 minutes'  },
    { value: '10',  label: '10 minutes' },
    { value: '15',  label: '15 minutes' },
    { value: '30',  label: '30 minutes' },
    { value: '60',  label: '1 hour'     },
    { value: '120', label: '2 hours'    },
    { value: '0',   label: 'Never'      },
];

export const RECENT_APPS_TIMEFRAME_OPTIONS = [
    { value: '7',  label: 'Last 7 days'  },
    { value: '14', label: 'Last 14 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '60', label: 'Last 60 days' },
    { value: '90', label: 'Last 90 days' },
];

export const CANDIDATE_SORTING_OPTIONS = [
    { value: 'name_asc',   label: 'Name (A-Z)'         },
    { value: 'name_desc',  label: 'Name (Z-A)'         },
    { value: 'date_desc',  label: 'Newest first'       },
    { value: 'date_asc',   label: 'Oldest first'       },
    { value: 'score_desc', label: 'Score (High to Low)'},
];

export const APP_LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English'  },
    { value: 'el', label: 'Greek'    },
    { value: 'de', label: 'German'   },
    { value: 'fr', label: 'French'   },
    { value: 'es', label: 'Spanish'  },
];

export const TIMEZONE_OPTIONS = [
    { value: 'UTC',            label: 'UTC'                      },
    { value: 'Europe/Athens',  label: 'Europe/Athens (GMT+2)'   },
    { value: 'Europe/London',  label: 'Europe/London (GMT+0)'   },
    { value: 'Europe/Berlin',  label: 'Europe/Berlin (GMT+1)'   },
    { value: 'America/New_York', label: 'America/New York (GMT-5)'},
];

export const SKILLS_OPTIONS = [
    { value: 'react',      label: 'React'      },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'nodejs',     label: 'Node.js'    },
    { value: 'python',     label: 'Python'     },
    { value: 'java',       label: 'Java'       },
];

export const TAGS_OPTIONS = [
    { value: 'senior',    label: 'Senior'    },
    { value: 'junior',    label: 'Junior'    },
    { value: 'remote',    label: 'Remote'    },
    { value: 'fulltime',  label: 'Full-time' },
    { value: 'parttime',  label: 'Part-time' },
];

export const LANGUAGES_OPTIONS = [
    { value: 'en', label: 'English'  },
    { value: 'el', label: 'Greek'    },
    { value: 'de', label: 'German'   },
    { value: 'fr', label: 'French'   },
    { value: 'es', label: 'Spanish'  },
];

export const AUTOMATIC_LANGUAGES_OPTIONS = [
    { value: 'en', label: 'English'  },
    { value: 'el', label: 'Greek'    },
    { value: 'de', label: 'German'   },
    { value: 'fr', label: 'French'   },
    { value: 'es', label: 'Spanish'  },
];

export const CANDIDATES_RETENTION_OPTIONS = [
    { value: 3,   label: '3 months'  },
    { value: 6,   label: '6 months'  },
    { value: 12,  label: '12 months'  },
    { value: 18,  label: '18 months'  },
    { value: 24,  label: '24 months'  },
    { value: 36,  label: '36 months'  },
    { value: 48,  label: '48 months'  },
    { value: 60,  label: '60 months'  },
    { value: 72,  label: '72 months'  },
    { value: 84,  label: '84 months'  },
];

export const BLIND_HIRING_ROLES_OPTIONS = [
    { value: 'recruiter',        label: 'Recruiter'         },
    { value: 'hiring_manager',   label: 'Hiring Manager'    },
    { value: 'interviewer',      label: 'Interviewer'       },
    { value: 'admin',            label: 'Administrator'     },
];
