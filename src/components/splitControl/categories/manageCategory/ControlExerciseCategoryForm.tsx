import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";
import type { WorkoutCategory } from "@/types/splits";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { Plus } from "lucide-react";
import CategoryRow from "./CategoryRow";
import CategoryList from "./CategoryList";
import CategoryEditForm from "./edit/CategoryEditForm";
import { Button } from "@/components/ui/button";

const ControlExerciseCategory = () => {
  const {
    categories,
    newCategoryName,
    setNewCategoryName,
    addCategory,
    deleteCategory,
    newCategoryColor,
    setNewCategoryColor,
    updateCategory,
  } = useSplitControl();

  const theme = useThemeColor();
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<WorkoutCategory | null>(null);

  const handleAdd = () => {
    if (!newCategoryName.trim()) return;
    addCategory();
    setNewCategoryName("");
    setNewCategoryColor("#ff0000");
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    setEditingCategory(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) setEditingCategory(null);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="w-[120px] justify-center bg-gray-100 gap-2 font-medium"
          variant="outline"
          style={{ color: theme.dark }}
        >
          <Plus size={18} /> Add More
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden rounded-xl max-w-md w-full">
        <DialogHeader className="flex items-center justify-between px-6 py-4 border-b">
          <DialogTitle className="text-2xl font-semibold" style={{ color: theme.dark }}>
            {editingCategory ? "Edit Category" : "Manage Categories"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={editingCategory ? "edit" : "list"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="px-6 py-5 max-h-[75vh] overflow-y-auto"
          >
            {!editingCategory ? (
              <>
                <CategoryRow
                  theme={theme}
                  newCategoryName={newCategoryName}
                  setNewCategoryName={setNewCategoryName}
                  newCategoryColor={newCategoryColor ?? "#ff0000"}
                  setNewCategoryColor={setNewCategoryColor}
                  onAdd={handleAdd}
                />
                <CategoryList theme={theme} categories={categories} onEdit={setEditingCategory} />
              </>
            ) : (
              <CategoryEditForm
                theme={theme}
                category={editingCategory}
                onDelete={handleDelete}
                onCancel={() => setEditingCategory(null)}
                onSave={(name, color) => {
                  updateCategory(editingCategory.id, { name, color });
                  setEditingCategory(null);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ControlExerciseCategory;
