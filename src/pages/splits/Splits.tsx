import { useLayoutEffect, useRef, useState } from "react";
import SplitList from "../../components/split/SplitList";
import SplitForm from "../../components/split/SplitForm";
import ScrollTopButton from "../../components/common/ScrollTopButton";
import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useBreakpoint from "../../hooks/useBreakpoint";

const Splits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const { isDesktop, isMobile } = useBreakpoint();

  // Restore scroll position
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: scrollY, behavior: "auto" });
    }
  }, []);

  // Track scroll
  const handleScroll = () => {
    if (containerRef.current) {
      setScrollY(containerRef.current.scrollTop);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative bg-gradient-to-b from-red-50 via-rose-50 to-rose-100 min-h-screen py-10 pt-8 px-4 sm:px-6 lg:px-12 overflow-auto  p-3"
    >
      {/* Page Header */}
      <header className="flex flex-col items-center mb-8 pt-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">Splits</h1>
        <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
          Manage and view your workout splits to keep your fitness journey structured and motivating. Hover your prioritized split
          on the top to activate it.
        </p>
      </header>

      {/* Splits List */}
      <main className="grid gap-6 sm:gap-8 md:gap-10">
        <div className="p-4 sm:p-6 md:p-10">
          <SplitList />
        </div>
      </main>

      {isDesktop && (
        <motion.button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-5 rounded-full shadow-xl z-50"
          whileHover={{ scale: 1.1, boxShadow: "0 15px 25px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          title="Add new split"
        >
          <FiPlus size={28} />
        </motion.button>
      )}
      {isMobile && (
        <motion.button
          onClick={() => setShowForm(true)}
          className="fixed bottom-23 right-4 bg-red-600 text-white p-5 rounded-full shadow-xl z-50"
          whileHover={{ scale: 1.1, boxShadow: "0 15px 25px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          title="Add new split"
        >
          <FiPlus size={28} />
        </motion.button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <SplitForm onClose={() => setShowForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <ScrollTopButton />
    </div>
  );
};

export default Splits;
