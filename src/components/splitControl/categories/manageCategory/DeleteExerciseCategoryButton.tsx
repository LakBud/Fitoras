import { BsTrash } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import type { WorkoutCategory } from "@/types/splits";

interface DeleteExerciseCategoryButtonProps {
  category: WorkoutCategory;
  onConfirm: () => void;
}

const DeleteExerciseCategoryButton = ({ category, onConfirm }: DeleteExerciseCategoryButtonProps) => {
  const theme = useThemeColor(category.color ?? "#888");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex flex-1 items-center gap-2" style={{ backgroundColor: theme.darker }}>
          <BsTrash /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md w-full rounded-3xl p-6 sm:p-8">
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: theme.primary }} className="text-2xl sm:text-3xl font-extrabold">
            Delete {category.name}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700 mt-2 text-sm sm:text-base">
            Are you sure you want to delete <strong>{category.name}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col sm:flex-row gap-4 mt-6 justify-end">
          <AlertDialogCancel
            className="flex-1 sm:flex-none"
            style={{ backgroundColor: theme.translucentStrong, color: theme.primary }}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="flex-1 sm:flex-none flex items-center justify-center gap-2"
            style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
            onClick={onConfirm}
          >
            <BsTrash /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteExerciseCategoryButton;
