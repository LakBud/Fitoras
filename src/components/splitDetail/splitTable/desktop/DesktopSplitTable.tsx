import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DesktopCategorySection from "./DesktopCategorySection";
import { useState } from "react";
import type { Split, SplitExercise, WorkoutCategory, WorkoutDay } from "@/types/splits";
import type { Theme } from "@/types/theme";

interface DesktopSplitTableProps {
  currentSplit: Split;
  allExercises: SplitExercise[];
  theme: Theme;
}

const DesktopSplitTable = ({ currentSplit, allExercises, theme }: DesktopSplitTableProps) => {
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (dayId: string, categoryId: string) => {
    const key = `${dayId}-${categoryId}`;
    setCollapsedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isCategoryCollapsed = (dayId: string, categoryId: string) => {
    const key = `${dayId}-${categoryId}`;
    return collapsedCategories[key] ?? false;
  };

  const getExerciseById = (id: string) => allExercises.find((ex) => ex.id === id);

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full px-6 py-6">
        {/* Timetable Header */}
        <div
          className="grid gap-2 mb-2"
          style={{ gridTemplateColumns: `repeat(${currentSplit.days.length}, minmax(180px, 1fr))` }}
        >
          {currentSplit.days.map((dayObj: WorkoutDay) => (
            <div
              key={`header-${dayObj.day}`}
              className="text-center py-4 rounded-t-xl font-bold text-white shadow-sm"
              style={{ backgroundColor: theme.primary }}
            >
              <div className="text-base uppercase tracking-wide">{dayObj.day}</div>
              <div className="text-xs mt-1 opacity-90">
                {dayObj.exercises.length + (dayObj.categories?.reduce((acc, cat) => acc + cat.exercises.length, 0) || 0)}{" "}
                exercises
              </div>
            </div>
          ))}
        </div>

        {/* Timetable Body */}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${currentSplit.days.length}, minmax(180px, 1fr))` }}>
          {currentSplit.days.map((dayObj: WorkoutDay, dayIndex: number) => (
            <motion.div
              key={dayObj.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.05 }}
              className="bg-white rounded-b-xl shadow-md border-2 border-t-0 p-3"
              style={{ borderColor: theme.translucent, minHeight: "400px" }}
            >
              <div className="space-y-2 max-h-[1200px] overflow-y-auto relative pr-2">
                {/* Direct exercises */}
                {dayObj.exercises.map((ex: SplitExercise, index: number) => {
                  const fullEx = getExerciseById(ex.id) || ex;
                  const imageSrc = fullEx.images?.[0] ? `/data/exercises/${fullEx.images[0]}` : undefined;

                  return (
                    <Link key={`${dayObj.day}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-xl overflow-hidden border transition-all duration-200 group mb-2"
                        style={{ borderColor: theme.translucent, backgroundColor: "white" }}
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
                                background: `linear-gradient(to top, ${theme.gradientEnd}, ${theme.gradientStart})`,
                              }}
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
                          <h4 className="font-semibold text-sm line-clamp-2 mb-1.5" style={{ color: "#1f2937" }}>
                            {fullEx.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{ backgroundColor: theme.translucent, color: theme.darker }}
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
                {dayObj.categories?.map((cat: WorkoutCategory) => (
                  <DesktopCategorySection
                    key={`${dayObj.day}_cat_${cat.id}`}
                    cat={cat}
                    dayObj={dayObj}
                    getExerciseById={getExerciseById}
                    isCategoryCollapsed={isCategoryCollapsed}
                    toggleCategory={toggleCategory}
                  />
                ))}

                {/* Bottom gradient + arrow */}
                <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-t from-white to-transparent flex justify-center items-end">
                  <svg
                    className="w-6 h-6 animate-bounce text-gray-400 mb-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopSplitTable;
