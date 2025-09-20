import { useEffect, useRef, type JSX } from "react";
import { FiSearch, FiZap, FiSettings, FiBox, FiLayers, FiTarget, FiShuffle, FiRefreshCw } from "react-icons/fi";
import { useExerciseStore } from "../../stores/useExerciseStore";
import { useFilterStore } from "../../stores/useFilterStore";

const ExerciseFilter = () => {
  const { exercises } = useExerciseStore();
  const { filters, setFilters, resetFilters, applyFilters } = useFilterStore();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----------------------
  // Apply filters whenever exercises or filter values change (debounced)
  // ----------------------
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applyFilters(exercises);
    }, 250);
  }, [filters, exercises, applyFilters]);

  // ----------------------
  // Handle select/input changes
  // ----------------------
  const handleChange = (key: keyof typeof filters, value: string) => {
    setFilters({ [key]: value });
  };

  // ----------------------
  // Filter definitions
  // ----------------------
  const isString = (val: unknown): val is string => typeof val === "string";

  const filterOptions: [keyof typeof filters, string[], JSX.Element][] = [
    ["force", exercises.map((e) => e.force).filter(isString), <FiZap />],
    ["mechanic", exercises.map((e) => e.mechanic).filter(isString), <FiSettings />],
    ["equipment", exercises.map((e) => e.equipment).filter(isString), <FiBox />],
    ["category", exercises.map((e) => e.category).filter(isString), <FiLayers />],
    ["primaryMuscle", exercises.flatMap((e) => e.primaryMuscles || []).filter(isString), <FiTarget />],
    ["secondaryMuscle", exercises.flatMap((e) => e.secondaryMuscles || []).filter(isString), <FiShuffle />],
  ];

  return (
    <div className="z-20 sticky w-full top-0 md:top-auto bg-white/90 px-4 py-4 shadow-md border-t border-red-300 md:border-b md:border-t-0 rounded-b-2xl">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row items-center gap-6">
        {" "}
        {/* Added more gap for spacing */}
        {/* Search */}
        <div className="relative w-full md:w-64 flex-1">
          <input
            type="text"
            placeholder="Search Exercises..."
            value={filters.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-red-300 rounded-full bg-red-50/70 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 shadow-sm placeholder-gray-500 text-sm transition-all duration-200"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-lg" />
        </div>
        {/* Filters */}
        <div className="flex overflow-x-auto gap-4 py-1 flex-1">
          {" "}
          {/* Increased gap */}
          {filterOptions.map(([key, options, icon]) => (
            <div key={key} className="relative flex-shrink-0 w-36 md:w-40">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-lg">{icon}</div>
              <select
                value={filters[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="pl-10 pr-3 py-2 w-full border border-red-300 rounded-full bg-red-50/70 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 text-sm transition-all duration-200"
              >
                <option value="">{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                {[...new Set(options)].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {/* Reset */}
        <button
          onClick={resetFilters}
          className="ml-auto bg-red-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm transition-all duration-200"
        >
          Reset
        </button>
      </div>

      {/* Mobile layout (sticky top) */}
      <div className="md:hidden sticky top-[60px] z-50 bg-white/95 backdrop-blur-lg flex overflow-x-auto gap-4 items-center px-4 py-2 border-b border-red-200 shadow-sm">
        {" "}
        {/* Added gap */}
        {/* Reset */}
        <button
          onClick={resetFilters}
          title="Reset filters"
          className="p-3 rounded-full bg-red-600 shadow-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-red-700"
        >
          <FiRefreshCw />
        </button>
        {filterOptions.map(([key, options]) => (
          <div key={key} className="relative flex-shrink-0 ">
            <div className="absolute text-red-500 text-lg pointer-events-auto"></div>
            <select
              title={key}
              value={filters[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="pl-3 pr-2 py-2 w-full rounded-full bg-red-50 shadow-sm flex items-center text-center justify-center text-red-600 transition-all duration-200 hover:bg-red-100 focus:bg-red-200 text-sm"
            >
              <option value="">{key.charAt(0).toUpperCase() + key.slice(1)}</option>
              {[...new Set(options)].map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseFilter;
