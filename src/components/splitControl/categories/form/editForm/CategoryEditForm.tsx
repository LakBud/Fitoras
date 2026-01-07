import { useState } from "react";
import type { WorkoutCategory } from "@/types/splits";
import DeleteExerciseCategoryButton from "./DeleteExerciseCategoryButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { useThemeColor } from "@/hooks/ui/useThemeColor";

interface CategoryEditProps {
  theme: ReturnType<typeof useThemeColor>;
  category: WorkoutCategory;
  onDelete: (id: string) => void;
  onCancel: () => void;
  onSave: (name: string, color: string) => void;
}

const CategoryEditForm = ({ theme, category, onDelete, onCancel, onSave }: CategoryEditProps) => {
  const [name, setName] = useState<string>(category.name);
  const [color, setColor] = useState<string>(category.color ?? "#ff0000");

  const borderColor = theme.translucentStrong;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20);
    setName(sanitized);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), color);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Name Input */}
      <div className="flex flex-col">
        <Label htmlFor="category-name" className="text-sm font-semibold mb-1" style={{ color: theme.dark }}>
          Category Name
        </Label>
        <Input
          id="category-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter category name"
          className="border rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
          style={{ borderColor }}
        />
      </div>

      {/* Color Picker */}
      <div className="flex flex-col items-center">
        <Label className="text-sm font-semibold mb-1" style={{ color: theme.dark }}>
          Category Color
        </Label>
        <div
          className="w-12 h-12 rounded-full shadow-inner cursor-pointer border"
          style={{ backgroundColor: color, borderColor }}
        >
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-full opacity-0 cursor-pointer"
            title="Pick a category color"
            aria-label="Pick a category color"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4 gap-3">
        {/* Delete */}
        <DeleteExerciseCategoryButton
          category={category}
          onConfirm={() => {
            onDelete(category.id);
            onCancel();
          }}
        />

        {/* Cancel */}
        <Button
          onClick={onCancel}
          className="flex-1 bg-gray-400 hover:bg-gray-300 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
          aria-label="Cancel editing category"
        >
          Cancel
        </Button>

        {/* Save */}
        <Button
          onClick={handleSave}
          disabled={!name.trim()}
          className={`flex-1 font-medium shadow-md hover:shadow-lg transition ${
            name.trim() ? "text-white" : "text-gray-400 cursor-not-allowed"
          }`}
          style={{
            background: name.trim() ? `linear-gradient(to right, ${theme.dark}, ${theme.primary})` : theme.translucentStrong,
          }}
          aria-label="Save category changes"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CategoryEditForm;
