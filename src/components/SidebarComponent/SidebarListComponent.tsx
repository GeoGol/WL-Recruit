import { memo, useState, useCallback } from 'react';
import { NavigationItems } from '@/utils/SystemLinks';
import { RiArrowDownSLine } from '@/components/IconComponent/Icons';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SidebarListProps {
    onLinkClick?: () => void;
}

const SidebarListComponent = memo(({ onLinkClick }: SidebarListProps) => {
    const { t } = useTranslation();
    const location = useLocation();
    const [activeNavItem, setActiveNavItem] = useState<string | undefined>();

    const isActive = useCallback(
        (link?: string) => location.pathname === `/${link}`,
        [location.pathname]
    );

    const handleToggle = useCallback((id: string) => {
        setActiveNavItem(prev => prev === id ? undefined : id);
    }, []);

    return (
        <ul className="flex-1 overflow-y-auto space-y-2 font-medium">
            {NavigationItems.map((item) => (
                <li key={item.id}>
                    {item.children ? (
                        <>
                            <button
                                type="button"
                                aria-label={`sublist-${item.id}`}
                                aria-controls={`sublist-${item.id}`}
                                data-collapse-toggle={`sublist-${item.id}`}
                                onClick={() => handleToggle(item.id)}
                                className="flex items-center w-full justify-between px-2 py-1.5 text-primary hover:bg-base rounded-md group"
                            >
                                <span className="flex-1 text-left rtl:text-right whitespace-nowrap">{t(item.label)}</span>
                                <RiArrowDownSLine className="w-5 h-5" />
                            </button>
                            <ul
                                id={`sublist-${item.id}`}
                                className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${item.id === activeNavItem ? '' : 'max-h-0'}`}
                            >
                                {item.children.map((subItem) => (
                                    <li key={subItem.id}>
                                        <Link
                                            target="_self"
                                            to={`/${subItem.link ?? '#'}`}
                                            onClick={onLinkClick}
                                            className={`ms-5 flex items-center px-2 py-1.5 text-primary hover:bg-base rounded-md group ${isActive(subItem.link) ? 'font-semibold' : ''}`}
                                        >
                                            {t(subItem.label)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <Link
                            target="_self"
                            to={`/${item.link ?? '#'}`}
                            onClick={() => { setActiveNavItem(item.id); onLinkClick?.(); }}
                            className={`flex items-center px-2 py-1.5 text-primary hover:bg-base rounded-md group ${isActive(item.link) ? 'font-semibold' : ''}`}
                        >
                            <span>{t(item.label)}</span>
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
});

SidebarListComponent.displayName = 'SidebarListComponent';

export default SidebarListComponent;
