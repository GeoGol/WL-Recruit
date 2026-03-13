import { memo } from "react";
import { useMediaQuery } from "@/context/MediaQueryContext";
import HeaderDesktopComponent from "@/components/HeaderComponent/HeaderDesktopComponent";
import HeaderMobileComponent from "@/components/HeaderComponent/HeaderMobileComponent";

const HeaderComponent = memo(() => {
  const { isDesktop } = useMediaQuery();

  return isDesktop ? <HeaderDesktopComponent /> : <HeaderMobileComponent />;
});

HeaderComponent.displayName = "HeaderComponent";

export default HeaderComponent;
