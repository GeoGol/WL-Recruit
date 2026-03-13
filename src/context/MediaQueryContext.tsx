import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface MediaQueryContextValue {
  isDesktop: boolean;
}

const MediaQueryContext = createContext<MediaQueryContextValue | undefined>(undefined);

export const MediaQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const query = "(min-width: 768px)";

  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, []);

  const value = useMemo(() => ({ isDesktop }), [isDesktop]);

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQuery = (): MediaQueryContextValue => {
  const ctx = useContext(MediaQueryContext);
  if (!ctx) {
    throw new Error("useMediaQuery must be used within a MediaQueryProvider");
  }
  return ctx;
};

