import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import MobileCategoryExercise from "./MobileCategoryExercise";

import type { Split, SplitExercise, WorkoutCategory, WorkoutDay } from "@/types/splits";
import type { useThemeColor } from "@/hooks/ui/useThemeColor";
import type { Exercises } from "@/types/exercise";

interface MobileSplitTableProps {
  currentSplit: Split;
  getExerciseById: (id: string) => Exercises | undefined;
  theme: ReturnType<typeof useThemeColor>;
}

// ---------------- Component ----------------
const MobileSplitTable = ({ currentSplit, getExerciseById, theme }: MobileSplitTableProps) => {
  const [expandedDays, setExpandedDays] = useState<string[]>(() => currentSplit.days.map((day) => day.day) || []);

  const toggleDay = (day: string) => {
    setExpandedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  return (
    <div className="w-full px-4 py-6 space-y-4">
      {currentSplit.days.map((dayObj: WorkoutDay, dayIndex: number) => {
        const isExpanded = expandedDays.includes(dayObj.day);

        return (
          <motion.div
            key={dayObj.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: dayIndex * 0.05 }}
            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleDay(dayObj.day)}
              className="w-full flex justify-between items-center px-4 py-3 font-bold text-white focus:outline-none"
              style={{ backgroundColor: theme.primary }}
            >
              <div>
                <h3 className="text-lg">{dayObj.day}</h3>
                <p className="text-xs opacity-90 text-left">
                  {dayObj.exercises.length + (dayObj.categories?.reduce((acc, cat) => acc + cat.exercises.length, 0) || 0)}{" "}
                  exercises
                </p>
              </div>
              {isExpanded ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
            </button>

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
                  {dayObj.exercises.map((ex: SplitExercise, index: number) => {
                    const fullEx = getExerciseById(ex.id) || ex;
                    const imageSrc = fullEx.images?.[0] ? `/data/exercises/${fullEx.images[0]}` : undefined;

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
                  {dayObj.categories?.map((cat: WorkoutCategory) =>
                    cat.exercises.map((ex: SplitExercise, index: number) => (
                      <MobileCategoryExercise
                        key={`${dayObj.day}_cat_${cat.id}_ex_${ex.id}_${index}`}
                        cat={cat}
                        ex={ex}
                        index={index}
                        dayDay={dayObj.day}
                        getExerciseById={getExerciseById}
                        theme={theme}
                      />
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MobileSplitTable;
