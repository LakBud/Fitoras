import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useCurrentSplitStore } from "@/stores/split/useCurrentSplitStore";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const SplitDeleteButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentSplit, clearCurrentSplit, setCurrentSplit } = useCurrentSplitStore();
  const removeSplit = useSplitsStore((state) => state.removeSplit);
  const theme = useThemeColor(currentSplit?.category?.color);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!currentSplit) return;
    removeSplit(currentSplit.id);
    clearCurrentSplit();
    setCurrentSplit(null);
    setIsOpen(false);
    navigate("/splits");
  };

  if (!currentSplit) return null; // nothing to delete

  return (
    <>
      {/* Delete Button */}
      <Button
        variant="destructive"
        className="flex items-center gap-2"
        style={{ backgroundColor: theme.darker }}
        onClick={() => setIsOpen(true)}
      >
        <BsTrash className="text-lg" /> Delete
      </Button>

      {/* Dialog */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent
          className="sm:max-w-md w-full rounded-3xl p-6 sm:p-8"
          style={{ backgroundColor: theme.lighter, color: theme.textOnPrimary }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="text-2xl sm:text-3xl font-extrabold break-words"
              style={{ color: theme.primary }}
              title={`Delete ${currentSplit.name}?`}
            >
              {`Delete ${currentSplit.name}?`}
            </AlertDialogTitle>
            <p className="text-gray-700 text-sm sm:text-base mt-2 break-words">
              Are you sure you want to delete{" "}
              <span className="font-semibold break-words" title={currentSplit.name}>
                {currentSplit.name}
              </span>
              ? This action cannot be undone.
            </p>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-col sm:flex-row gap-4 mt-6 justify-end">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              style={{ backgroundColor: theme.translucentStrong, color: theme.primary }}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2"
              style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
              onClick={handleDelete}
            >
              <BsTrash className="inline text-lg" /> Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SplitDeleteButton;
