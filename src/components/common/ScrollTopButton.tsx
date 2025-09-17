import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // show button after 300px scroll
    };
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
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
