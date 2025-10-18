import { FiSearch, FiRefreshCw, FiX } from "react-icons/fi";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { useExerciseFilterOptions } from "@/hooks/exercise/useExerciseFilterOptions";
import { useExerciseControlFilter } from "@/stores/splitControl/useExerciseControlFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ControlExerciseFilter = () => {
  const { split } = useSplitControl();
  const { filters, setFilters, resetFilters } = useExerciseControlFilter();

  const theme = useThemeColor(split?.category?.color);
  const options = useExerciseFilterOptions();

  const changeName = (v: string) => setFilters({ name: v });
  const changeFilter = (key: string, v: string) => setFilters({ [key]: v === "__all__" ? "" : v });

  return (
    <div
      className="mb-5 rounded-md border shadow-sm p-3 space-y-4"
      style={{ backgroundColor: theme.lighter, borderColor: theme.translucentStrong }}
    >
      {/* ---------- GROUP 1: Reset + Search ---------- */}
      <div className="flex items-center gap-3">
        <Button
          onClick={resetFilters}
          aria-label="Reset filters"
          className="px-3 py-2 rounded-md text-sm shadow-sm flex items-center gap-2"
          style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
        >
          <FiRefreshCw className="text-sm" />
          Reset
        </Button>

        <div className="relative flex-1 min-w-[180px]">
          <Input
            type="search"
            placeholder="Search exercises..."
            value={filters.name}
            onChange={(e) => changeName(e.target.value)}
            className="pl-9 pr-9 py-2 w-full rounded-md text-sm border shadow-sm
              [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden
              [&::-moz-search-clear-button]:hidden [&::-ms-clear]:hidden"
            style={{ borderColor: theme.translucentStrong, color: theme.dark, backgroundColor: "#fff" }}
          />
          <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: theme.primary }} />
          {filters.name && (
            <button
              type="button"
              onClick={() => changeName("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2"
              style={{ color: theme.dark }}
            >
              <FiX className="text-base" />
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t" style={{ borderColor: theme.translucentStrong }} />

      {/* ---------- GROUP 2: Filter Selects ---------- */}
      <div className="flex flex-wrap gap-3">
        {options.map(({ key, values, icon: Icon }) => (
          <div key={key} className="relative w-40">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-sm" style={{ color: theme.primary }}>
              <Icon />
            </div>

            <Select value={filters[key] || "__all__"} onValueChange={(v) => changeFilter(key, v)}>
              <SelectTrigger
                className="pl-8 pr-3 py-2 w-full rounded-md text-sm border shadow-sm bg-white"
                style={{ borderColor: theme.translucentStrong }}
              >
                <SelectValue placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="__all__">All {key}</SelectItem>
                {values.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlExerciseFilter;
