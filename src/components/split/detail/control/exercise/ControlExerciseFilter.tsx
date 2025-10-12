import { useMemo, useCallback, useEffect, type JSX } from "react";
import { FiSearch, FiZap, FiSettings, FiBox, FiLayers, FiTarget, FiShuffle, FiRefreshCw, FiX } from "react-icons/fi";
import { useFilterStore } from "../../../../../stores/exercises/useFilterStore";
import { useExerciseStore } from "../../../../../stores/exercises/useExerciseStore";
import { useSplitControl } from "../../../../../hooks/control/useSplitControl";
import { useThemeColor } from "../../../../../hooks/ui/useThemeColor";
import { Input } from "../../../../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../../ui/select";

export const ControlExerciseFilter = () => {
  const { exercises } = useExerciseStore();
  const { filters, setFilters, resetFilters, setAllExercises } = useFilterStore();
  const { split } = useSplitControl();
  const theme = useThemeColor(split?.category?.color);

  // Initialize filter store with all exercises
  useEffect(() => {
    if (exercises.length) setAllExercises(exercises);
  }, [exercises, setAllExercises]);

  const handleChange = useCallback((key: keyof typeof filters, value: string) => setFilters({ [key]: value }), [setFilters]);
  const isString = (val: unknown): val is string => typeof val === "string";

  const filterOptions: [keyof typeof filters, string[], JSX.Element][] = useMemo(
    () => [
      ["force", Array.from(new Set(exercises.map((e) => e.force).filter(isString))), <FiZap />],
      ["mechanic", Array.from(new Set(exercises.map((e) => e.mechanic).filter(isString))), <FiSettings />],
      ["equipment", Array.from(new Set(exercises.map((e) => e.equipment).filter(isString))), <FiBox />],
      ["category", Array.from(new Set(exercises.map((e) => e.category).filter(isString))), <FiLayers />],
      ["primaryMuscle", Array.from(new Set(exercises.flatMap((e) => e.primaryMuscles || []).filter(isString))), <FiTarget />],
      [
        "secondaryMuscle",
        Array.from(new Set(exercises.flatMap((e) => e.secondaryMuscles || []).filter(isString))),
        <FiShuffle />,
      ],
    ],
    [exercises]
  );

  const inputBaseClasses =
    "pl-10 pr-10 py-2 w-full border rounded-full shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 text-sm";

  return (
    <div
      className="top-[60px] mb-5 z-50 flex overflow-x-auto gap-3 items-center px-3 py-2 border-b shadow-sm transition-all duration-300"
      style={{ backgroundColor: theme.lighter, borderColor: theme.translucentStrong }}
    >
      {/* Reset */}
      <button
        onClick={resetFilters}
        title="Reset filters"
        className="p-2 rounded-full shadow-sm flex items-center justify-center hover:scale-110 transition-transform duration-200"
        style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}
      >
        <FiRefreshCw className="text-lg" />
      </button>

      {/* Search */}
      <div className="relative flex-1 min-w-[140px]">
        <Input
          type="search"
          placeholder="Search"
          value={filters.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`${inputBaseClasses}`}
          style={{ borderColor: theme.translucentStrong, color: theme.dark, backgroundColor: "#fff" }}
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.primary }} />
        {filters.name && (
          <button
            type="button"
            onClick={() => handleChange("name", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-red-500 transition-colors duration-200"
            style={{ color: theme.dark }}
          >
            <FiX className="text-lg" />
          </button>
        )}
      </div>

      {/* Filters */}
      {filterOptions.map(([key, options, icon]) => (
        <div key={key} className="relative flex-shrink-0 w-32">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true">
            {icon}
          </div>
          <Select value={filters[key]} onValueChange={(value) => handleChange(key, value)}>
            <SelectTrigger
              className="pl-8 pr-3 py-2 w-full border border-red-400 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 text-sm"
              style={{ borderColor: theme.translucentStrong, color: theme.dark }}
            >
              <SelectValue placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-lg shadow-md border border-red-200 mt-1">
              {options.map((opt) => (
                <SelectItem key={opt} value={opt} className="px-3 py-2 text-red-700 text-sm hover:bg-red-50 rounded-md">
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};

export default ControlExerciseFilter;
