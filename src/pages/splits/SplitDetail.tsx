import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useCurrentSplitStore } from "../../stores/splits/useCurrentSplitStore";
import SplitTable from "../../components/split/detail/SplitTable";
import NavigateBackButton from "../../components/common/NavigateBackButton";
import { BsFillGearFill } from "react-icons/bs";
import { useThemeColor } from "../../hooks/useThemeColor";
import SplitDeleteButton from "../../components/split/detail/SplitDeleteButton";

const SplitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const splits = useSplitsStore((state) => state.splits);
  const { currentSplit, setCurrentSplit } = useCurrentSplitStore();
  const theme = useThemeColor(currentSplit?.category?.color);

  // Find the split based on the URL ID
  const split = splits.find((s) => s.id === id);

  // Update current split in Zustand when split changes
  useEffect(() => {
    if (split) setCurrentSplit(split);
  }, [split, setCurrentSplit]);

  if (!split) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-rose-100 to-rose-300 p-6">
        <h2 className="text-3xl font-extrabold mb-4 text-rose-600">Split not found</h2>
        <Link
          to="/splits"
          className="flex items-center gap-2 text-rose-700 font-semibold hover:underline hover:text-rose-800 transition-colors"
        >
          Back to all splits
        </Link>
      </div>
    );
  }

  if (!currentSplit) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-rose-100 to-rose-300">
        <p className="text-gray-600 text-lg">Loading split details...</p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen pb-16 px-4 sm:px-6 lg:px-12"
      style={{
        background: `linear-gradient(to bottom, ${theme.gradientStart}, ${theme.gradientEnd})`,
      }}
    >
      {/* Header */}
      <header className="flex flex-col items-center text-center pt-20 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm"
          style={{
            color: theme.primary,
          }}
        >
          {currentSplit.name}
        </motion.h1>

        {currentSplit.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 max-w-2xl text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            {currentSplit.description}
          </motion.p>
        )}
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto w-full"
      >
        <SplitTable />

        {/* Actions */}
        <nav className="mt-10 flex flex-wrap justify-center gap-5 sm:gap-6">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200"
            style={{
              backgroundColor: theme.primary,
              color: theme.textOnPrimary, // ensures readability on any bright/dark color
            }}
          >
            <BsFillGearFill className="text-lg" />
            <span>Edit</span>
          </button>

          <SplitDeleteButton />
        </nav>
      </motion.main>

      {/* Fixed Back Button */}
      <NavigateBackButton />
    </div>
  );
};

export default SplitDetail;
