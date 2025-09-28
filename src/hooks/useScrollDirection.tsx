import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollUp, setScrollUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setScrollUp(true); // always show navbar at top
      } else if (currentScrollY > lastScrollY) {
        setScrollUp(false); // scrolling down → hide
      } else {
        setScrollUp(true); // scrolling up → show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return scrollUp;
}
