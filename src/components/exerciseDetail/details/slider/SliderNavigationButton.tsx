import { memo } from "react";
import { motion } from "framer-motion";

const SliderNavigationButton = memo<{
  onClick: () => void;
  direction: "left" | "right";
  label: string;
}>(({ onClick, direction, label }) => {
  const isLeft = direction === "left";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, x: isLeft ? -4 : 4 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute ${
        isLeft ? "left-2 sm:left-4" : "right-2 sm:right-4"
      } top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-rose-600 rounded-full p-3 sm:p-4 shadow-xl hover:bg-white hover:shadow-2xl transition-all z-20`}
      aria-label={label}
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
    </motion.button>
  );
});

SliderNavigationButton.displayName = "SliderNavigationButton";

export default SliderNavigationButton;
