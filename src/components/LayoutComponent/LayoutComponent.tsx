import { memo, useState, type ReactNode } from 'react';
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent';
import ContentComponent from '@/components/ContentComponent/ContentComponent';
import SidebarComponent from '@/components/SidebarComponent/SidebarComponent';
import { ToastProvider } from '@/providers/ToastProvider';
import ToastContainer from '@/components/ToastComponent/ToastContainer';

const LayoutComponent = memo(
    ({ children }: Readonly<{ children: ReactNode }>) => {
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

        return (
            <ToastProvider>
                <HeaderComponent/>

                <div className={"flex xl:h-full gap-2 relative"}>
                    <SidebarComponent
                        collapsed={sidebarCollapsed}
                        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
                    />

                    <ContentComponent collapsed={sidebarCollapsed}>
                        {children}
                    </ContentComponent>
                </div>

                <ToastContainer />
            </ToastProvider>
        );
    }
);

LayoutComponent.displayName = "LayoutComponent";

export default LayoutComponent;