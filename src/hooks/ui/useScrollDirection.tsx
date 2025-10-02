import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [scrollUp, setScrollUp] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateDirection = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setScrollUp(true); // always show navbar at top
      } else if (currentScrollY > lastScrollYRef.current) {
        setScrollUp(false); // scrolling down → hide
      } else {
        setScrollUp(true); // scrolling up → show
      }

      lastScrollYRef.current = currentScrollY;
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(updateDirection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollUp;
}
