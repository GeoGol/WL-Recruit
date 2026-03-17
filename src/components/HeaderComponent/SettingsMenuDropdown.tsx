import {memo, useCallback} from 'react';
import {Link, useLocation} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SettingsInternalItems } from '@/utils/SystemLinks';

const SettingsMenuDropdown = memo(() => {
    const { t } = useTranslation();

    const { pathname } = useLocation();

    const isActive = useCallback(
        (link?: string) => pathname === `/${link}`,
        [pathname]
    )

    return (
        <ul className="p-2">
            {SettingsInternalItems.map((item) => (
                <li key={item.id} className={item.className}>
                    <Link
                        target="_self"
                        to={`/${item.link ?? '#'}`}
                        className= {`inline-flex items-center w-full px-3 py-2 text-md ${isActive(item.link) ? 'font-semibold' : ''}`}
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
