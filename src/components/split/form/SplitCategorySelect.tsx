import { type UseFormRegister } from "react-hook-form";
import type { FormValues } from "@/hooks/split/useSplitForm";

interface Props {
  register: UseFormRegister<FormValues>;
  watchCategoryId: string | undefined;
  categories: { id: string; name: string; color: string }[];
}

export const SplitCategorySelect = ({ register, watchCategoryId, categories }: Props) => (
  <div className="space-y-2">
    <label htmlFor="category" className="block text-sm font-semibold text-rose-600">
      Category <span className="text-gray-400">(Optional)</span>
    </label>

    <select
      id="category"
      {...register("categoryId")}
      className="w-full px-3 py-3 rounded-xl focus:outline-none transition text-base border border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
    >
      <option value="">None</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
      <option value="new">+ Add New</option>
    </select>

    {/* Existing Category Colors */}
    {watchCategoryId && watchCategoryId !== "new" && (
      <div className="mt-4 w-full flex justify-center">
        <div
          className="w-12 h-12 rounded-xl border shadow-sm"
          style={{ backgroundColor: categories.find((c) => c.id === watchCategoryId)?.color || "#ef4444" }}
        />
      </div>
    )}
  </div>
);
