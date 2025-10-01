import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import Modal from "../../common/Modal";
import { useCurrentSplitStore } from "../../../stores/splits/useCurrentSplitStore";
import { useThemeColor } from "../../../hooks/ui/useThemeColor";
import { Link } from "react-router-dom";
import { useSplitsStore } from "../../../stores/splits/useSplitStore";

const SplitDeleteButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentSplit, clearCurrentSplit, setCurrentSplit } = useCurrentSplitStore();
  const removeSplit = useSplitsStore((state) => state.removeSplit);
  const theme = useThemeColor(currentSplit?.category?.color);

  const handleDelete = () => {
    if (currentSplit) {
      removeSplit(currentSplit.id);
      clearCurrentSplit(); // your delete logic
      setCurrentSplit(null);
      setIsOpen(false);
    }
  };

  return (
    <div>
      {/* Delete Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200
                   bg-red-500 text-white"
      >
        <BsTrash className="text-lg" /> Delete
      </button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex flex-col gap-6 rounded-3xl w-full max-w-md mx-auto p-6 sm:p-8 shadow-xl"
        style={{
          backgroundColor: theme.lighter,
          color: theme.textOnPrimary,
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-2xl sm:text-3xl font-extrabold truncate max-w-full"
            style={{
              color: theme.primary,
            }}
            title={`Delete ${currentSplit?.name}?`} // Tooltip with full name
          >
            {`Delete ${currentSplit?.name}?`}
          </h2>

          <p className="text-gray-700 text-sm sm:text-base mt-1">
            Are you sure you want to delete{" "}
            <span
              className="font-semibold inline-block max-w-[250px] sm:max-w-[300px] md:max-w-[400px] truncate align-bottom"
              title={currentSplit?.name} // Tooltip for full text
            >
              {currentSplit?.name}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 sm:flex-none px-6 py-3 rounded-2xl font-semibold shadow hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            style={{
              backgroundColor: theme.translucentStrong,
              color: theme.primary,
            }}
          >
            Cancel
          </button>

          <Link
            to="/splits"
            onClick={handleDelete}
            className="flex-1 sm:flex-none px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.primary,
              color: theme.textOnPrimary,
            }}
          >
            <BsTrash className="inline text-lg" /> Delete
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default SplitDeleteButton;
