import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useNavigate, useParams } from "react-router-dom";

const SplitDeleteButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const removeSplit = useSplitsStore((state) => state.removeSplit);

  const { id } = useParams();
  const split = useSplitsStore((state) => state.splits.find((s) => s.id === id));

  const theme = useThemeColor(split?.category?.color);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!split) return;
    removeSplit(split.id);
    setIsOpen(false);
    navigate("/splits");
  };

  if (!split) return null;

  return (
    <>
      <Button
        variant="destructive"
        className="flex items-center gap-2"
        style={{ backgroundColor: theme.darker }}
        onClick={() => setIsOpen(true)}
      >
        <BsTrash className="text-lg" /> Delete
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent
          className="sm:max-w-md w-full rounded-3xl p-6 sm:p-8"
          style={{ backgroundColor: theme.lighter, color: theme.textOnPrimary }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl sm:text-3xl font-extrabold break-words" style={{ color: theme.primary }}>
              {`Delete ${split.name}?`}
            </AlertDialogTitle>
            <p className="text-gray-700 text-sm sm:text-base mt-2 break-words">
              Are you sure you want to delete <span className="font-semibold">{split.name}</span>? This action cannot be undone.
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
