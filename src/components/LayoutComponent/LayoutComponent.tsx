import { memo, type ReactNode } from 'react';
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent';
import ContentComponent from '@/components/ContentComponent/ContentComponent';
import SidebarComponent from '@/components/SidebarComponent/SidebarComponent';

const LayoutComponent = memo(
    ({ children }: Readonly<{ children: ReactNode }>) => {
        return (
            <>
                <HeaderComponent/>

                <div className={"flex xl:h-full gap-2 relative"}>
                    <SidebarComponent/>

                    <ContentComponent>
                        {children}
                    </ContentComponent>
                </div>
            </>
        );
    }
);

LayoutComponent.displayName = "LayoutComponent";

export default LayoutComponent;