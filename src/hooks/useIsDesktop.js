import { useState, useEffect } from "react";

const DESKTOP_BREAKPOINT = 901;

/**
 * useIsDesktop — Returns true when viewport width >= 901px.
 * Used to switch between inline reader (desktop) and modal (mobile).
 */
export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= DESKTOP_BREAKPOINT
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}
