import { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfoCard from "./InfoCards";
import MuscleCard from "./MuscleCards";

interface Props {
  infoItems: { label: string; value: any; icon: JSX.Element }[];
  muscleItems: { label: string; value: any[]; icon: JSX.Element }[];
}

export function ExerciseTabs({ infoItems, muscleItems }: Props) {
  const [activeTab, setActiveTab] = useState<"info" | "muscles">("info");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-10"
    >
      {/* Tab Buttons */}
      <div className="flex justify-center mb-8">
        <div className="relative inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg">
          {(["info", "muscles"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 sm:px-8 py-3 text-sm sm:text-base font-bold rounded-xl transition-colors z-10 ${
                activeTab === tab ? "text-white" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab === "info" ? "Exercise Info" : "Muscle Groups"}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl shadow-lg -z-10"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {activeTab === "info" && infoItems.map((item, idx) => <InfoCard key={item.label} item={item} idx={idx} />)}

          {activeTab === "muscles" && muscleItems.map((item, idx) => <MuscleCard key={item.label} item={item} idx={idx} />)}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
