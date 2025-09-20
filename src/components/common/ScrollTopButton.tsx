import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let lastCall = 0;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastCall < 100) return; // simple throttle
      lastCall = now;

      const scrollY = window.scrollY;
      setShowScrollTop((prev) => {
        if (!prev && scrollY > 300) return true;
        if (prev && scrollY < 280) return false;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-25 right-4 z-50 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
        >
          ↑ Top
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollTopButton;
