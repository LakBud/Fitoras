import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import type { Theme } from "@/types/theme";

interface CategoryRowProps {
  newCategoryName: string;
  setNewCategoryName?: (val: string) => void;
  newCategoryColor?: string;
  setNewCategoryColor?: (val: string) => void;
  onAdd: () => void;
  theme: Theme;
}

const CategoryRow = ({
  newCategoryName,
  setNewCategoryName,
  newCategoryColor,
  setNewCategoryColor,
  onAdd,
  theme,
}: CategoryRowProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = newCategoryName.replace(/[^a-zA-Z]/g, "").slice(0, 20);
    if (!cleaned) return;
    setNewCategoryName?.(cleaned);
    onAdd();
    setNewCategoryName?.(""); // reset store directly (not local)
    setNewCategoryColor?.("#ff0000"); // reset color
  };

  const disabled = !newCategoryName.trim();

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3 p-4 rounded-2xl" style={{ background: theme.lighter }}>
      <div className="space-y-1" style={{ color: theme.dark }}>
        <Label className="text-sm font-semibold" style={{ color: theme.dark }}>
          Add new category
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName?.(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 20))}
          placeholder="e.g. Push, Legs…"
          className="flex-1 rounded-lg px-4 py-5 text-sm shadow-sm bg-white"
          style={{
            borderColor: theme.translucentStrong,
          }}
        />

        <Input
          type="color"
          value={newCategoryColor ?? "#ff0000"}
          onChange={(e) => setNewCategoryColor?.(e.target.value)}
          className="w-12 h-12 p-0 rounded-md cursor-pointer shadow-inner border"
          style={{ borderColor: theme.translucentStrong }}
          title="Pick category color"
        />

        <Button
          type="submit"
          disabled={disabled}
          className="px-5 py-4 rounded-lg font-semibold text-white disabled:opacity-50 whitespace-nowrap flex gap-1 items-center"
          style={{
            background: disabled ? theme.translucentStrong : `linear-gradient(to right, ${theme.dark}, ${theme.primary})`,
          }}
        >
          <PlusIcon />
          Add
        </Button>
      </div>

      <p className="text-[11px] text-gray-500">Letters only • max 20 chars</p>
    </form>
  );
};

export default CategoryRow;
