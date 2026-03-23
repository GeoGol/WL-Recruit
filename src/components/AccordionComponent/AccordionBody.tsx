import React from 'react';
import { AccordionItemProps } from '@/models';

interface AccordionBodyProps {
    item: AccordionItemProps['item'];
    isOpen: boolean;
}

const AccordionBody: React.FC<AccordionBodyProps> = ({ item, isOpen }) => (
    <section
        id={`accordion-body-${item.id}`}
        aria-label={item.title}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
        <div className="px-4 py-4 border-t border-main text-primary">
            {item.content}
        </div>
    </section>
);

export default AccordionBody;

