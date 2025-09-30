import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { useSplitsStore } from "../../../stores/splits/useSplitStore";
import { useCurrentSplitStore } from "../../../stores/splits/useCurrentSplitStore";
import { useThemeColor } from "../../../hooks/useThemeColor";
import Modal from "../../common/Modal";

export default function SplitDeleteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentSplit, clearCurrentSplit } = useCurrentSplitStore();
  const { removeSplit } = useSplitsStore();
  const theme = useThemeColor(currentSplit?.category?.color);
  const navigate = useNavigate();

  if (!currentSplit) return null;

  const handleDelete = () => {
    removeSplit(currentSplit.id);
    clearCurrentSplit();
    navigate("/splits");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white font-semibold shadow-sm transition-all duration-200"
        style={{ border: `1px solid ${theme.translucentStrong}`, color: theme.dark }}
      >
        <BsX className="text-xl" />
        <span>Delete</span>
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className="text-xl font-bold mb-3" style={{ color: theme.primary }}>
          Delete Split?
        </h3>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete <strong>{currentSplit.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg font-semibold text-white"
            style={{ backgroundColor: theme.primary }}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}
