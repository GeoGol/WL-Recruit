import { useSortable } from '@dnd-kit/sortable';
import { CSS }         from '@dnd-kit/utilities';
import { RiDraggable } from '@/components/IconComponent/Icons';

interface SortableRowProps {
    id       : string | number;
    children : React.ReactNode;
    className: string;
    onClick? : () => void;
}

export default function SortableRow({ id, children, className, onClick }: Readonly<SortableRowProps>) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style: React.CSSProperties = {
        transform : CSS.Transform.toString(transform),
        transition,
        opacity   : isDragging ? 0.4 : 1,
        zIndex    : isDragging ? 999 : undefined,
        position  : isDragging ? 'relative' : undefined,
    };

    return (
        <tr ref={setNodeRef} style={style} className={className} onClick={onClick}>
            {/* Drag handle — first cell */}
            <td className="w-10 px-3 cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
                <RiDraggable className="text-muted" size={16} />
            </td>
            {children}
        </tr>
    );
}

