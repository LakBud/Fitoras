import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSplitsStore } from "../../stores/useSplitStore";
import { useCurrentSplitStore } from "../../stores/useCurrentSplitStore";
import SplitTable from "../../components/split/SplitTable";
import SplitDetailForm from "../../components/split/SplitDetailForm";

const SplitDetailPage = () => {
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
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Split not found</h2>
        <Link to="/splits" className="text-blue-600 hover:underline font-medium">
          ← Back to all splits
        </Link>
      </div>
    );
  }

  if (!currentSplit) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-500">Loading split details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-red-300">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">{currentSplit.name}</h1>
        {currentSplit.description && <p className="text-gray-600">{currentSplit.description}</p>}
      </header>

      <section>
        <SplitTable />
      </section>

      <section>
        <SplitDetailForm />
      </section>

      <footer className="mt-6 text-center">
        <Link to="/splits" className="inline-block text-blue-600 hover:underline font-medium">
          ← Back to all splits
        </Link>
      </footer>
    </div>
  );
};

export default SplitDetailPage;
