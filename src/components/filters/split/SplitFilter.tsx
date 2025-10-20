import { FiLayers } from "react-icons/fi";
import { useMemo } from "react";
import { useSplitFilterStore } from "@/stores/split/useSplitFilterStore";
import { useCurrentCategories } from "@/stores/split/useCurrentCategories";
import MobileSplitFilter from "./MobileSplitFilter";
import DesktopSplitFilter from "./DesktopSplitFilter";
import useBreakpoint from "@/hooks/ui/useBreakpoint";

type FilterOption = readonly [key: string, options: { id: string; name: string }[], icon: React.ReactNode];

const SplitFilter = () => {
  const { isDesktop } = useBreakpoint();
  const { name, categoryId, resetFilters } = useSplitFilterStore();
  const categories = useCurrentCategories((s) => s.categories);

  const filterOptions = useMemo<readonly FilterOption[]>(() => [["category", categories, <FiLayers />]] as const, [categories]);

  const commonProps = {
    name,
    categoryId,
    resetFilters,
    filterOptions,
  };

  return isDesktop ? <DesktopSplitFilter {...commonProps} /> : <MobileSplitFilter {...commonProps} />;
};

export default SplitFilter;
