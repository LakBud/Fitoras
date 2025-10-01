import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useCurrentSplitStore } from "../../stores/splits/useCurrentSplitStore";
import SplitTable from "../../components/split/detail/SplitTable";
import NavigateBackButton from "../../components/common/NavigateBackButton";
import { BsFillGearFill } from "react-icons/bs";
import { useThemeColor } from "../../hooks/ui/useThemeColor";
import SplitDeleteButton from "../../components/split/detail/SplitDeleteButton";
import EditSplitForm from "../../components/split/detail/EditSplitForm";

const SplitDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const splits = useSplitsStore((state) => state.splits);
  const { currentSplit, setCurrentSplit } = useCurrentSplitStore();
  const split = splits.find((s) => s.id === id);

  const theme = useThemeColor(currentSplit?.category?.color);

  // Update current split in Zustand
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
      className="relative min-h-screen pb-20 px-4 sm:px-6 lg:px-12"
      style={{
        background: `linear-gradient(to bottom, ${theme.gradientStart}, ${theme.gradientEnd})`,
      }}
    >
      {/* Header */}
      <header className="flex flex-col items-center text-center pt-20 mb-12 relative px-4">
        {/* ================== Title ================== */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full break-words text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent drop-shadow-md leading-tight"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.primary}, ${theme.gradientEnd})`,
          }}
        >
          {currentSplit.name}
        </motion.h1>

        {/* ================== Category Pill ================== */}
        {currentSplit.category && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md max-w-full truncate"
            style={{
              backgroundColor: currentSplit.category.color,
              color: "#fff",
            }}
            title={currentSplit.category.name} // tooltip for overflow
          >
            {currentSplit.category.name}
          </motion.span>
        )}

        {/* ================== Description ================== */}
        {currentSplit.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 max-w-3xl text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed break-words text-balance"
          >
            {currentSplit.description}
          </motion.p>
        )}
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto w-full flex flex-col gap-8"
      >
        {/* SplitTable Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-lg overflow-x-auto"
        >
          <SplitTable />
        </motion.div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link
            to={`/splits/${currentSplit.id}/edit`}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
            style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
          >
            <BsFillGearFill className="text-lg" /> Edit
          </Link>

          <SplitDeleteButton />

          <EditSplitForm splitToEdit={split} />
        </div>
      </motion.main>

      {/* Fixed Back Button */}
      <NavigateBackButton />
    </div>
  );
};

export default SplitDetailPage;
