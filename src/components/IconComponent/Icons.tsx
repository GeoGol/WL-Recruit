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
        <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z" transform="scale(-1,1) translate(-24,0)" />
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

