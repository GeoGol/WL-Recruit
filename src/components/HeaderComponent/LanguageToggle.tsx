import { memo, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropdown } from '@/hooks/useDropdown';
import { FlagEN, FlagEL } from '@/components/IconComponent/Flags';
import ButtonComponent from '@/components/FormComponents/ButtonComponent';
import {t} from "i18next";

const LANGUAGES = [
    { code: 'en', label: 'English',  Flag: FlagEN },
    { code: 'el', label: 'Ελληνικά', Flag: FlagEL },
] as const;

type LangCode = typeof LANGUAGES[number]['code'];


const LanguageToggle = memo(() => {
    const { i18n }    = useTranslation();
    const current     = (i18n.language?.slice(0, 2) ?? 'en') as LangCode;
    const currentLang = LANGUAGES.find(l => l.code === current) ?? LANGUAGES[0];

    const ref                    = useRef<HTMLDivElement>(null);
    const { openId, toggle }     = useDropdown([ref]);
    const isOpen                 = openId === 'lang';

    const handleToggle = useCallback(() => toggle('lang'), [toggle]);

    const handleSelect = useCallback((code: LangCode) => {
        i18n.changeLanguage(code);
        toggle('lang');
    }, [i18n, toggle]);

    const triggerFlagNode = <currentLang.Flag className="w-6 h-6 text-secondary" />;
    // const arrowNode       = <RiArrowDownSLine className={`w-4 h-4 text-gray-500 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />;

    return (
        <div className="relative" ref={ref}>


            {/* Trigger */}
            <ButtonComponent
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label={t('lblSelectLanguage')}
                className="!w-8 !h-8 !p-0 text-sm font-bold "
                // label={currentLang.label}
                leftIcon={triggerFlagNode}
                // rightIcon={arrowNode}
            />

            {/* Dropdown */}
            {isOpen && (
                <div
                    role="menu"
                    aria-label="Language"
                    className="absolute right-0 top-10 w-30 bg-surface border border-main rounded-md shadow-lg z-50"
                >
                    <ul className="p-2">
                        {LANGUAGES.map(({ code, label, Flag }) => (
                            <li key={code}>
                                <ButtonComponent
                                    key={code}
                                    variant="ghost"
                                    size="sm"
                                    fullWidth
                                    role="menuitem"
                                    onClick={() => handleSelect(code)}
                                    label={label}
                                    leftIcon={<Flag className="h-4 w-4 flex-shrink-0" />}
                                    className={[
                                        '!justify-start rounded-md text-primary cursor-pointer !text-md',
                                        current === code ? 'bg-base font-semibold' : '',
                                    ].join(' ')}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

LanguageToggle.displayName = 'LanguageToggle';

export default LanguageToggle;
