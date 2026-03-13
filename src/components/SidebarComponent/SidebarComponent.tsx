import React, {useEffect, useState} from "react";
import {useMediaQuery} from "@/context/MediaQueryContext";
import {NavigationItems} from "@/utils/SystemLinks";
import {RiArrowDownSLine} from "@remixicon/react";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface SidebarComponentProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SidebarComponent = ({ isOpen = false, onClose }: SidebarComponentProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { isDesktop } = useMediaQuery();

  const location = useLocation();

  const isActive = (link?: string) => location.pathname === `/${link}`;

  const [activeNavItem, setActiveNavItem] = useState<string>();

  const toggleParentItem = (id: string) => {
    setActiveNavItem(id)
  }

  useEffect(() => {
    if (isDesktop !== undefined) {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [isDesktop]);

  if (loading) {
    return (
        <div className="w-full max-w-[260px] min-h-24 flex items-center justify-center flex-col p-6">
          <div className={"items-center w-full"}>
            <span className="bg-gray-300 h-2 w-32 block rounded animate-pulse"></span>
            <span className="bg-gray-300 h-2 w-52 block rounded my-1 animate-pulse"></span>
            <span className="bg-gray-300 h-2 w-40 block rounded animate-pulse"></span>
          </div>
        </div>
    );
  }

  const renderSidebarList = () => {
    return (
        <ul className = "flex-1 overflow-y-auto space-y-2 font-medium">
          {NavigationItems.map((item, i) => (
              <li key={item.id}>
                {item.children
                    ?
                    <>
                      <button
                          type="button"
                          aria-label={`sublist-${item.id}`}
                          aria-controls={`sublist-${item.id}`}
                          data-collapse-toggle={`sublist-${item.id}`}
                          onClick={() => toggleParentItem(item.id)}
                          className="flex items-center w-full justify-between px-2 py-1.5 text-primary hover:bg-base rounded-md group"
                      >
                        <span className = "flex-1 text-left rtl:text-right whitespace-nowrap">{t(item.label)}</span>

                        <RiArrowDownSLine className="w-5 h-5" />
                      </button>

                      <ul id={`sublist-${item.id}`} className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${item.id === activeNavItem ? '' : 'max-h-0'}`}>
                        {item.children.map((subItem, i) => (
                            <li key={i}>
                              <Link
                                  target={"_self"}
                                  to={`/${subItem.link ?? '#'}`}
                                  className={`ms-5 flex items-center px-2 py-1.5 text-primary hover:bg-base rounded-md group ${isActive(subItem.link) ? 'font-semibold' : ''}`}>
                                {t(`${subItem.label}`)}
                              </Link>
                            </li>
                        ))}

                      </ul>
                    </>
                    :
                    <Link
                        key={i}
                        target={"_self"}
                        to={`/${item.link ?? '#'}`}
                        onClick={() => toggleParentItem(item.id)}
                        className={`flex items-center px-2 py-1.5 text-primary hover:bg-base rounded-md group ${isActive(item.link) ? 'font-semibold' : ''}`}>
                      <span>{t(`${item.label}`)}</span>
                    </Link>
                }

              </li>
          ))}
        </ul>
    )
  }


  return (
      <>
        {isDesktop && !loading && (
            <aside
                className="fixed top-16 left-0 z-40 w-64 h-[calc(100vh-64px)] transition-transform translate-x-0"
                aria-label="Sidebar">
              <div className="h-full flex flex-col overflow-hidden bg-surface border-e border-default">
                {renderSidebarList()}
              </div>
            </aside>
        )}

        {!isDesktop && !loading && (
            <>
              {isOpen && (
                  <div className="fixed inset-0 z-30 bg-black/40" onClick={onClose}/>
              )}
              <div className={`fixed top-16 right-0 z-40 w-full h-[calc(100vh-64px)] p-4 overflow-hidden transition-transform duration-300 bg-surface border-e border-default flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {renderSidebarList()}
              </div>
            </>
        )}

      </>
  );
};

export default SidebarComponent;
