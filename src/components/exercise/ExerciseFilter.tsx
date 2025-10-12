import { useMemo, useCallback, type JSX, useEffect } from "react";
import { FiSearch, FiZap, FiSettings, FiBox, FiLayers, FiTarget, FiShuffle, FiRefreshCw, FiX } from "react-icons/fi";
import { useFilterStore } from "../../stores/exercises/useFilterStore";
import { useExerciseStore } from "../../stores/exercises/useExerciseStore";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Button } from "../ui/button";

const ExerciseFilter = () => {
  const { exercises } = useExerciseStore();
  const { filters, setFilters, resetFilters, setAllExercises } = useFilterStore();
  const { isDesktop, isMobile } = useBreakpoint();

  useEffect(() => {
    if (exercises.length) setAllExercises(exercises);
  }, [exercises, setAllExercises]);

  // Map "__all__" to empty string internally
  const handleChange = useCallback(
    (key: keyof typeof filters, value: string) => {
      setFilters({ [key]: value === "__all__" ? "" : value });
    },
    [setFilters]
  );

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

  // --- Desktop ---
  if (isDesktop) {
    return (
      <div
        role="search"
        aria-label="Exercise filter bar"
        className="z-20 sticky w-full top-0 md:top-auto bg-white/90 px-4 py-2 shadow-md border-t border-red-300 md:border-b md:border-t-0 rounded-b-2xl flex flex-row items-center gap-6"
      >
        {/* Search */}
        <div className="relative w-full md:w-64 flex-1">
          <Label htmlFor="exercise-search" className="sr-only">
            Search exercises
          </Label>
          <Input
            type="search"
            id="exercise-search"
            name="search"
            placeholder="Search exercises..."
            value={filters.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-red-400 rounded-full bg-red-50/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm placeholder-gray-600 text-sm transition-all duration-200"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true" />
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-4 py-1 flex-1" aria-label="Exercise category filters">
          {filterOptions.map(([key, options, icon]) => (
            <div key={key} className="relative flex-shrink-0 w-36 md:w-40">
              <Label htmlFor={`filter-${key}`} className="sr-only">
                Filter by {key}
              </Label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true">
                {icon}
              </div>

              <Select value={filters[key] || "__all__"} onValueChange={(value) => handleChange(key, value)}>
                <SelectTrigger
                  id={`filter-${key}`}
                  name={key}
                  className="pl-10 pr-3 py-2 w-full border border-red-400 rounded-full bg-red-50/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition-all duration-200"
                >
                  <SelectValue placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
                </SelectTrigger>
                <SelectContent>
                  {/* Default: category name */}
                  <SelectItem value="__all__">{key.charAt(0).toUpperCase() + key.slice(1)}</SelectItem>
                  {options.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={resetFilters}
          aria-label="Reset all filters"
          className="ml-auto bg-red-700 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition-all duration-200"
        >
          Reset
        </button>
      </div>
    );
  }

  // --- Mobile ---
  if (isMobile) {
    return (
      <div
        role="search"
        aria-label="Exercise filter bar"
        className="sticky top-[60px] z-50 bg-white/95 backdrop-blur-lg flex overflow-x-auto gap-3 items-center px-3 py-2 border-b border-red-300 shadow-sm"
      >
        {/* Reset */}
        <Button
          onClick={resetFilters}
          aria-label="Reset all filters"
          className="p-2 rounded-full bg-red-700 shadow-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FiRefreshCw className="text-lg" aria-hidden="true" />
        </Button>

        {/* Search */}
        <div className="relative flex-1 min-w-[140px]">
          <Label htmlFor="exercise-search" className="sr-only">
            Search exercises
          </Label>
          <Input
            id="exercise-search"
            name="search"
            type="search"
            placeholder="Search"
            value={filters.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="pl-10 pr-10 py-2 w-full border border-red-400 rounded-full bg-red-50/80 text-gray-800 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm transition-all duration-200
             [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden
             [&::-moz-search-clear-button]:hidden [&::-ms-clear]:hidden"
          />

          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true" />
          {filters.name && (
            <button
              type="button"
              onClick={() => handleChange("name", "")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
            >
              <FiX className="text-lg" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex-shrink-0 flex gap-2" aria-label="Exercise attribute filters">
          {filterOptions.map(([key, options, icon]) => (
            <div key={key} className="relative w-32">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true">
                {icon}
              </div>
              <Select value={filters[key] || "__all__"} onValueChange={(value) => handleChange(key, value)}>
                <SelectTrigger className="pl-8 pr-3 py-2 w-full border border-red-400 rounded-full bg-red-50 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200">
                  <SelectValue placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">{key.charAt(0).toUpperCase() + key.slice(1)}</SelectItem>
                  {options.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ExerciseFilter;
