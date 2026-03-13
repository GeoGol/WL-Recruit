import { useState, useCallback, useRef, useEffect, RefObject } from "react";

export function useDropdown(refs?: RefObject<HTMLElement>[]) {
    const [openId, setOpenId] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // Click outside detection
    useEffect(() => {
        if (!refs || !openId) return;
        function handleClick(event: MouseEvent) {
            if (!refs) return;
            const isOutside = Array.isArray(refs) && refs.length > 0 && refs.every(ref => ref.current && !ref.current.contains(event.target as Node));
            if (isOutside) {
                setOpenId(null);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [openId, refs]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return { openId, open, close, toggle };
}
