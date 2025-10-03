import { useLayoutEffect, useRef, useState } from "react";
import SplitList from "../../components/split/SplitList";
import SplitForm from "../../components/split/SplitForm";
import ScrollTopButton from "../../components/common/ScrollTopButton";
import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useBreakpoint from "../../hooks/ui/useBreakpoint";

const SplitsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { isDesktop, isMobile } = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: scrollY, behavior: "auto" });
    }
  }, []);

  const handleScroll = () => {
    if (containerRef.current) setScrollY(containerRef.current.scrollTop);
  };

  return (
    <>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative bg-gradient-to-b from-red-50 via-rose-50 to-rose-100 min-h-screen py-5 pb-20 px-4 sm:px-6 lg:px-12 overflow-auto"
      >
        {/* Page Header */}
        <header className="flex flex-col items-center mb-8 pt-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">Splits</h1>
          <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Manage and view your workout splits to keep your fitness journey structured and motivating. Drag your prioritized
            split on the top to activate it in the Workout Calendar.
          </p>
        </header>

        {/* Splits List */}
        <main className="grid gap-6 sm:gap-8 md:gap-10">
          <div className="p-4 sm:p-6 md:p-10">
            <SplitList />
          </div>
        </main>

        {/* Add Split Button */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className={`
          fixed
          ${isDesktop ? "bottom-5 right-5 z-50" : ""}
          ${isMobile ? "bottom-23 right-4 z-50" : ""}
          bg-red-600 text-white p-5 rounded-full shadow-xl
        `}
          whileHover={isDesktop ? { scale: 1.1, boxShadow: "0 15px 25px rgba(0,0,0,0.3)" } : undefined}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          title="Add new split"
        >
          <FiPlus size={28} />
        </motion.button>

        {/* Modal Overlay */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <SplitForm onClose={() => setIsModalOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollTopButton className="bottom-26 right-3" />
      </div>
    </>
  );
};

export default SplitsPage;
