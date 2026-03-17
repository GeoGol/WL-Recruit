import { memo } from "react";
import { useMediaQuery } from "@/context/MediaQueryContext";
import SidebarListComponent from "@/components/SidebarComponent/SidebarListComponent";
import { RiArrowLeftDoubleLine } from "@/components/IconComponent/Icons";
import ButtonComponent from "@/components/FormComponents/ButtonComponent";

interface SidebarComponentProps {
  isOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const SidebarComponent = memo(
  ({
    isOpen = false,
    onClose,
    collapsed = false,
    onToggleCollapse,
  }: SidebarComponentProps) => {
    const { isDesktop } = useMediaQuery();

    if (isDesktop) {
      return (
        <aside
          className={`fixed top-16 left-0 z-40 h-[calc(100vh-64px)] transition-all duration-300 ${
            collapsed ? "w-14" : "w-64"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full flex flex-col overflow-hidden bg-surface border-e border-gray-200 p-2">
            <SidebarListComponent collapsed={collapsed} />

            {/* ── Collapse toggle ───────────────────────────── */}
            <ButtonComponent
              variant="ghost"
              size="xs"
              onClick={onToggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="absolute bottom-2 -right-4 border-wlr-green "
              leftIcon={
                <RiArrowLeftDoubleLine
                  size={18}
                  className={`text-wlr-blue transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                />
              }
            />
          </div>
        </aside>
      );
    }

    return (
      <div
        className={`fixed top-16 right-0 z-40 w-full h-[calc(100vh-64px)] p-4 overflow-hidden transition-transform duration-300 bg-surface border-e border-default flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarListComponent onLinkClick={onClose} />
      </div>
    );
  }
);

SidebarComponent.displayName = "SidebarComponent";

export default SidebarComponent;
