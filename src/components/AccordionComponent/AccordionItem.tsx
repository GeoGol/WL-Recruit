import { memo } from 'react';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';
import {AccordionItemProps} from "@/models";


const AccordionItem = memo(({ item, isOpen, onToggle, isFirst, isLast }: Readonly<AccordionItemProps>) => {
    return (
        <div className={`border border-main bg-surface ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''} ${!isFirst ? '-mt-px' : ''}`}>
            <AccordionHeader
                item={item}
                isOpen={isOpen}
                onToggle={onToggle}
                isFirst={isFirst}
                isLast={isLast}
            />
            <AccordionBody
                item={item}
                isOpen={isOpen}
            />
        </div>
    );
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
