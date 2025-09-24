import { useEffect, useState } from "react";

/**
 * useBreakpoint
 * @param breakpoint Width in px to consider "desktop" (default: 1024)
 */
const useBreakpoint = (breakpoint = 1024) => {
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" && window.innerWidth >= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return {
    isDesktop,
    isMobile: !isDesktop,
  };
};

export default useBreakpoint;
