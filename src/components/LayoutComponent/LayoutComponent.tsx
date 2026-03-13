import React from "react";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import FooterComponent from "@/components/FooterComponent/FooterComponent";
import ContentComponent from "@/components/ContentComponent/ContentComponent";
import SidebarComponent from "@/components/SidebarComponent/SidebarComponent";
import {useMediaQuery} from "@/context/MediaQueryContext";

const LayoutComponent = ({
                             children,
                         }: Readonly<{ children: React.ReactNode }>) => {

    const { isDesktop } = useMediaQuery();

    return (
        <>
            <HeaderComponent/>

            <div className={"flex xl:h-full gap-2 relative"}>
                {isDesktop && <SidebarComponent/>}

                <ContentComponent>
                    {children}
                </ContentComponent>
            </div>

            {/*<FooterComponent/>*/}
        </>
    );
};

export default LayoutComponent;