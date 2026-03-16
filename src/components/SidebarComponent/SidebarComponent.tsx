import { memo } from "react";
import { useMediaQuery } from "@/context/MediaQueryContext";
import SidebarListComponent from "@/components/SidebarComponent/SidebarListComponent";

interface SidebarComponentProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SidebarComponent = memo(
  ({ isOpen = false, onClose }: SidebarComponentProps) => {
    const { isDesktop } = useMediaQuery();

    if (isDesktop) {
      return (
        <aside
          className="fixed top-16 left-0 z-40 w-64 h-[calc(100vh-64px)] transition-transform translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full flex flex-col overflow-hidden bg-surface border-e border-gray-200 p-2">
            <SidebarListComponent />
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
