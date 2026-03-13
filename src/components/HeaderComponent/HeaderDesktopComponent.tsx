import React, {useMemo, useRef} from "react";
import {Link} from "react-router-dom";
import WorklifeRecruitLogo from "@/components/IconComponent/WorklifeRecruitLogo";
import {useDropdown} from "@/hooks/useDropdown";
import { RiSettings3Line } from "@remixicon/react";
import SearchBarComponent from "@/components/FormComponents/SearchBarComponent";
import {ProfileInternalItems, SettingsInternalItems} from "@/utils/SystemLinks";
import {useTranslation} from "react-i18next";
import {NavigationItem} from "@/models";

const HeaderDesktopComponent: React.FC = () => {
    const { t } = useTranslation();

    const settingsRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);
    const { openId, toggle } = useDropdown([settingsRef, userRef]);

    const userInitials = "GG";

    const groupedItems = useMemo(() => {
        return ProfileInternalItems.reduce<Record<number, NavigationItem[]>>((acc, item) => {
            const group = item.group;
            if (group === undefined) return acc;
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(item);
            return acc;
        }, {});
    }, []);

    const renderGroupedItems = () => {
        const groups = Object.entries(groupedItems)
            .sort(([a], [b]) => Number(a) - Number(b));

        return (
            <div className="flex flex-col">
                {groups.map(([group, items]) => (
                    <ul key={group} className={'p-2 border-b border-light-gray-2 last:border-b-0'} data-group={group}>
                        {items.map((item) => (
                            <li key={item.id} className={item.className}>
                                <Link
                                    target={item.link?.startsWith('http') ? "_blank" : "_self"}
                                    to={'#'}
                                    // to={item.link ?? '#'}
                                    className="inline-flex items-center w-full px-3 py-2 text-md">{t(`${item.label}`)}</Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        );
    };

    return (
        <header className="flex w-full h-16 border-b border-gray-200 sticky top-0 left-0 z-50 bg-surface">
            <div className="p-3 flex items-center justify-between w-full h-full gap-6">
                <div className="max-w-56 w-full h-full">
                    <Link
                        to='/'
                        target="_self"
                        rel="noopener noreferrer"
                        aria-label={'Worklife Recruit'}
                        className="flex-shrink-0 h-full inline-flex items-center w-full"
                    >
                        <WorklifeRecruitLogo className="h-full w-auto text-primary" />
                    </Link>
                </div>
                <div className={'flex justify-start items-center w-full'}>
                    <SearchBarComponent
                        sizing={'lg'}
                        // fullWidth={true}
                        maxWidth={'w-full max-w-96'}
                        onSearch={(val) => console.log(val)} />
                </div>
                <div className="flex justify-end items-center gap-4 relative">

                    <div className="relative" ref={settingsRef}>
                        <button
                            type="button"
                            aria-label="Settings"
                            onClick={() => toggle('settings')}
                            className="flex justify-center items-center w-8 h-8"
                        >
                            <RiSettings3Line className="w-6 h-6 text-secondary" />
                        </button>
                        {openId === 'settings' && (
                            <div className="absolute right-0 top-10 w-48 bg-surface border border-gray-200 rounded-md shadow-lg z-50">
                                <ul className={'p-2'}>
                                    {SettingsInternalItems.map((item, i) => (
                                        <li key={item.id} className={item.className}>
                                            <Link
                                                key={i}
                                                target={"_self"}
                                                to={'#'}
                                                // to={item.link ?? '#'}
                                                className="inline-flex items-center w-full px-3 py-2 text-md">{t(`${item.label}`)}</Link>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        )}
                    </div>

                    {/* User Initials Dropdown */}
                    <div className="relative" ref={userRef}>
                        <button
                            type="button"
                            aria-label="User menu"
                            onClick={() => toggle('profile')}
                            className="rounded-full bg-primary text-sm text-muted font-bold w-8 h-8 flex items-center justify-center focus:outline-none"
                        >
                            {userInitials}
                        </button>
                        {openId === 'profile' && (
                            <div className="absolute right-0 top-10 w-48 bg-surface border border-gray-200 rounded-md shadow-lg z-50">
                                {renderGroupedItems()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>

    );
}

export default HeaderDesktopComponent;
