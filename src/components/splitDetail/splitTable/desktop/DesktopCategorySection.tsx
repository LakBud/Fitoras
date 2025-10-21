import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ==================== HELPER COMPONENT FOR DESKTOP CATEGORY SECTION ====================

const DesktopCategorySection = ({
  cat,
  dayObj,
  getExerciseById,
  isCategoryCollapsed,
  toggleCategory,
}: {
  cat: any;
  dayObj: any;
  getExerciseById: (id: string) => any;
  isCategoryCollapsed: (dayId: string, categoryId: string) => boolean;
  toggleCategory: (dayId: string, categoryId: string) => void;
}) => {
  const catTheme = useThemeColor(cat.color);
  const isCollapsed = isCategoryCollapsed(dayObj.day, cat.id);

  return (
    <div key={`${dayObj.day}_cat_${cat.id}`} className="space-y-2">
      <button
        onClick={() => toggleCategory(dayObj.day, cat.id)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-sm"
        style={{
          backgroundColor: catTheme.translucent,
          border: `1px solid ${catTheme.translucentStrong}`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: catTheme.darker }}>
          {cat.name} ({cat.exercises.length})
        </span>
        <motion.svg
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4"
          style={{ color: catTheme.dark }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden space-y-2"
          >
            {cat.exercises.map((ex: any, index: number) => {
              const fullEx = getExerciseById(ex.id) || ex;
              const imageSrc = fullEx.images && fullEx.images.length > 0 ? `/data/exercises/${fullEx.images[0]}` : undefined;

              return (
                <Link key={`${dayObj.day}_cat_${cat.id}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden border transition-all duration-200 mt-3 group"
                    style={{
                      borderColor: catTheme.translucent,
                      backgroundColor: "white",
                    }}
                  >
                    {imageSrc ? (
                      <div className="relative overflow-hidden h-24">
                        <img
                          src={imageSrc}
                          alt={fullEx.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(to top, ${catTheme.gradientEnd}, ${catTheme.gradientStart})`,
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-24 flex items-center justify-center" style={{ backgroundColor: catTheme.translucent }}>
                        <svg
                          className="w-10 h-10 opacity-30"
                          style={{ color: catTheme.primary }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="p-2.5">
                      <h4 className="font-semibold text-sm line-clamp-2 mb-1.5 transition-colors" style={{ color: "#1f2937" }}>
                        {fullEx.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: catTheme.translucent,
                            color: catTheme.darker,
                          }}
                        >
                          {ex.sets} × {ex.reps}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopCategorySection;
