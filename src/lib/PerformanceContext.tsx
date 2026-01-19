"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface PerformanceContextType {
    isMobile: boolean;
    isLowPower: boolean;
    prefersReducedMotion: boolean;
    isLoaded: boolean;
    setLoaded: () => void;
}

const PerformanceContext = createContext<PerformanceContextType>({
    isMobile: false,
    isLowPower: false,
    prefersReducedMotion: false,
    isLoaded: false,
    setLoaded: () => { },
});

export function usePerformance() {
    return useContext(PerformanceContext);
}

interface PerformanceProviderProps {
    children: ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isLowPower, setIsLowPower] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Detect mobile
        const checkMobile = () => {
            const mobile = window.matchMedia("(max-width: 1024px)").matches ||
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0;
            setIsMobile(mobile);
        };

        // Detect low-power device (heuristic based on hardware concurrency and memory)
        const checkLowPower = () => {
            const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
            // @ts-expect-error - deviceMemory is not in all browsers
            const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
            setIsLowPower(Boolean(lowCores || lowMemory || isMobileDevice));
        };

        // Detect reduced motion preference
        const checkReducedMotion = () => {
            const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            setPrefersReducedMotion(mediaQuery.matches);

            const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
            mediaQuery.addEventListener("change", handler);
            return () => mediaQuery.removeEventListener("change", handler);
        };

        checkMobile();
        checkLowPower();
        const cleanupReducedMotion = checkReducedMotion();

        // Listen for resize
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
            cleanupReducedMotion?.();
        };
    }, []);

    const handleSetLoaded = () => setIsLoaded(true);

    return (
        <PerformanceContext.Provider
            value={{
                isMobile,
                isLowPower,
                prefersReducedMotion,
                isLoaded,
                setLoaded: handleSetLoaded,
            }}
        >
            {children}
        </PerformanceContext.Provider>
    );
}
