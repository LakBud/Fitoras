import { Tabs, TabsList } from "@/components/ui/tabs";
import { useCategoryBase } from "@/hooks/splitControl/useCategoryBase";
import { useSplitController } from "@/hooks/splitControl/useSplitController";
import { getCategoryOptions } from "@/lib/getCategoryOptions";
import { CategoryTabTrigger } from "./CategoryTabTrigger";
import { useEffect } from "react";

const ControlCategoryTab = () => {
  const { selectedCategoryId, setSelectedCategoryId, split } = useSplitController();
  const { categories } = useCategoryBase();
  useEffect(() => {
    return () => {
      setSelectedCategoryId?.(null);
    };
  }, []);
  const themeColor = split?.category?.color ?? "#6B7280";

  const allCategories = getCategoryOptions(categories, themeColor);

  return (
    <Tabs value={selectedCategoryId ?? "none"} onValueChange={(val) => setSelectedCategoryId?.(val === "none" ? null : val)}>
      <TabsList className="border-b border-gray-200 flex gap-1 overflow-x-auto pb-1 py-2 scrollbar-hide">
        {allCategories.map((cat) => (
          <CategoryTabTrigger
            key={cat.id ?? "none"}
            cat={cat}
            isActive={selectedCategoryId === cat.id}
            fallbackColor={themeColor}
          />
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ControlCategoryTab;
