import { motion, LayoutGroup } from "framer-motion";
import { useCategoryControl } from "../../../../../hooks/control/useCategoryControl";
import { useSplitControl } from "../../../../../hooks/control/useSplitControl";
import { readableColor, rgba } from "polished";
import useBreakpoint from "../../../../../hooks/ui/useBreakpoint";
import { useThemeColor } from "../../../../../hooks/ui/useThemeColor";
import { useEffect, useRef, useState } from "react";
import ControlAddCategory from "./ControlAddCategory"; // inline add button

const ControlCategoryTab = () => {
  const { selectedCategoryId, setSelectedCategoryId, split } = useSplitControl();
  const { categories } = useCategoryControl();
  const { isDesktop } = useBreakpoint();
  const theme = useThemeColor(split?.category?.color);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const allCategories = [{ id: null, name: "None", color: theme.translucent }, ...(categories ?? [])];

  // Track scroll to toggle fade gradients
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      setSelectedCategoryId?.(null); // deselect category when leaving the page
    };
  }, []);

  return (
    <div className="flex-1 relative">
      {/* === Fade Gradients for mobile === */}
      {!isDesktop && canScrollLeft && (
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-6 z-10"
          style={{
            background: `linear-gradient(to right, ${theme.translucentStrong}, transparent)`,
          }}
        />
      )}
      {!isDesktop && canScrollRight && (
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-6 z-10"
          style={{
            background: `linear-gradient(to left, ${theme.translucentStrong}, transparent)`,
          }}
        />
      )}

      {/* === Scrollable category row + Add button === */}
      <div
        ref={scrollRef}
        className={`
          flex gap-3 relative
          ${isDesktop ? "flex-wrap" : "overflow-x-auto pb-2 snap-x scroll-pl-2"}
          scrollbar-hide
        `}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <LayoutGroup>
          {allCategories.map((cat) => {
            const isActive = cat.id === selectedCategoryId;
            const catColor = cat.color ?? theme.translucent;
            const textColor = readableColor(catColor, "#000", "#fff");

            return (
              <motion.button
                key={cat.id ?? "none"}
                layout
                onClick={() => setSelectedCategoryId?.(cat.id)}
                className={`
                  relative flex-shrink-0 rounded-full font-medium whitespace-nowrap
                  ${isDesktop ? "px-4 py-2" : "px-5 py-2 snap-start"}
                  transition-all duration-200
                `}
                style={{
                  backgroundColor: isActive ? catColor : rgba(catColor, 0.25),
                  color: isActive ? textColor : readableColor(rgba(catColor, 0.25), "#000", "#fff"),
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${rgba(catColor, isActive ? 0.8 : 0.4)}`,
                  boxShadow: isActive ? `0 2px 8px ${rgba(catColor, 0.4)}` : "none",
                }}
                whileTap={{ scale: 0.97 }}
                whileHover={{
                  backgroundColor: isActive ? catColor : rgba(catColor, 0.4),
                }}
              >
                {cat.name}
                {isActive && (
                  <motion.div
                    layoutId="category-underline"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[3px] rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${rgba(textColor, 0.9)}, ${rgba(textColor, 0.5)})`,
                      boxShadow: `0 2px 8px ${rgba(textColor, 0.3)}`,
                    }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "70%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}

          {/* Inline Add Button */}
          <ControlAddCategory />
        </LayoutGroup>
      </div>
    </div>
  );
};

export default ControlCategoryTab;
