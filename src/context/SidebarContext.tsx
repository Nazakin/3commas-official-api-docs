import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    ReactNode,
} from 'react';

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
        throw new Error('Hey DUDE');
    }
    return context;
}

interface SidebarProviderProps {
    children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Відкриваємо сайдбар в абсолютному режимі (не pinned)
    const openSidebarAbsolute = useCallback(() => {
        if (!isPinned) {
            setIsOpen(true);
        }
    }, [isPinned]);

    const closeSidebar = useCallback(() => {
        if (!isPinned) {
            setIsOpen(false);
        }
    }, [isPinned]);

    const pinSidebar = useCallback(() => {
        setIsPinned(true);
        setIsOpen(true);
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    const unpinSidebar = useCallback(() => {
        setIsPinned(false);
        setIsOpen(false);
    }, []);

    const scheduleClose = useCallback((delayMs: number) => {
        if (isPinned) return;
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            closeTimeoutRef.current = null;
        }, delayMs);
    }, [isPinned]);

    const cancelScheduledClose = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    const togglePin = useCallback(() => {
        if (isPinned) {
            unpinSidebar();
        } else {
            pinSidebar();
        }
    }, [isPinned, pinSidebar, unpinSidebar]);

    const value: SidebarContextType = {
        isOpen,
        isPinned,
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