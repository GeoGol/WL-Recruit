import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface MediaQueryContextValue {
  isDesktop: boolean;
}

const DESKTOP_QUERY = "(min-width: 768px)";

const MediaQueryContext = createContext<MediaQueryContextValue | undefined>(undefined);

export const MediaQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(DESKTOP_QUERY).matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
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
  if (!ctx) throw new Error("useMediaQuery must be used within a MediaQueryProvider");
  return ctx;
};
