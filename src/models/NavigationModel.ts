import type {RemixiconComponentType} from "@/components/IconComponent/Icons";

export interface NavigationItem {
    id: string;
    label: string;
    className: string;
    link?: string;
    icon?: RemixiconComponentType;
    children?: NavigationItem[];
    group?: number;
}