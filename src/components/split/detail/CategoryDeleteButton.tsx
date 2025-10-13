import { BsTrash } from "react-icons/bs";
import { useCurrentCategories } from "@/stores/splits/useCurrentCategories";
import { useSplitsStore } from "@/stores/splits/useSplitStore";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { Button } from "@/components/ui/button";
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
import type { Category } from "@/stores/splits/useCurrentCategories";

interface CategoryDeleteButtonProps {
  category: Category | undefined;
  onDeleted?: () => void;
  editingColor?: string; // <-- add this
}

const CategoryDeleteButton = ({ category, onDeleted, editingColor }: CategoryDeleteButtonProps) => {
  if (!category) return null;

  const removeCategory = useCurrentCategories((state) => state.removeCategory);
  const { splits, updateSplit } = useSplitsStore();

  // This will now react to category.color changes
  const theme = useThemeColor(category.color ?? "#888");

  const handleDelete = () => {
    // Remove category
    removeCategory(category.id);

    // Reset any splits using this category
    splits.forEach((split) => {
      if (split.category?.id === category.id) {
        updateSplit(split.id, { category: undefined });
      }
    });

    // Notify parent to update form state
    onDeleted?.();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          style={{
            backgroundColor: editingColor || category.color || "#6B7280",
            borderColor: theme.translucentStrong,
          }}
        >
          <BsTrash className="text-lg" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md w-full rounded-3xl p-6 sm:p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl sm:text-3xl font-extrabold break-words" style={{ color: theme.primary }}>
            Delete {category.name}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700 text-sm sm:text-base mt-2 break-words">
            Are you sure you want to delete <strong>{category.name}</strong>? Any splits using this category will be reset to{" "}
            <strong>None</strong>. This action cannot be undone.
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
            onClick={handleDelete}
          >
            <BsTrash className="inline text-lg" /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryDeleteButton;
