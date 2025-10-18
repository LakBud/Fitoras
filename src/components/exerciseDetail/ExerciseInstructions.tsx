import { motion } from "framer-motion";
import { GiWeightCrush } from "react-icons/gi";

interface Props {
  instructions: string[];
}

export function ExerciseInstructions({ instructions }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl mb-10 border border-white/50"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <GiWeightCrush className="text-rose-600 text-3xl sm:text-4xl" />
        <h2 className="text-2xl sm:text-3xl text-rose-700 font-bold">How To Perform</h2>
      </div>

      {instructions.length > 0 ? (
        <ol className="space-y-3 text-gray-700 leading-relaxed text-sm sm:text-base">
          {instructions.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex gap-3"
            >
              <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {i + 1}
              </span>
              <span className="pt-1">{step}</span>
            </motion.li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-500 text-center italic">No instructions available for this exercise.</p>
      )}
    </motion.section>
  );
}
