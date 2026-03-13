export interface NavigationItem {
    id: string;
    label: string;
    className: string;
    link?: string;
    icon?: string;
    children?: NavigationItem[];
    group?: number;
}