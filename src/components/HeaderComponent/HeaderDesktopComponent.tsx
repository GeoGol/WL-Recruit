import { memo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import WorklifeRecruitLogo from '@/components/IconComponent/WorklifeRecruitLogo';
import { useDropdown } from '@/hooks/useDropdown';
import { RiSettings3Line } from '@/components/IconComponent/Icons';
import SearchBarComponent from '@/components/FormComponents/SearchBarComponent';
import ProfileMenuDropdown from '@/components/HeaderComponent/ProfileMenuDropdown';
import SettingsMenuDropdown from '@/components/HeaderComponent/SettingsMenuDropdown';
import LanguageToggle from '@/components/HeaderComponent/LanguageToggle';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';

// Constant outside component — never re-created
const USER_INITIALS = 'GG';

const HeaderDesktopComponent = memo(() => {
    const settingsRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);
    const { openId, toggle } = useDropdown([settingsRef, userRef]);

    const toggleSettings = useCallback(() => toggle('settings'), [toggle]);
    const toggleProfile = useCallback(() => toggle('profile'), [toggle]);
    const handleSearch = useCallback((_val: string) => { /* implement search */ }, []);

    return (
        <header className="flex w-full h-16 border-b border-main sticky top-0 left-0 z-50 bg-surface">
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

                <div className="flex justify-start items-center w-full">
                    <SearchBarComponent
                        sizing="lg"
                        maxWidth="w-full max-w-96"
                        onSearch={handleSearch}
                    />
                </div>

                <div className="flex justify-end items-center gap-4 relative">
                    <LanguageToggle />

                    {/* Settings */}
                    <div className="relative" ref={settingsRef}>
                        <ButtonComponent
                            variant="ghost"
                            size="sm"
                            aria-label="Settings"
                            onClick={toggleSettings}
                            aria-expanded={openId === 'settings'}
                            aria-haspopup="menu"
                            className="!w-8 !h-8 !p-0 text-sm font-bold text-muted"
                            leftIcon={<RiSettings3Line className="w-6 h-6 text-secondary" />}
                        />
                        {openId === 'settings' && (
                            <div className="absolute right-0 top-10 w-48 bg-surface border border-main rounded-md shadow-lg z-50">
                                <SettingsMenuDropdown />
                            </div>
                        )}
                    </div>

                    {/* User avatar */}
                    <div className="relative" ref={userRef}>
                        <ButtonComponent
                            variant="primary"
                            size="sm"
                            pill
                            aria-label="User menu"
                            onClick={toggleProfile}
                            aria-expanded={openId === 'profile'}
                            aria-haspopup="menu"
                            label={USER_INITIALS}
                            className="!w-8 !h-8 !p-0 text-sm font-bold text-muted"
                        />
                        {openId === 'profile' && (
                            <div className="absolute right-0 top-10 w-48 bg-surface border border-main rounded-md shadow-lg z-50">
                                <ProfileMenuDropdown />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
});

HeaderDesktopComponent.displayName = 'HeaderDesktopComponent';

export default HeaderDesktopComponent;
