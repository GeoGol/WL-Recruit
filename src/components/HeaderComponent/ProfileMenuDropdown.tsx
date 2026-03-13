import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProfileInternalItems } from '@/utils/SystemLinks';
import { NavigationItem } from '@/models';

// Computed once at module load — ProfileInternalItems is static
const groupedItems = ProfileInternalItems.reduce<Record<number, NavigationItem[]>>((acc, item) => {
    const group = item.group;
    if (group === undefined) return acc;
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
}, {});

const groups = Object.entries(groupedItems).sort(([a], [b]) => Number(a) - Number(b));

const ProfileMenuDropdown = memo(() => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col">
            {groups.map(([group, items]) => (
                <ul key={group} className="p-2 border-b border-light-gray-2 last:border-b-0" data-group={group}>
                    {items.map((item) => (
                        <li key={item.id} className={item.className}>
                            <Link
                                target={item.link?.startsWith('http') ? '_blank' : '_self'}
                                to={item.link ?? "#"}
                                className="inline-flex items-center w-full px-3 py-2 text-md"
                            >
                                {t(item.label)}
                            </Link>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
});

ProfileMenuDropdown.displayName = 'ProfileMenuDropdown';

export default ProfileMenuDropdown;
