import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ScrollTopButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastCall = useRef(0);

  // Simple throttle function
  const throttle = (func: any, delay: any) => {
    return () => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        func();
        lastCall.current = now;
      }
    };
  };

  useEffect(() => {
    const checkScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop((prev) => {
        if (!prev && scrollY > 300) return true;
        if (prev && scrollY < 280) return false;
        return prev;
      });
    };

    const handleScroll = throttle(checkScroll, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-22 right-7 z-50 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            ↑ Top
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollTopButton;
