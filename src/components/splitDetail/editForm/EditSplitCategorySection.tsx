import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CategoryDeleteButton from "./CategoryDeleteButton";
import type { Category } from "@/stores/splitControl/useCurrentCategories";

interface Props {
  categories: Category[];
  errors: any;
  theme: any;
  watchCategoryId: string | undefined;
  editingCategoryColor: string;
  handleCategoryColorChange: (c: string) => void;
  handleCategoryDeleted: () => void;
  register: any;
}

export function EditSplitCategorySection({
  categories,
  errors,
  theme,
  watchCategoryId,
  editingCategoryColor,
  handleCategoryColorChange,
  handleCategoryDeleted,
  register,
}: Props) {
  return (
    <div className="flex flex-col space-y-2">
      <Label className="text-sm font-semibold break-words" style={{ color: theme.darker }}>
        Category <span className="text-gray-400">(Optional)</span>
      </Label>

      <select
        {...register("categoryId")}
        className="w-full px-3 py-3 rounded-xl border focus:outline-none text-base"
        style={{ borderColor: theme.translucentStrong, color: theme.dark }}
      >
        <option value="">None</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
        <option value="new">+ Add New</option>
      </select>

      {watchCategoryId && watchCategoryId !== "new" && watchCategoryId !== "" && (
        <div
          className="mt-3 flex flex-col gap-2 p-4 rounded-xl border"
          style={{ borderColor: theme.translucentStrong, backgroundColor: theme.translucent }}
        >
          <span className="text-sm font-semibold" style={{ color: theme.darker }}>
            Category Color
          </span>
          <p className="text-xs" style={{ color: theme.dark }}>
            Changes apply to all splits using this category
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-xl border shadow-sm flex-shrink-0"
              style={{
                backgroundColor: editingCategoryColor || "#6B7280",
                borderColor: theme.translucentStrong,
              }}
            />
            <Input
              type="color"
              value={editingCategoryColor}
              onChange={(e) => handleCategoryColorChange(e.target.value)}
              className="appearance-none w-18 h-14 rounded-xl border cursor-pointer transition-transform transform hover:scale-110 focus:scale-110"
              style={{ borderColor: theme.translucentStrong }}
            />
            <span className="text-sm font-mono" style={{ color: theme.dark }}>
              {editingCategoryColor}
            </span>
          </div>

          <CategoryDeleteButton
            category={categories.find((c) => c.id === watchCategoryId)}
            onDeleted={handleCategoryDeleted}
            editingColor={editingCategoryColor}
          />
        </div>
      )}

      {watchCategoryId === "new" && (
        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <input
            {...register("newCategoryName", { required: "Category name is required" })}
            placeholder="New category name"
            className="flex-1 w-full rounded-xl px-4 py-3 border focus:ring-2 text-base break-words"
            style={{ borderColor: errors.newCategoryName ? "#FF4D4F" : theme.translucentStrong, color: theme.dark }}
          />
          <input
            type="color"
            {...register("newCategoryColor")}
            defaultValue={theme.primary}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
