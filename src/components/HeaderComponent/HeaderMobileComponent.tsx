import { memo, useRef, useState, useCallback } from 'react';
import { useDropdown } from '@/hooks/useDropdown';
import { Link } from 'react-router-dom';
import WorklifeRecruitLogo from '@/components/IconComponent/WorklifeRecruitLogo';
import { RiCloseLine, RiMenu3Line, RiSettings3Line } from '@/components/IconComponent/Icons';
import SidebarComponent from '@/components/SidebarComponent/SidebarComponent';
import ProfileMenuDropdown from '@/components/HeaderComponent/ProfileMenuDropdown';
import SettingsMenuDropdown from '@/components/HeaderComponent/SettingsMenuDropdown';

const USER_INITIALS = 'GG';

const HeaderMobileComponent = memo(() => {
    const settingsRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);
    const { openId, toggle } = useDropdown([settingsRef, userRef]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSettings = useCallback(() => toggle('settings'), [toggle]);
    const toggleProfile = useCallback(() => toggle('profile'), [toggle]);
    const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
    const closeSidebar = useCallback(() => setSidebarOpen(false), []);

    return (
        <header className="flex w-full h-16 border-b border-gray-200 sticky top-0 left-0 z-50 bg-surface">
            <div className="p-3 flex items-center justify-between w-full h-full gap-6">
                <div className="max-w-56 w-full h-full">
                    <Link
                        to="/"
                        target="_self"
                        rel="noopener noreferrer"
                        aria-label="Worklife Recruit"
                        className="flex-shrink-0 h-full inline-flex items-center w-full"
                    >
                        <WorklifeRecruitLogo className="h-full w-auto text-primary" />
                    </Link>
                </div>

                <div className="flex justify-end items-center gap-4 relative">
                    <div className="relative" ref={settingsRef}>
                        <button
                            type="button"
                            aria-label="Settings"
                            onClick={toggleSettings}
                            className="flex justify-center items-center w-8 h-8"
                        >
                            <RiSettings3Line className="w-6 h-6 text-secondary" />
                        </button>
                        {openId === 'settings' && (
                            <div className="absolute right-0 top-10 w-48 bg-surface border border-gray-200 rounded-md shadow-lg z-50">
                                <SettingsMenuDropdown />
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={userRef}>
                        <button
                            type="button"
                            aria-label="User menu"
                            onClick={toggleProfile}
                            className="rounded-full bg-primary text-sm text-muted font-bold w-8 h-8 flex items-center justify-center focus:outline-none"
                        >
                            {USER_INITIALS}
                        </button>
                        {openId === 'profile' && (
                            <div className="absolute right-0 top-10 w-48 bg-surface border border-gray-200 rounded-md shadow-lg z-50">
                                <ProfileMenuDropdown />
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="inline-flex items-center text-sm text-gray-500 rounded-lg lg:hidden"
                        aria-label="mobile-menu-2"
                        aria-controls="mobile-menu-2"
                        aria-expanded={sidebarOpen}
                    >
                        {sidebarOpen ? (
                            <RiCloseLine className="w-8 h-8" />
                        ) : (
                            <RiMenu3Line className="w-8 h-8" />
                        )}
                    </button>

                    <SidebarComponent isOpen={sidebarOpen} onClose={closeSidebar} />
                </div>
            </div>
        </header>
    );
});

HeaderMobileComponent.displayName = 'HeaderMobileComponent';

export default HeaderMobileComponent;