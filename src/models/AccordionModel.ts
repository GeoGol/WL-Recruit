import {ReactNode} from "react";


export  interface HybridAccordionProps extends Partial<AccordionComponentProps> {
    children?: ReactNode;
}

export interface AccordionItem {
    id       : string;
    title    : string;
    icon?    : ReactNode;
    content  : ReactNode;
    disabled?: boolean;
}

export interface AccordionComponentProps {
    items       : AccordionItem[];
    multiple?   : boolean;   // allow multiple open at once
    defaultOpen?: string[];  // ids of items open by default
    className?  : string;
}

export interface AccordionItemProps {
    item    : AccordionItem;
    isOpen  : boolean;
    onToggle: (id: string) => void;
    isFirst : boolean;
    isLast  : boolean;
}