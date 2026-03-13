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

