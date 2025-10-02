import { Link } from "react-router-dom";
import { useCurrentSplitStore } from "../../../stores/splits/useCurrentSplitStore";
import { useExercise } from "../../../hooks/useExercise";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useBreakpoint from "../../../hooks/ui/useBreakpoint";
import { useThemeColor } from "../../../hooks/ui/useThemeColor";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const SplitTable = () => {
  const currentSplit = useCurrentSplitStore((state) => state.currentSplit);
  const { exercises: allExercises, loading } = useExercise();
  const { isDesktop } = useBreakpoint(1024);
  const theme = useThemeColor(currentSplit?.category?.color);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [expandedDays, setExpandedDays] = useState<string[]>(() => currentSplit?.days?.map((day) => day.day) || []);

  const toggleCategory = (dayId: string, categoryId: string) => {
    const key = `${dayId}-${categoryId}`;
    setCollapsedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isCategoryCollapsed = (dayId: string, categoryId: string) => {
    const key = `${dayId}-${categoryId}`;
    return collapsedCategories[key] ?? false;
  };

  if (!currentSplit) return null;
  if (loading) return <div className="flex items-center justify-center py-12 text-gray-500">Loading exercises...</div>;

  const getExerciseById = (id: string) => allExercises.find((ex) => ex.id === id);

  // Mobile view - accordion style
  if (!isDesktop) {
    const toggleDay = (day: string) => {
      setExpandedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
    };

    return (
      <div className="w-full px-4 py-6 space-y-4">
        {currentSplit.days.map((dayObj, dayIndex) => {
          const isExpanded = expandedDays.includes(dayObj.day);

          return (
            <motion.div
              key={dayObj.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: dayIndex * 0.05 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
            >
              {/* Day header */}
              <button
                onClick={() => toggleDay(dayObj.day)}
                className="w-full flex justify-between items-center px-4 py-3 font-bold text-white focus:outline-none"
                style={{ backgroundColor: theme.primary }}
              >
                <div>
                  <h3 className="text-lg">{dayObj.day}</h3>
                  <p className="text-xs opacity-90 text-left">
                    {(dayObj.exercises?.length || 0) +
                      (dayObj.categories?.reduce((acc, cat) => acc + cat.exercises.length, 0) || 0)}{" "}
                    exercises
                  </p>
                </div>
                {isExpanded ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
              </button>

              {/* Collapsible content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-3 space-y-2"
                  >
                    {/* Direct exercises */}
                    {dayObj.exercises.map((ex, index) => {
                      const fullEx = getExerciseById(ex.id) || ex;
                      const imageSrc =
                        fullEx.images && fullEx.images.length > 0 ? `/data/exercises/${fullEx.images[0]}` : undefined;
                      return (
                        <Link key={`${dayObj.day}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            {imageSrc ? (
                              <img
                                src={imageSrc}
                                alt={fullEx.name}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: theme.translucent }}
                              >
                                <svg
                                  className="w-6 h-6 opacity-40"
                                  style={{ color: theme.primary }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{fullEx.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {ex.sets} × {ex.reps}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}

                    {/* Category exercises */}
                    {dayObj.categories?.map((cat) =>
                      cat.exercises.map((ex, index) => {
                        const fullEx = getExerciseById(ex.id) || ex;
                        const imageSrc =
                          fullEx.images && fullEx.images.length > 0 ? `/data/exercises/${fullEx.images[0]}` : undefined;
                        const catTheme = useThemeColor(cat.color);
                        return (
                          <Link key={`${dayObj.day}_cat_${cat.id}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                              {imageSrc ? (
                                <img
                                  src={imageSrc}
                                  alt={fullEx.name}
                                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                  loading="lazy"
                                />
                              ) : (
                                <div
                                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: theme.translucent }}
                                >
                                  <svg
                                    className="w-6 h-6 opacity-40"
                                    style={{ color: theme.primary }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{fullEx.name}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-gray-500">
                                    {ex.sets} × {ex.reps}
                                  </span>
                                  <span
                                    className="text-xs px-1.5 py-0.5 rounded"
                                    style={{
                                      backgroundColor: catTheme.translucent,
                                      color: catTheme.darker,
                                    }}
                                  >
                                    {cat.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Desktop view - timetable grid
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full px-6 py-6">
        {/* Timetable Header */}
        <div
          className="grid gap-2 mb-2"
          style={{ gridTemplateColumns: `repeat(${currentSplit.days.length}, minmax(180px, 1fr))` }}
        >
          {currentSplit.days.map((dayObj) => (
            <div
              key={`header-${dayObj.day}`}
              className="text-center py-4 rounded-t-xl font-bold text-white shadow-sm"
              style={{ backgroundColor: theme.primary }}
            >
              <div className="text-base uppercase tracking-wide">{dayObj.day}</div>
              <div className="text-xs mt-1 opacity-90">
                {(dayObj.exercises?.length || 0) + (dayObj.categories?.reduce((acc, cat) => acc + cat.exercises.length, 0) || 0)}{" "}
                exercises
              </div>
            </div>
          ))}
        </div>

        {/* Timetable Body */}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${currentSplit.days.length}, minmax(180px, 1fr))` }}>
          {currentSplit.days.map((dayObj, dayIndex) => (
            <motion.div
              key={dayObj.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.05 }}
              className="bg-white rounded-b-xl shadow-md border-2 border-t-0 p-3 min-h-[400px]"
              style={{ borderColor: theme.translucent }}
            >
              <div className="space-y-2">
                {/* Day exercises */}
                {dayObj.exercises.map((ex, index) => {
                  const fullEx = getExerciseById(ex.id) || ex;
                  const imageSrc = fullEx.images && fullEx.images.length > 0 ? `/data/exercises/${fullEx.images[0]}` : undefined;

                  return (
                    <Link key={`${dayObj.day}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-xl overflow-hidden border transition-all duration-200 group"
                        style={{
                          borderColor: theme.translucent,
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
                              style={{ background: `linear-gradient(to top, ${theme.gradientEnd}, ${theme.gradientStart})` }}
                            />
                          </div>
                        ) : (
                          <div className="h-24 flex items-center justify-center" style={{ backgroundColor: theme.translucent }}>
                            <svg
                              className="w-10 h-10 opacity-30"
                              style={{ color: theme.primary }}
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
                          <h4
                            className="font-semibold text-sm line-clamp-2 mb-1.5 transition-colors"
                            style={{ color: "#1f2937" }}
                          >
                            {fullEx.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: theme.translucent,
                                color: theme.darker,
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

                {/* Category exercises */}
                {dayObj.categories?.map((cat) => {
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
                            {cat.exercises.map((ex, index) => {
                              const fullEx = getExerciseById(ex.id) || ex;
                              const imageSrc =
                                fullEx.images && fullEx.images.length > 0 ? `/data/exercises/${fullEx.images[0]}` : undefined;

                              return (
                                <Link key={`${dayObj.day}_cat_${cat.id}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
                                  <motion.div
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="rounded-xl overflow-hidden border transition-all duration-200 group"
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
                                      <div
                                        className="h-24 flex items-center justify-center"
                                        style={{ backgroundColor: catTheme.translucent }}
                                      >
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
                                      <h4
                                        className="font-semibold text-sm line-clamp-2 mb-1.5 transition-colors"
                                        style={{ color: "#1f2937" }}
                                      >
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
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplitTable;
