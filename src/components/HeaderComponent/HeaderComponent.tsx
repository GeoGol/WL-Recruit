import React, {useEffect, useState} from "react";
import {useMediaQuery} from "@/context/MediaQueryContext";
import HeaderDesktopComponent from "@/components/HeaderComponent/HeaderDesktopComponent";
import HeaderMobileComponent from "@/components/HeaderComponent/HeaderMobileComponent";

const HeaderComponent: React.FC<{}> = ({}) => {

  const [loading, setLoading] = useState(true);
  const { isDesktop } = useMediaQuery();

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

  return (
    <>
      {isDesktop && !loading && (
        <HeaderDesktopComponent/>
      )}

      {!isDesktop && !loading && (
        <HeaderMobileComponent/>
      )}

    </>
  );
};

export default HeaderComponent;
