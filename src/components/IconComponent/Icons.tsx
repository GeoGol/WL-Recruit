/**
 * Local SVG icon components — replaces @remixicon/react entirely.
 * Only includes the icons actually used in this project.
 * Each icon is a pure inline SVG — zero extra bundle weight.
 */
import type { SVGProps } from 'react';

export type RemixiconComponentType = React.FC<SVGProps<SVGSVGElement> & { size?: number | string }>;


const iconDefaults = (size: number | string = 24) => ({
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    fill: 'currentColor',
});

export const RiSearchLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
    </svg>
);

export const RiCloseLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
    </svg>
);

export const RiSettings3Line: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
);

export const RiMenu3Line: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z" />
    </svg>
);

export const RiArrowDownSLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
    </svg>
);

// ─── Editor toolbar icons ─────────────────────────────────────────────────────

export const RiBold: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8z" />
    </svg>
);

export const RiItalic: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" />
    </svg>
);

export const RiUnderline: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" />
    </svg>
);

export const RiStrikethrough: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.72H17.154zM11.586 4c1.868 0 3.267.48 4.196 1.444S17.21 7.42 17.21 8.923a3.8 3.8 0 0 1-.378 1.717H14.48a2.106 2.106 0 0 0 .382-1.217c0-.61-.158-1.139-.474-1.585-.316-.446-.785-.795-1.406-1.048H4V5h7.586zM4 13v-2h16v2H4z" />
    </svg>
);

export const RiListUnordered: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
    </svg>
);

export const RiListOrdered: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
    </svg>
);

export const RiAlignLeft: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" />
    </svg>
);

export const RiAlignCenter: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M3 4h18v2H3V4zm3 7h12v2H6v-2zm-3 7h18v2H3v-2z" />
    </svg>
);

export const RiAlignRight: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z"/>
    </svg>
);

export const RiH1: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" />
    </svg>
);

export const RiH2: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" />
    </svg>
);

export const RiDoubleQuotesL: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
);

export const RiLinkM: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.878l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.415zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" />
    </svg>
);

export const RiLinkUnlink: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M17 17h5v2h-5v-2zm-3-6h8v2h-8v-2zM2 5l4.55 4.55a5.002 5.002 0 0 0 6.913 6.913L16 19l-1 1L2 7l1-2zm16.734.808A5.002 5.002 0 0 1 20 10h-2a3 3 0 0 0-4.58-2.552L12 6.027A5.002 5.002 0 0 1 18.734 5.808zM14 10h-2a3 3 0 0 0-4.58 2.552L6 13.973A5.002 5.002 0 0 1 14 10z" />
    </svg>
);

export const RiArrowGoBackLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z" />
    </svg>
);

export const RiArrowGoForwardLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M16 7h-5a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h5V1l6 5-6 5V7z" />
    </svg>
);

export const RiIndentIncrease: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M3 4h18v2H3V4zm0 14h18v2H3v-2zm4-7h14v2H7v-2zm-4-.828 3.536 3.535-1.415 1.415L2 11l3.121-3.121 1.415 1.414L3 12.172zM3 11v2-2z" />
    </svg>
);

export const RiIndentDecrease: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M3 4h18v2H3V4zm0 14h18v2H3v-2zm4-7h14v2H7v-2zm-2.121-.707 1.414 1.414L3 15.828l-1.414-1.414 3.293-3.293L1.172 7.828 2.586 6.414 6.586 10.414 5.172 11.828 2.879 11.293z" />
    </svg>
);

export const RiExternalLinkLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
    </svg>
);

export const RiPencilLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
    </svg>
);

export const RiVideoOnLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M17 9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V5C1 4.44772 1.44772 4 2 4H16C16.5523 4 17 4.44772 17 5V9.2ZM17 12.3587L21 15.1587V8.84131L17 11.6413V12.3587ZM3 6V18H15V6H3Z"/>
    </svg>
);

export const RiFileChartLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M11 7H13V17H11V7ZM15 11H17V17H15V11ZM7 13H9V17H7V13ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"/>
    </svg>
);

export const RiMailLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"/>
    </svg>
);

export const RiGroupLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"/>
    </svg>
);

export const RiLinksLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"/>
    </svg>
);

export const RiArrowLeftDoubleLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z"/>
    </svg>
);

export const RiArrowUpSLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" />
    </svg>
);

export const RiExpandUpDownLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M12 4.586l-4.95 4.95-1.414-1.414L12 1.757l6.364 6.365-1.414 1.414L12 4.586zM12 19.414l4.95-4.95 1.414 1.414L12 22.243l-6.364-6.365 1.414-1.414L12 19.414z" />
    </svg>
);

export const RiCheckboxLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11l-3.536-3.536 1.415-1.414 2.121 2.122 4.242-4.243 1.415 1.414L11.003 16z" />
    </svg>
);

export const RiCheckboxBlankLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z" />
    </svg>
);

export const RiArrowLeftSLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"/>
    </svg>
);

export const RiArrowRightSLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"/>
    </svg>
);

export const RiArrowRightDoubleLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"/>
    </svg>
);

export const RiInformationLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"/>
    </svg>
);

export const RiCheckLine: RemixiconComponentType = ({ size = 24, ...props }) => (
    <svg {...iconDefaults(size)} {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"/>
    </svg>
);

