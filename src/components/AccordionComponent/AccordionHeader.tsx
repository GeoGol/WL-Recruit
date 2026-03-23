import React from 'react';
import { RiArrowDownSLine } from '@/components/IconComponent/Icons';
import { AccordionItemProps } from '@/models';

interface AccordionHeaderProps {
    item: AccordionItemProps['item'];
    isOpen: boolean;
    onToggle: (id: string) => void;
    isFirst: boolean;
    isLast: boolean;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ item, isOpen, onToggle, isFirst, isLast }) => (
    <button
        type="button"
        disabled={item.disabled}
        onClick={() => onToggle(item.id)}
        className={[
            'flex items-center justify-between w-full p-3 text-left font-medium text-primary text-lg focus:outline-none transition-colors duration-200 group',
            isOpen ? 'bg-primary font-semibold' : 'hover:bg-primary',
            item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            isFirst && !isOpen ? 'rounded-t-lg' : '',
            isLast && !isOpen ? 'rounded-b-lg' : '',
        ].filter(Boolean).join(' ')}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${item.id}`}
    >
        <span className="flex items-center gap-2">
            {item.icon &&
                <span className= {`${isOpen ? 'text-primary font-semibold' : 'text-secondary'} group-hover:font-semibold group-hover:text-primary`}>{item.icon}</span>
            }
            {item.title}
        </span>
        <RiArrowDownSLine
            className={`${isOpen ? 'text-primary font-semibold' : 'text-secondary'} group-hover:font-semibold group-hover:text-primary w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
    </button>
);

export default AccordionHeader;

