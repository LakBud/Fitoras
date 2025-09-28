import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import { useCurrentSplitStore } from "../../stores/splits/useCurrentSplitStore";
import SplitTable from "../../components/split/detail/SplitTable";
import NavigateBackButton from "../../components/common/NavigateBackButton";
import { BsFillGearFill, BsX } from "react-icons/bs";

const SplitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const splits = useSplitsStore((state) => state.splits);
  const { currentSplit, setCurrentSplit } = useCurrentSplitStore();

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
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 via-rose-100 to-rose-200 pb-16 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <header className="flex flex-col items-center text-center pt-20 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-rose-700 tracking-tight drop-shadow-sm"
        >
          {currentSplit.name}
        </motion.h1>

        {currentSplit.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 max-w-2xl text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed"
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
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 text-white font-semibold shadow-md 
               hover:bg-rose-700 hover:shadow-lg transition-all duration-200"
          >
            <BsFillGearFill className="text-lg" />
            <span>Edit</span>
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-rose-300 text-rose-700 font-semibold shadow-sm 
               hover:bg-rose-50 hover:shadow-md transition-all duration-200"
          >
            <BsX className="text-xl" />
            <span>Delete</span>
          </button>
        </nav>
      </motion.main>

      {/* Fixed Back Button */}
      <NavigateBackButton />
    </div>
  );
};

export default SplitDetail;
