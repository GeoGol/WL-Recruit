import { useState, useCallback, useRef, useEffect, RefObject } from "react";

export function useDropdown(refs?: RefObject<HTMLElement>[]) {
    const [openId, setOpenId] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Stabilise the refs array — callers pass a new literal on every render
    const refsRef = useRef(refs);
    useEffect(() => { refsRef.current = refs; });

    // Track openId in a ref so handleClick always reads the latest value
    // without needing it as an effect dependency
    const openIdRef = useRef(openId);
    useEffect(() => { openIdRef.current = openId; });

    const open = useCallback((id: string | null) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenId(id);
    }, []);

    const close = useCallback(() => {
        timeoutRef.current = setTimeout(() => setOpenId(null), 150);
    }, []);

    const toggle = useCallback((id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    }, []);

    // Click outside detection — registered once, never re-registered
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (!openIdRef.current || !refsRef.current) return;
            const isOutside = refsRef.current.every(
                ref => ref.current && !ref.current.contains(event.target as Node)
            );
            if (isOutside) setOpenId(null);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return { openId, open, close, toggle };
}
