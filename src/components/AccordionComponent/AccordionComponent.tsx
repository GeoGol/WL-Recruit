import {  memo, useState, Children, isValidElement, cloneElement } from 'react';
import AccordionItem from './AccordionItem';
import { HybridAccordionProps} from '@/models';


const AccordionComponent = memo((props: Readonly<HybridAccordionProps>) => {
    const {
        items,
        multiple = false,
        defaultOpen = [],
        className = '',
        children,
    } = props;

    const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

    const handleToggle = (id: string) => {
        setOpenIds(prev => {
            const isOpen = prev.includes(id);
            if (isOpen) return prev.filter(i => i !== id);
            return multiple ? [...prev, id] : [id];
        });
    };

    // If children are provided, render them directly (custom mode)
    if (children) {
        // Optionally, inject open/close logic into children if needed
        return (
            <div className={`w-full rounded-lg ${className}`}>
                {Children.map(children, (child, idx) => {
                    if (!isValidElement(child)) return child;
                    // Try to inject open/close logic if child is AccordionItem
                    const id = child.props?.item?.id;
                    return cloneElement(child, {
                        isOpen: id ? openIds.includes(id) : undefined,
                        onToggle: id ? handleToggle : undefined,
                        isFirst: idx === 0,
                        isLast: idx === Children.count(children) - 1,
                    });
                })}
            </div>
        );
    }

    // Default: render from items prop
    return (
        <div className={`w-full rounded-lg ${className}`}>
            {items?.map((item, idx) => (
                <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openIds.includes(item.id)}
                    onToggle={handleToggle}
                    isFirst={idx === 0}
                    isLast={idx === items.length - 1}
                />
            ))}
        </div>
    );
});

AccordionComponent.displayName = 'AccordionComponent';

export default AccordionComponent;
