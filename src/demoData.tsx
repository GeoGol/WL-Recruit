import { ActionDef, ColumnDef, RowTableData } from "@/models/TablesModel";
import { PipelineStageFormState, PipelineStageItem } from "@/models/FormStateModel";
import {
    RiDeleteBinLine,
    RiDownloadLine,
    RiEditLine, RiExportLine,
    RiEyeLine, RiListCheck, RiLockUnlockLine,
    RiShareLine,
    RiToggleLine
} from "@/components/IconComponent/Icons";


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


export const USERS_MOCK_DATA: RowTableData[] = [
    { id: 1,  firstName: 'Georgia',  lastName: 'Golegou',      email: 'g.golegou@acme.com',       role: 'Administrator', status: 'Active',   createdAt: '01/15/2022 09:00:00 AM' },
    { id: 2,  firstName: 'Nikos',    lastName: 'Papadopoulos', email: 'n.papadopoulos@acme.com',  role: 'Manager',       status: 'Active',   createdAt: '03/22/2022 10:30:00 AM' },
    { id: 3,  firstName: 'Maria',    lastName: 'Ioannou',      email: 'm.ioannou@acme.com',       role: 'HR',            status: 'Active',   createdAt: '06/08/2022 11:15:00 AM' },
    { id: 4,  firstName: 'Dimitris', lastName: 'Kostas',       email: 'd.kostas@acme.com',        role: 'Manager',       status: 'Inactive', createdAt: '08/19/2022 02:00:00 PM' },
    { id: 5,  firstName: 'Elena',    lastName: 'Stavrou',      email: 'e.stavrou@acme.com',       role: 'HR',            status: 'Active',   createdAt: '11/03/2022 08:45:00 AM' },
    { id: 6,  firstName: 'Petros',   lastName: 'Alexiou',      email: 'p.alexiou@acme.com',       role: 'Interviewer',   status: 'Active',   createdAt: '01/27/2023 03:20:00 PM' },
    { id: 7,  firstName: 'Sofia',    lastName: 'Nikolaou',     email: 's.nikolaou@acme.com',      role: 'HR',            status: 'Inactive', createdAt: '04/14/2023 09:10:00 AM' },
    { id: 8,  firstName: 'Giorgos',  lastName: 'Dimitriou',    email: 'g.dimitriou@acme.com',     role: 'Administrator', status: 'Active',   createdAt: '07/05/2023 01:00:00 PM' },
    { id: 9,  firstName: 'Anna',     lastName: 'Christodoulou',email: 'a.christodoulou@acme.com', role: 'Manager',       status: 'Active',   createdAt: '09/18/2023 10:00:00 AM' },
    { id: 10, firstName: 'Kostas',   lastName: 'Georgiou',     email: 'k.georgiou@acme.com',      role: 'Interviewer',   status: 'Inactive', createdAt: '12/01/2023 04:30:00 PM' },
];

export const USERS_columnDefs: ColumnDef[] = [
    {
        key   : 'id',
        label : 'ID',
        hidden: true,
    },
    {
        key        : 'firstName',
        label      : 'Full Name',
        sortable   : true,
        type       : 'image',
        subtitleKey: 'email',
    },
    {
        key     : 'role',
        label   : 'Role',
        sortable: true,
    },
    {
        key         : 'status',
        label       : 'Status',
        sortable    : true,
        type        : 'badge',
        headerClass : 'text-center',
        cellClass   : 'text-center',
        colorMap    : {
            'Active'  : 'green',
            'Inactive': 'red',
        },
        defaultColor: 'gray',
    },
    {
        key        : 'createdAt',
        label      : 'Created At',
        sortable   : true,
        type       : 'date',
        hidden     : true,
        headerClass: 'text-right',
        cellClass  : 'text-right text-secondary',
    },
];

export const USERS_actionDefs: ActionDef<RowTableData>[] = [
    // {
    //     type   : 'edit',
    //     label  : 'Edit modal',
    //     icon   : <RiEditLine />,
    //     variant: 'primary',
    //     onClick: (row: RowTableData) => editEntry(String(row.id)),
    // },
    {
        type   : 'edit',
        label  : 'Edit',
        icon   : <RiEditLine />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    // {
    //     type   : 'delete',
    //     label  : 'Delete',
    //     icon   : <RiDeleteBinLine />,
    //     variant: 'danger',
    //     onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    // },
];


export const ORGANIZATIONS_HISTORY_MOCK_DATA: RowTableData[] = [
    { id: 1,  organizationName: 'Acme Corp',          careerSiteAddress: 'careers.acme.com',           createdAt: '01/15/2022 09:00:00 AM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.acme.com',          careerSiteLanguage: 'en', showAdmissionJobLink: false, jobsGrouping: 'none',       linkColor: '#1B91FF', buttonColor: '#1B91FF', acceptTerms: true,  autoReplyTemplate: 'default',  smsSenderName: 'Acme',       organizationLogo: '', organizationLogoName: '', bgImage: 'https://smartcv.blob.core.windows.net/org-background-images/bb6457da-4a3a-42dc-8232-56eed85613d9.jpg', bgImageName: 'background-acme.jpg',          companyProfileDEFAULT: '<div><h1>Example Domain</h1><p>This domain is for use in documentation examples without needing permission. Avoid use in operations.</p><p><a href="https://iana.org/domains/example">Learn more</a></p></div>', companyProfileGR: '<p>Η Acme Corp είναι κορυφαίος πάροχος καινοτόμων λύσεων.</p>',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      companyProfileEN: '<p>Acme Corp is a leading provider of innovative solutions.</p>',          privacyPolicyText: '<p>We respect your privacy and protect your personal data.</p>',          privacyPolicyLink: 'www.acme.com/privacy',           generalTermsText: '<p>By using our services you agree to our terms and conditions.</p>'          },
    { id: 2,  organizationName: 'Globex Inc',          careerSiteAddress: 'jobs.globex.com',            createdAt: '03/22/2022 10:30:00 AM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.globex.com',         careerSiteLanguage: 'en', showAdmissionJobLink: true,  jobsGrouping: 'department', linkColor: '#E63946', buttonColor: '#E63946', acceptTerms: true,  autoReplyTemplate: 'formal',   smsSenderName: 'Globex',     organizationLogo: '', organizationLogoName: '', bgImage: 'https://smartcv.blob.core.windows.net/org-background-images/bb6457da-4a3a-42dc-8232-56eed85613d9.jpg', bgImageName: 'background-globex.jpg',        companyProfileDEFAULT: '<p>Globex Inc drives global excellence in technology.</p>',           companyProfileGR: '<p>Η Globex Inc οδηγεί την παγκόσμια αριστεία στην τεχνολογία.</p>',      companyProfileEN: '<p>Globex Inc drives global excellence in technology.</p>',           privacyPolicyText: '<p>Your data is safe with us. Read our full privacy policy online.</p>',  privacyPolicyLink: 'www.globex.com/privacy',         generalTermsText: '<p>All users must comply with Globex terms of service.</p>'                },
    { id: 3,  organizationName: 'Initech Solutions',   careerSiteAddress: 'careers.initech.com',        createdAt: '06/08/2022 11:15:00 AM', status: 'Inactive', careerSiteStatus: 'inactive', corporateWebsiteAddress: 'www.initech.com',        careerSiteLanguage: 'en', showAdmissionJobLink: false, jobsGrouping: 'none',       linkColor: '#2A9D8F', buttonColor: '#2A9D8F', acceptTerms: false, autoReplyTemplate: 'none',     smsSenderName: 'Initech',    organizationLogo: '', organizationLogoName: '', bgImage: 'https://smartcv.blob.core.windows.net/org-background-images/bb6457da-4a3a-42dc-8232-56eed85613d9.jpg', bgImageName: 'background-initech.jpg',       companyProfileDEFAULT: '<p>Initech Solutions specialises in enterprise software.</p>',       companyProfileGR: '<p>Η Initech Solutions ειδικεύεται σε επιχειρησιακό λογισμικό.</p>',      companyProfileEN: '<p>Initech Solutions specialises in enterprise software.</p>',       privacyPolicyText: '<p>We are committed to safeguarding your personal information.</p>',       privacyPolicyLink: 'www.initech.com/privacy',        generalTermsText: '<p>Terms and conditions apply. Please review before proceeding.</p>'       },
    { id: 4,  organizationName: 'Umbrella Ltd',        careerSiteAddress: 'careers.umbrella.com',       createdAt: '08/19/2022 02:00:00 PM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.umbrella.com',       careerSiteLanguage: 'el', showAdmissionJobLink: true,  jobsGrouping: 'location',   linkColor: '#E9C46A', buttonColor: '#E9C46A', acceptTerms: true,  autoReplyTemplate: 'casual',   smsSenderName: 'Umbrella',   organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Umbrella Ltd is a multinational pharmaceutical company.</p>',     companyProfileGR: '<p>Η Umbrella Ltd είναι πολυεθνική φαρμακευτική εταιρεία.</p>',           companyProfileEN: '<h1>Welcome to the Rich Text Editor</h1> <p>This is a <strong>bold</strong> word, this is <em>italic</em>, and this is <u>underlined</u>.</p> <h2>Lists</h2> <ul> <li>First unordered item</li> <li>Second unordered item</li> <li>Third unordered item</li> </ul> <ol> <li>First ordered item</li> <li>Second ordered item</li> <li>Third ordered item</li> </ol> <h2>Links</h2> <p> Visit <a href="https://example.com" target="_blank">Example Website</a> for more info. </p>', privacyPolicyText: '<p>Umbrella Ltd is fully GDPR compliant.</p>',                             privacyPolicyLink: 'www.umbrella.com/privacy',       generalTermsText: '<p>Use of our career portal implies acceptance of our terms.</p>'          },
    { id: 5,  organizationName: 'Stark Industries',    careerSiteAddress: 'work.stark.com',             createdAt: '11/03/2022 08:45:00 AM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.stark.com',          careerSiteLanguage: 'en', showAdmissionJobLink: true,  jobsGrouping: 'category',   linkColor: '#F4A261', buttonColor: '#F4A261', acceptTerms: true,  autoReplyTemplate: 'default',  smsSenderName: 'Stark',      organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Stark Industries is at the forefront of clean energy.</p>',      companyProfileGR: '<p>Η Stark Industries βρίσκεται στην πρωτοπορία της καθαρής ενέργειας.</p>', companyProfileEN: '<p>Stark Industries is at the forefront of clean energy.</p>',      privacyPolicyText: '<p>We value your privacy. No data is shared without consent.</p>',        privacyPolicyLink: 'www.stark.com/privacy',          generalTermsText: '<p>All employment terms are governed by Stark Industries policy.</p>'      },
    { id: 6,  organizationName: 'Wayne Enterprises',   careerSiteAddress: 'careers.wayne.com',          createdAt: '01/27/2023 03:20:00 PM', status: 'Inactive', careerSiteStatus: 'inactive', corporateWebsiteAddress: 'www.wayne.com',          careerSiteLanguage: 'en', showAdmissionJobLink: false, jobsGrouping: 'none',       linkColor: '#264653', buttonColor: '#264653', acceptTerms: false, autoReplyTemplate: 'none',     smsSenderName: 'Wayne',      organizationLogo: '', organizationLogoName: '', bgImage: 'https://smartcv.blob.core.windows.net/org-background-images/bb6457da-4a3a-42dc-8232-56eed85613d9.jpg', bgImageName: 'background-wayne.jpg',         companyProfileDEFAULT: '<p>Wayne Enterprises is a diversified global conglomerate.</p>',    companyProfileGR: '<p>Η Wayne Enterprises είναι ένας διαφοροποιημένος παγκόσμιος όμιλος.</p>', companyProfileEN: '<p>Wayne Enterprises is a diversified global conglomerate.</p>',   privacyPolicyText: '<p>Wayne Enterprises complies with all applicable data laws.</p>',        privacyPolicyLink: 'www.wayne.com/privacy',          generalTermsText: '<p>General terms are available at our official website.</p>'               },
    { id: 7,  organizationName: 'Cyberdyne Systems',   careerSiteAddress: 'jobs.cyberdyne.com',         createdAt: '04/14/2023 09:10:00 AM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.cyberdyne.com',      careerSiteLanguage: 'de', showAdmissionJobLink: false, jobsGrouping: 'type',       linkColor: '#457B9D', buttonColor: '#457B9D', acceptTerms: true,  autoReplyTemplate: 'custom_1', smsSenderName: 'Cyberdyne',  organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Cyberdyne Systems is a pioneer in artificial intelligence.</p>',  companyProfileGR: '<p>Η Cyberdyne Systems είναι πρωτοπόρος στην τεχνητή νοημοσύνη.</p>',     companyProfileEN: '<p>Cyberdyne Systems is a pioneer in artificial intelligence.</p>',  privacyPolicyText: '<p>All candidate data is stored securely and confidentially.</p>',        privacyPolicyLink: 'www.cyberdyne.com/privacy',      generalTermsText: '<p>By applying you accept our standard terms of engagement.</p>'           },
    { id: 8,  organizationName: 'Soylent Corp',        careerSiteAddress: 'careers.soylent.com',        createdAt: '07/05/2023 01:00:00 PM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.soylent.com',        careerSiteLanguage: 'fr', showAdmissionJobLink: true,  jobsGrouping: 'department', linkColor: '#A8DADC', buttonColor: '#A8DADC', acceptTerms: true,  autoReplyTemplate: 'formal',   smsSenderName: 'Soylent',    organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Soylent Corp is committed to sustainable food solutions.</p>',   companyProfileGR: '<p>Η Soylent Corp δεσμεύεται σε βιώσιμες λύσεις τροφίμων.</p>',          companyProfileEN: '<p>Soylent Corp is committed to sustainable food solutions.</p>',   privacyPolicyText: '<p>We handle your data with care and transparency.</p>',                  privacyPolicyLink: 'www.soylent.com/privacy',        generalTermsText: '<p>Our terms of use are updated regularly. Please review them.</p>'        },
    { id: 9,  organizationName: 'Weyland-Yutani',      careerSiteAddress: 'jobs.weyland-yutani.com',    createdAt: '09/18/2023 10:00:00 AM', status: 'Inactive', careerSiteStatus: 'inactive', corporateWebsiteAddress: 'www.weyland-yutani.com', careerSiteLanguage: 'en', showAdmissionJobLink: false, jobsGrouping: 'none',       linkColor: '#6D6875', buttonColor: '#6D6875', acceptTerms: false, autoReplyTemplate: 'none',     smsSenderName: 'Weyland',    organizationLogo: '', organizationLogoName: '', bgImage: 'https://smartcv.blob.core.windows.net/org-background-images/bb6457da-4a3a-42dc-8232-56eed85613d9.jpg', bgImageName: 'background-weyland.jpg',       companyProfileDEFAULT: '<p>Weyland-Yutani leads in space exploration technology.</p>',     companyProfileGR: '<p>Η Weyland-Yutani ηγείται στην τεχνολογία εξερεύνησης διαστήματος.</p>', companyProfileEN: '<p>Weyland-Yutani leads in space exploration technology.</p>',    privacyPolicyText: '<p>Privacy is a core value at Weyland-Yutani.</p>',                       privacyPolicyLink: 'www.weyland-yutani.com/privacy', generalTermsText: '<p>All legal terms are enforceable under applicable law.</p>'               },
    { id: 10, organizationName: 'Massive Dynamic',     careerSiteAddress: 'careers.massivedynamic.com', createdAt: '12/01/2023 04:30:00 PM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.massivedynamic.com', careerSiteLanguage: 'en', showAdmissionJobLink: true,  jobsGrouping: 'category',   linkColor: '#B5838D', buttonColor: '#B5838D', acceptTerms: true,  autoReplyTemplate: 'default',  smsSenderName: 'MassiveDyn', organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Massive Dynamic is a technology and research conglomerate.</p>',  companyProfileGR: '<p>Η Massive Dynamic είναι όμιλος τεχνολογίας και έρευνας.</p>',          companyProfileEN: '<p>Massive Dynamic is a technology and research conglomerate.</p>',  privacyPolicyText: '<p>We comply with all GDPR regulations and data protection laws.</p>',   privacyPolicyLink: 'www.massivedynamic.com/privacy', generalTermsText: '<p>Terms of service are binding upon registration.</p>'                    },
    { id: 11, organizationName: 'Rekall Inc',          careerSiteAddress: 'careers.rekall.com',         createdAt: '02/10/2024 08:00:00 AM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.rekall.com',         careerSiteLanguage: 'es', showAdmissionJobLink: false, jobsGrouping: 'location',   linkColor: '#1B91FF', buttonColor: '#1B91FF', acceptTerms: true,  autoReplyTemplate: 'casual',   smsSenderName: 'Rekall',     organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Rekall Inc specialises in memory and cognitive solutions.</p>',   companyProfileGR: '<p>Η Rekall Inc ειδικεύεται σε λύσεις μνήμης και γνωστικής επιστήμης.</p>', companyProfileEN: '<p>Rekall Inc specialises in memory and cognitive solutions.</p>',   privacyPolicyText: '<p>Your personal information is never sold to third parties.</p>',        privacyPolicyLink: 'www.rekall.com/privacy',         generalTermsText: '<p>Please read our terms carefully before submitting an application.</p>'  },
    { id: 12, organizationName: 'Tyrell Corporation',  careerSiteAddress: 'work.tyrell.com',            createdAt: '03/15/2024 11:30:00 AM', status: 'Inactive', careerSiteStatus: 'inactive', corporateWebsiteAddress: 'www.tyrell.com',         careerSiteLanguage: 'en', showAdmissionJobLink: false, jobsGrouping: 'none',       linkColor: '#FF6B6B', buttonColor: '#FF6B6B', acceptTerms: false, autoReplyTemplate: 'none',     smsSenderName: 'Tyrell',     organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Tyrell Corporation designs advanced bio-synthetic systems.</p>',  companyProfileGR: '<p>Η Tyrell Corporation σχεδιάζει προηγμένα βιοσυνθετικά συστήματα.</p>', companyProfileEN: '<p>Tyrell Corporation designs advanced bio-synthetic systems.</p>',  privacyPolicyText: '<p>Data collected is used solely for recruitment purposes.</p>',          privacyPolicyLink: 'www.tyrell.com/privacy',         generalTermsText: '<p>All applicants must agree to the terms before proceeding.</p>'          },
    { id: 13, organizationName: 'Omni Consumer',       careerSiteAddress: 'careers.omni.com',           createdAt: '04/20/2024 02:15:00 PM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.omni.com',           careerSiteLanguage: 'en', showAdmissionJobLink: true,  jobsGrouping: 'type',       linkColor: '#4ECDC4', buttonColor: '#4ECDC4', acceptTerms: true,  autoReplyTemplate: 'custom_2', smsSenderName: 'Omni',       organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Omni Consumer Products delivers everyday innovations.</p>',      companyProfileGR: '<p>Η Omni Consumer Products προσφέρει καθημερινές καινοτομίες.</p>',      companyProfileEN: '<p>Omni Consumer Products delivers everyday innovations.</p>',      privacyPolicyText: '<p>We take privacy seriously and act in accordance with the law.</p>',   privacyPolicyLink: 'www.omni.com/privacy',           generalTermsText: '<p>Terms are subject to change. Check back regularly.</p>'                },
    { id: 14, organizationName: 'Bluth Company',       careerSiteAddress: 'jobs.bluth.com',             createdAt: '05/05/2024 09:45:00 AM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.bluth.com',          careerSiteLanguage: 'en', showAdmissionJobLink: false, jobsGrouping: 'department', linkColor: '#45B7D1', buttonColor: '#45B7D1', acceptTerms: true,  autoReplyTemplate: 'default',  smsSenderName: 'Bluth',      organizationLogo: '', organizationLogoName: '', bgImage: 'https://smartcv.blob.core.windows.net/org-background-images/bb6457da-4a3a-42dc-8232-56eed85613d9.jpg', bgImageName: 'background-bluth.jpg',         companyProfileDEFAULT: '<p>Bluth Company is a family-owned real estate developer.</p>',     companyProfileGR: '<p>Η Bluth Company είναι οικογενειακή εταιρεία ανάπτυξης ακινήτων.</p>', companyProfileEN: '<p>Bluth Company is a family-owned real estate developer.</p>',    privacyPolicyText: '<p>We are transparent about how we use your information.</p>',            privacyPolicyLink: 'www.bluth.com/privacy',          generalTermsText: '<p>All applications are subject to standard Bluth terms.</p>'              },
    { id: 15, organizationName: 'Dunder Mifflin',      careerSiteAddress: 'careers.dundermifflin.com',  createdAt: '06/12/2024 03:00:00 PM', status: 'Inactive', careerSiteStatus: 'inactive', corporateWebsiteAddress: 'www.dundermifflin.com',  careerSiteLanguage: 'en', showAdmissionJobLink: false, jobsGrouping: 'none',       linkColor: '#96CEB4', buttonColor: '#96CEB4', acceptTerms: false, autoReplyTemplate: 'none',     smsSenderName: 'Dunder',     organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Dunder Mifflin is a regional paper and office supply company.</p>', companyProfileGR: '<p>Η Dunder Mifflin είναι εταιρεία χαρτιού και γραφικής ύλης.</p>',    companyProfileEN: '<p>Dunder Mifflin is a regional paper and office supply company.</p>',  privacyPolicyText: '<p>Your application data is kept confidential at all times.</p>',        privacyPolicyLink: 'www.dundermifflin.com/privacy',  generalTermsText: '<p>Employment terms follow standard Dunder Mifflin guidelines.</p>'       },
    { id: 16, organizationName: 'Vandelay Industries', careerSiteAddress: 'work.vandelay.com',          createdAt: '07/18/2024 10:20:00 AM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.vandelay.com',       careerSiteLanguage: 'en', showAdmissionJobLink: true,  jobsGrouping: 'category',   linkColor: '#FFEAA7', buttonColor: '#FFEAA7', acceptTerms: true,  autoReplyTemplate: 'formal',   smsSenderName: 'Vandelay',   organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Vandelay Industries is an importer and exporter of latex.</p>',  companyProfileGR: '<p>Η Vandelay Industries είναι εισαγωγέας και εξαγωγέας latex.</p>',      companyProfileEN: '<p>Vandelay Industries is an importer and exporter of latex.</p>',   privacyPolicyText: '<p>We handle all personal data in compliance with GDPR.</p>',            privacyPolicyLink: 'www.vandelay.com/privacy',       generalTermsText: '<p>Standard terms apply to all job applicants.</p>'                       },
    { id: 17, organizationName: 'Pied Piper',          careerSiteAddress: 'careers.piedpiper.com',      createdAt: '08/22/2024 01:00:00 PM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.piedpiper.com',      careerSiteLanguage: 'en', showAdmissionJobLink: false, jobsGrouping: 'location',   linkColor: '#DDA0DD', buttonColor: '#DDA0DD', acceptTerms: true,  autoReplyTemplate: 'custom_1', smsSenderName: 'PiedPiper',  organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Pied Piper is a revolutionary compression technology startup.</p>', companyProfileGR: '<p>Η Pied Piper είναι επαναστατική startup τεχνολογίας συμπίεσης.</p>', companyProfileEN: '<p>Pied Piper is a revolutionary compression technology startup.</p>',  privacyPolicyText: '<p>We are committed to protecting your right to privacy.</p>',           privacyPolicyLink: 'www.piedpiper.com/privacy',      generalTermsText: '<p>By applying you agree to our terms of recruitment.</p>'                },
    { id: 18, organizationName: 'Hooli Tech',          careerSiteAddress: 'jobs.hooli.com',             createdAt: '09/30/2024 08:30:00 AM', status: 'Inactive', careerSiteStatus: 'inactive', corporateWebsiteAddress: 'www.hooli.com',          careerSiteLanguage: 'de', showAdmissionJobLink: false, jobsGrouping: 'none',       linkColor: '#98D8C8', buttonColor: '#98D8C8', acceptTerms: false, autoReplyTemplate: 'none',     smsSenderName: 'Hooli',      organizationLogo: '', organizationLogoName: '', bgImage: 'https://smartcv.blob.core.windows.net/org-background-images/bb6457da-4a3a-42dc-8232-56eed85613d9.jpg', bgImageName: 'background-hooli.jpg',         companyProfileDEFAULT: '<p>Hooli Tech is a Silicon Valley technology giant.</p>',           companyProfileGR: '<p>Η Hooli Tech είναι τεχνολογικός γίγαντας της Silicon Valley.</p>',    companyProfileEN: '<p>Hooli Tech is a Silicon Valley technology giant.</p>',          privacyPolicyText: '<p>Hooli Tech processes data in line with global standards.</p>',        privacyPolicyLink: 'www.hooli.com/privacy',          generalTermsText: '<p>All terms are available in full on our corporate website.</p>'          },
    { id: 19, organizationName: 'Prestige Worldwide',  careerSiteAddress: 'careers.prestige.com',       createdAt: '10/14/2024 04:45:00 PM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.prestige.com',       careerSiteLanguage: 'fr', showAdmissionJobLink: true,  jobsGrouping: 'type',       linkColor: '#F7DC6F', buttonColor: '#F7DC6F', acceptTerms: true,  autoReplyTemplate: 'custom_2', smsSenderName: 'Prestige',   organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Prestige Worldwide is a global entertainment company.</p>',     companyProfileGR: '<p>Η Prestige Worldwide είναι παγκόσμια εταιρεία ψυχαγωγίας.</p>',       companyProfileEN: '<p>Prestige Worldwide is a global entertainment company.</p>',     privacyPolicyText: '<p>We ensure all data is handled responsibly and securely.</p>',         privacyPolicyLink: 'www.prestige.com/privacy',       generalTermsText: '<p>Prestige Worldwide terms govern all recruitment activities.</p>'        },
    { id: 20, organizationName: 'Gekko & Co',          careerSiteAddress: 'work.gekko.com',             createdAt: '11/28/2024 11:00:00 AM', status: 'Active',   careerSiteStatus: 'active',   corporateWebsiteAddress: 'www.gekko.com',          careerSiteLanguage: 'en', showAdmissionJobLink: true,  jobsGrouping: 'department', linkColor: '#BB8FCE', buttonColor: '#BB8FCE', acceptTerms: true,  autoReplyTemplate: 'default',  smsSenderName: 'Gekko',      organizationLogo: '', organizationLogoName: '', bgImage: '', bgImageName: '',                                                                                                                                                     companyProfileDEFAULT: '<p>Gekko & Co is a premier investment and trading firm.</p>',      companyProfileGR: '<p>Η Gekko & Co είναι κορυφαία εταιρεία επενδύσεων και συναλλαγών.</p>', companyProfileEN: '<p>Gekko & Co is a premier investment and trading firm.</p>',      privacyPolicyText: '<p>Gekko & Co is fully compliant with financial data regulations.</p>',  privacyPolicyLink: 'www.gekko.com/privacy',          generalTermsText: '<p>All candidates must review and accept our terms before applying.</p>'  },
];

export const ORGANIZATIONS_columnDefs: ColumnDef[] = [
    {
        key   : 'id',
        label : 'ID',
        hidden: true,
    },
    {
        key     : 'organizationName',
        label   : 'Organization',
        sortable: true,
    },
    {
        key     : 'careerSiteAddress',
        label   : 'Career Site',
        sortable: true,
        render  : (row: RowTableData) => (
            <a
                href={`https://${String(row.careerSiteAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:underline hover:text-link-dark truncate"
                onClick={e => e.stopPropagation()}
            >
                {String(row.careerSiteAddress)}
            </a>
        ),
    },
    {
        key    : 'createdAt',
        label  : 'Created At',
        hidden : true,
        type   : 'date',
    },
    {
        key    : 'status',
        label  : 'Status',
        hidden : true,
    },
    {
        key    : 'careerSiteStatus',
        label  : 'Career Site Status',
        hidden : true,
    },
];

export const ORGANIZATIONS_actionDefs: ActionDef<RowTableData>[] = [
    {
        type   : 'edit',
        label  : 'Edit',
        icon   : <RiEditLine />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    {
        type   : 'delete',
        label  : 'Delete',
        icon   : <RiDeleteBinLine />,
        variant: 'danger',
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
];


export const DEPARTMENTS_MOCK_DATA: RowTableData[] = [
    { id: 1,  departmentName: 'Engineering'         },
    { id: 2,  departmentName: 'Human Resources'     },
    { id: 3,  departmentName: 'Marketing'           },
    { id: 4,  departmentName: 'Sales'               },
    { id: 5,  departmentName: 'Finance'             },
    { id: 6,  departmentName: 'Legal'               },
    { id: 7,  departmentName: 'Operations'          },
    { id: 8,  departmentName: 'Product Management'  },
    { id: 9,  departmentName: 'Design'              },
    { id: 10, departmentName: 'Customer Support'    },
    { id: 11, departmentName: 'IT Infrastructure'   },
    { id: 12, departmentName: 'Research & Development' },
];

export const DEPARTMENTS_columnDefs: ColumnDef[] = [
    {
        key   : 'id',
        label : 'ID',
        hidden: true,
    },
    {
        key     : 'departmentName',
        label   : 'Department',
        sortable: true,
    },
];

export const DEPARTMENTS_actionDefs: ActionDef<RowTableData>[] = [
    {
        type   : 'edit',
        label  : 'Edit',
        icon   : <RiEditLine />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    {
        type   : 'delete',
        label  : 'Delete',
        icon   : <RiDeleteBinLine />,
        variant: 'danger',
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
];

export const QUESTIONS_MOCK_DATA: RowTableData[] = [
    { id: 1, questionId: 1, question: 'Είστε διαθέσιμος/η για συχνά επαγγελματικά ταξίδια στο εξωτερικό;', typeId: 'yes/no', typeName: 'Ναι/Όχι', searchLabel: 'Δυνατότητα ταξιδιών', visibility: 'Administrators', mandatory: true },
    { id: 2, questionId: 2, question: 'Ποια συστήματα ERP γνωρίζετε και έχετε χρησιμοποιήσει;', typeId: 'multipleChoice/multiple', typeName: 'Πολλαπλών επιλογών / Πάνω από μία επιλογές', answers: 'SAP,Entersoft,Softone,Κεφάλαιο,Dynamics', searchLabel: 'Γνώση ERP: SAP, Γνώση ERP: Entersoft, Γνώση ERP: Dynamics, Γνώση ERP: Softone', visibility: 'Administrators, Manager', mandatory: true },
    { id: 3, questionId: 3, question: 'Ποια είναι η διαθεσιμότητά σας για έναρξη εργασίας;', typeId: 'multipleChoice/single', typeName: 'Πολλαπλών επιλογών / Μία επιλογή', answers: 'Άμεσα,Λιγότερο από 1 εβδομάδα,1-2 εβδομάδες,2-3 εβδομάδες,3+ εβδομάδες', searchLabel: 'Διαθεσιμότητα: Άμεσα, Διαθεσιμότητα: 1-2 εβδομάδες, Διαθεσιμότητα: 2-3 εβδομάδες, Διαθεσιμότητα: 3+ εβδομάδες', mandatory: false },
    { id: 4, questionId: 4, question: 'Σύνδεσμος στο portfolio σας (αν υπάρχει):', typeId: 'textSmall', typeName: 'Μικρό κείμενο', mandatory: false },
    { id: 5, questionId: 5, question: 'Τι σας ελκύει στην εταιρεία μας και γιατί θέλετε να γίνετε μέλος της ομάδας μας;', typeId: 'textBig', typeName: 'Μεγαλύτερο κείμενο', mandatory: false },
    { id: 6, questionId: 6, question: 'Εισαγετε το διπλωμα οδηγησης', typeId: 'file', typeName: 'Μεταφόρτωση αρχείου', mandatory: true },
];

export const QUESTIONS_columnDefs: ColumnDef[] = [
    {key : 'id', label : 'ID', hidden: true,},
    {key : 'questionId', label : 'lblQuestion', hidden:true},
    {key : 'question', label : 'lblQuestion'},
    {key : 'typeName', label : 'lblType'},
    {key : 'typeId', label : 'lblType', hidden: true},
    {key : 'searchLabel', label : 'lblSearchLabel', hidden: true},
    {key : 'visibility', label : 'lblQuestionVisibility', hidden: true},
    {key : 'mandatory', label : 'lblQuestionIsMandatory', hidden: true},
];

export const QUESTIONS_actionDefs: ActionDef<RowTableData>[] = [
    {
        type   : 'edit',
        label  : 'Edit',
        icon   : <RiEditLine />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    {
        type   : 'delete',
        label  : 'Delete',
        icon   : <RiDeleteBinLine />,
        variant: 'danger',
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
];


export const ROLES_MOCK_DATA: RowTableData[] = [
    { id: 1,  roleName: 'Administrators'            ,isDefault: true},
    { id: 2,  roleName: 'HR'                        ,isDefault: false},
    { id: 3,  roleName: 'Manager'                   ,isDefault: false},
    { id: 4,  roleName: 'support acme test rolls'   ,isDefault: false},
    { id: 5,  roleName: 'support'                   ,isDefault: false},
    { id: 6,  roleName: 'Users TEST'                ,isDefault: false},
    { id: 7,  roleName: 'HR MANAGER'                ,isDefault: false}
];

export const ROLES_columnDefs: ColumnDef[] = [
    {
        key   : 'id',
        label : 'ID',
        hidden: true,
    },
    {
        key     : 'roleName',
        label   : 'lblRole',
    },
];

export const ROLES_actionDefs: ActionDef<RowTableData>[] = [
    {
        type   : 'edit',
        label  : 'Edit',
        icon   : <RiEditLine />,
        variant: 'primary',
        hidden : (row: RowTableData) => row.isDefault === true,
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    {
        type   : 'delete',
        label  : 'Delete',
        icon   : <RiDeleteBinLine />,
        variant: 'danger',
        hidden : (row: RowTableData) => row.isDefault === true,
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
];


export const TEMPLATES_MOCK_DATA: RowTableData[] = [
    { id: 1, templateId: 1, templateName: 'Test template', templateType: 'Email body', templateTypeId: 'emailBody', templateLang: 'el', templateText: ''},
    { id: 2, templateId: 2, templateName: 'Rejection', templateType: 'Email body', templateTypeId: 'emailBody', templateLang: 'en', templateText: ''},
];

export const TEMPLATES_columnDefs: ColumnDef[] = [
    {
        key   : 'id',
        label : 'ID',
        hidden: true,
    },
    {
        key     : 'templateName',
        label   : 'lblTemplate',
    },
    {
        key     : 'templateType',
        label   : 'lblType',
    },
    {
        key     : 'templateTypeId',
        label   : 'lblType',
        hidden  : true,
    },
    {
        key     : 'templateName',
        label   : 'lblTemplateTitle',
        hidden  : true,
    },
    {
        key     : 'templateLang',
        label   : 'lblLanguage',
    },
    {
        key     : 'templateText',
        label   : 'lblTemplateText',
    },
];

export const TEMPLATES_actionDefs: ActionDef<RowTableData>[] = [
    {
        type   : 'edit',
        label  : 'Edit',
        icon   : <RiEditLine />,
        variant: 'primary',
        hidden : (row: RowTableData) => row.isDefault === true,
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    {
        type   : 'delete',
        label  : 'Delete',
        icon   : <RiDeleteBinLine />,
        variant: 'danger',
        hidden : (row: RowTableData) => row.isDefault === true,
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
];


export const PIPELINES_STAGES_SET_MOCK_DATA: RowTableData[] = [
    { id: 1,  pipelineStageSetName: 'default',                                  isDefault: true  },
    { id: 2,  pipelineStageSetName: 'Σετ Πρόσληψης Οικονομικού Τμήματος',       isDefault: false },
    { id: 3,  pipelineStageSetName: 'Σετ Πρόσληψης Παραγωγής / Εργοστασίου',    isDefault: false },
    { id: 4,  pipelineStageSetName: 'Σετ Πρόσληψης Πωλήσεων',                   isDefault: false },
    { id: 5,  pipelineStageSetName: 'Σετ Τεχνικών Ειδικοτήτων',                 isDefault: false },
    { id: 6,  pipelineStageSetName: 'Σετ Πρόσληψης Μηχανικών',                  isDefault: false },
];

export const PIPELINES_STAGES_SET_columnDefs: ColumnDef[] = [
    {
        key   : 'id',
        label : 'ID',
        hidden: true,
    },
    {
        key     : 'pipelineStageSetName',
        label   : 'lblPipelineStagesSets',
        sortable: true,
    },
];

export const PIPELINES_STAGES_SET_actionDefs: ActionDef<RowTableData>[] = [
    {
        type   : 'edit',
        label  : 'lblEditPipelineStagesSet',
        icon   : <RiEditLine />,
        variant: 'primary',
        hidden : (row: RowTableData) => row.isDefault === true,
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    {
        type   : 'navigate',
        label  : 'lblManagePipelineStages',
        icon   : <RiListCheck />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    {
        type   : 'delete',
        label  : 'lblDeletePipelineStagesSet',
        icon   : <RiDeleteBinLine />,
        variant: 'danger',
        hidden : (row: RowTableData) => row.isDefault === true,
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
];


export const PIPELINE_STAGES_MOCK_DATA: RowTableData[] = [
    { id: 1, rank: 1, stageName: 'Screening',   stageType: '',          visible: false  },
    { id: 2, rank: 2, stageName: 'Phone',       stageType: '',          visible: true  },
    { id: 3, rank: 3, stageName: 'Interview',   stageType: '',          visible: true  },
    { id: 4, rank: 4, stageName: 'Assessment',  stageType: '',          visible: false },
    { id: 5, rank: 5, stageName: 'Offer',       stageType: '',          visible: true  },
    { id: 6, rank: 6, stageName: 'Hired',       stageType: 'hire',      visible: true  },
    { id: 7, rank: 7, stageName: 'Rejection',   stageType: '',          visible: true  },
];

// ─── Fallback used when /pipelineStage/:id API is not available yet ───────────
export const PIPELINE_STAGE_FALLBACK_STATE: PipelineStageFormState = {
    setData  : { setId: 0, setName: '' },
    stageData: [],
};

// ─── Shared stage items ───────────────────────────────────────────────────────
const DEFAULT_STAGES: PipelineStageItem[] = [
    { rank: 1, stageName: 'Screening',  stageTypeId: 1, stageType: '',     defaultMail: 1 },
    { rank: 2, stageName: 'Phone',      stageTypeId: 1, stageType: '',     defaultMail: 2 },
    { rank: 3, stageName: 'Interview',  stageTypeId: 1, stageType: '',     defaultMail: 3 },
    { rank: 4, stageName: 'Assessment', stageTypeId: 2, stageType: '',     defaultMail: 4 },
    { rank: 5, stageName: 'Offer',      stageTypeId: 1, stageType: '',     defaultMail: 5 },
    { rank: 6, stageName: 'Hired',      stageTypeId: 1, stageType: 'hire', defaultMail: 5 },
    { rank: 7, stageName: 'Rejection',  stageTypeId: 3, stageType: '',     defaultMail: 1 },
];

// ─── Per-setId mock map — simulates GET /pipelineStage?setId=:id ──────────────
export const PIPELINE_STAGE_MOCK_BY_SET_ID: Record<number, PipelineStageFormState> = {
    1: { setData: { setId: 1, setName: 'default'                                }, stageData: DEFAULT_STAGES },
    2: { setData: { setId: 2, setName: 'Σετ Πρόσληψης Οικονομικού Τμήματος'    }, stageData: DEFAULT_STAGES },
    3: { setData: { setId: 3, setName: 'Σετ Πρόσληψης Παραγωγής / Εργοστασίου' }, stageData: DEFAULT_STAGES },
    4: { setData: { setId: 4, setName: 'Σετ Πρόσληψης Πωλήσεων'                }, stageData: DEFAULT_STAGES },
    5: { setData: { setId: 5, setName: 'Σετ Τεχνικών Ειδικοτήτων'              }, stageData: DEFAULT_STAGES },
    6: { setData: { setId: 6, setName: 'Σετ Πρόσληψης Μηχανικών'               }, stageData: DEFAULT_STAGES },
};

export const PIPELINE_STAGES_columnDefs: ColumnDef[] = [
    { key: 'id',        label: 'ID',       hidden: true },
    { key: 'rank',      label: 'lblRank',           sortable: false, headerClass: 'text-center', cellClass: 'text-center w-16' },
    { key: 'stageName', label: 'lblPipelineStage',  sortable: false },
    { key: 'stageType', label: 'lblType',           sortable: false, headerClass: 'text-center', cellClass: 'text-center'},
];

export const PIPELINES_STAGES_actionDefs: ActionDef<RowTableData>[] = [
    {
        type   : 'edit',
        label  : 'lblEditPipelineStage',
        icon   : <RiEditLine />,
        variant: 'primary',
        onClick: (row: RowTableData) => editEntry2(String(row.id)),
    },
    {
        type   : 'delete',
        label  : 'lblDeletePipelineStage',
        icon   : <RiDeleteBinLine />,
        variant: 'danger',
        onClick: (row: RowTableData) => deleteEntry(String(row.id)),
    },
];


// Placeholder handler functions
const viewEntry = (id: string) => alert(`View entry ${id}`);
const editEntry = (id: string) => alert(`Edit entry ${id}`);
const editEntry2 = (id: string) => alert(`Edit entry ${id}`);
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

export const USER_ROLE_OPTIONS = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Manager',       label: 'Manager'       },
    { value: 'HR',            label: 'HR'            },
    { value: 'Interviewer',   label: 'Interviewer'   },
    { value: 'Custom',        label: 'Custom'        },
]

export const INPUT_OPTIONS = [
    { value: 'yes/no',                  label: 'lblYesNo' },
    { value: 'multipleChoice/single',   label: 'lblMultipleChoiceSingle' },
    { value: 'multipleChoice/multiple', label: 'lblMultipleChoiceMultiple' },
    { value: 'textSmall',               label: 'lblSmallText' },
    { value: 'textBig',                 label: 'lblBiggerText' },
    { value: 'file',                    label: 'lblFileUpload' }
];

export const TEMPLATE_INPUT_OPTIONS = [
    { value: 'job',       label: 'Job' },
    { value: 'emailBody', label: 'Email body' },
];

export const PIPELINE_STAGES_TYPE_OPTIONS = [
    { value: 'hire', label: 'lblHire' },
];

export const DEFAULT_MAIL_OPTIONS = [
    { value: 1, label: 'option_11' },
    { value: 2, label: 'option_22' },
    { value: 3, label: 'option_33' },
    { value: 4, label: 'option_44' },
    { value: 5, label: 'option_55' },
];

export const USER_STATUS = [
    { value: 'active',      label: 'Active'     },
    { value: 'inactive',    label: 'Inactive'   },
];

export const JOBS_GROUPING_OPTIONS = [
    { value: 'none',        label: 'None'               },
    { value: 'department',  label: 'By Department'      },
    { value: 'location',    label: 'By Location'        },
    { value: 'category',    label: 'By Category'        },
    { value: 'type',        label: 'By Employment Type' },
];

export const AUTO_REPLY_TEMPLATE_OPTIONS = [
    { value: 'default',     label: 'Default Template'        },
    { value: 'formal',      label: 'Formal Reply'            },
    { value: 'casual',      label: 'Casual Reply'            },
    { value: 'custom_1',    label: 'Custom Template 1'       },
    { value: 'custom_2',    label: 'Custom Template 2'       },
    { value: 'none',        label: 'No Auto Reply'           },
];
