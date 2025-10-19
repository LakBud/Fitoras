import { useLayoutEffect, useRef, useState } from "react";
import SplitList from "../../components/split/list/SplitList";
import { SplitForm } from "@/components/split/form/SplitForm";
import ScrollTopButton from "../../components/common/ScrollTopButton";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

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
        <header className={`flex flex-col items-center mb-8 text-center ${isDesktop ? "mt-40" : "mt-20"}`}>
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
        <div
          className={["fixed z-50", isDesktop && "bottom-6 right-6", isMobile && "bottom-24 right-5"].filter(Boolean).join(" ")}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-60 animate-pulse
                  bg-gradient-to-r from-rose-400 via-red-500 to-pink-500"
          />
          {/* Actual button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            aria-label="Add new split"
            className="relative flex items-center justify-center
             rounded-2xl w-14 h-14 sm:w-16 sm:h-16
             bg-red-600 text-white font-bold
             shadow-lg hover:shadow-xl hover:bg-red-700 transition-all"
          >
            <motion.div
              initial={{ scale: 1.45 }}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <PlusCircleIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </Button>
        </div>

        {/* Modal Overlay */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-lg w-full rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <SplitForm onClose={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>

        <ScrollTopButton className="bottom-26 right-3" />
      </div>
    </>
  );
};

export default SplitsPage;
