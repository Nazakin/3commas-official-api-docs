import React, { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from 'react';

interface SidebarContextType {
    isOpen: boolean;
    isPinned: boolean;
    openSidebarAbsolute: () => void;
    closeSidebar: () => void;
    pinSidebar: () => void;
    unpinSidebar: () => void;
    scheduleClose: (delayMs: number) => void;
    cancelScheduledClose: () => void;
    togglePin: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext(): SidebarContextType {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('SidebarContext is not available');
    }
    return context;
}

interface SidebarProviderProps {
    children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [isPinned, setIsPinned] = useState(true);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isWithinRange, setIsWithinRange] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 997 && window.innerWidth <= 1630;
        }
        return true;
    });

    useEffect(() => {
        const handleResize = () => {
            const within = window.innerWidth >= 997 && window.innerWidth <= 1630;
            setIsWithinRange(within);
            if (!within) {
                setIsOpen(true);
                setIsPinned(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const openSidebarAbsolute = useCallback(() => {
        if (!isPinned && isWithinRange) {
            setIsOpen(true);
        }
    }, [isPinned, isWithinRange]);

    const closeSidebar = useCallback(() => {
        if (!isPinned && isWithinRange) {
            setIsOpen(false);
        }
    }, [isPinned, isWithinRange]);

    const pinSidebar = useCallback(() => {
        setIsPinned(true);
        setIsOpen(true);
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    const unpinSidebar = useCallback(() => {
        if (isWithinRange) {
            setIsPinned(false);
            setIsOpen(false);
        }
    }, [isWithinRange]);

    const scheduleClose = useCallback(
        (delayMs: number) => {
            if (isPinned || !isWithinRange) return;
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
            closeTimeoutRef.current = setTimeout(() => {
                setIsOpen(false);
                closeTimeoutRef.current = null;
            }, delayMs);
        },
        [isPinned, isWithinRange]
    );

    const cancelScheduledClose = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    const togglePin = useCallback(() => {
        if (isWithinRange) {
            if (isPinned) {
                unpinSidebar();
            } else {
                pinSidebar();
            }
        }
    }, [isPinned, isWithinRange, pinSidebar, unpinSidebar]);

    const value: SidebarContextType = {
        isOpen: isWithinRange ? isOpen : true,
        isPinned: isWithinRange ? isPinned : true,
        openSidebarAbsolute,
        closeSidebar,
        pinSidebar,
        unpinSidebar,
        scheduleClose,
        cancelScheduledClose,
        togglePin,
    };

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
}