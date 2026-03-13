import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SettingsInternalItems } from '@/utils/SystemLinks';

const SettingsMenuDropdown = memo(() => {
    const { t } = useTranslation();

    return (
        <ul className="p-2">
            {SettingsInternalItems.map((item) => (
                <li key={item.id} className={item.className}>
                    <Link
                        target="_self"
                        to={item.link ?? "#"}
                        className="inline-flex items-center w-full px-3 py-2 text-md"
                    >
                        {t(item.label)}
                    </Link>
                </li>
            ))}
        </ul>
    );
});

SettingsMenuDropdown.displayName = 'SettingsMenuDropdown';

export default SettingsMenuDropdown;
