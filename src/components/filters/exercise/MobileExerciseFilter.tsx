import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExerciseFilterOptions } from "@/hooks/exercise/useExerciseFilterOptions";
import { useExerciseFilterStore } from "@/stores/exercises/useExerciseFilterStore";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@radix-ui/react-select";
import { FiRefreshCw, FiSearch, FiX } from "react-icons/fi";

const MobileExerciseFilter = () => {
  const options = useExerciseFilterOptions();
  const { filters, setFilters, resetFilters } = useExerciseFilterStore();

  const changeName = (v: string) => setFilters({ name: v });
  const changeFilter = (key: string, v: string) => setFilters({ [key]: v === "__all__" ? "" : v });

  return (
    <div
      role="search"
      aria-label="Exercise filter bar"
      className="w-full bg-white/90 backdrop-blur-lg border-b border-red-300 shadow-md"
    >
      <div className="flex overflow-x-auto gap-3 items-center px-3 py-2 scrollbar-hide">
        {/* Reset */}
        <Button
          onClick={resetFilters}
          aria-label="Reset all filters"
          className="p-2 rounded-full bg-red-700 shadow-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 flex-shrink-0"
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
            onChange={(e) => changeName(e.target.value)}
            className="pl-10 pr-10 py-2 w-full border border-red-400 rounded-full bg-red-50/80 text-gray-800 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm transition-all duration-200
               [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden
               [&::-moz-search-clear-button]:hidden [&::-ms-clear]:hidden"
          />

          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true" />
          {filters.name && (
            <Button
              type="button"
              onClick={() => changeName("")}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-600 transition-colors bg-none bg-transparent hover:bg-transparent"
            >
              <FiX className="text-sm" aria-hidden="true" />
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex-shrink-0 flex gap-2" aria-label="Exercise attribute filters">
          {options.map(({ key, values, icon: Icon }) => (
            <div key={key} className="relative min-w-[140px]">
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-base pointer-events-none z-10"
                aria-hidden="true"
              >
                <Icon />
              </div>

              <Select value={filters[key] || "__all__"} onValueChange={(v) => changeFilter(key, v)}>
                <SelectTrigger className="flex items-center justify-between gap-2 pl-10 pr-3 py-2 w-full border border-red-400 rounded-full bg-red-50/80 hover:bg-red-100/80 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 data-[state=open]:bg-red-100/80">
                  <span className="truncate flex-1 text-left">
                    {filters[key]
                      ? filters[key].charAt(0).toUpperCase() + filters[key].slice(1)
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <svg
                    className="w-4 h-4 flex-shrink-0 text-red-600 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </SelectTrigger>

                <SelectContent
                  className="z-[9999] max-h-[60vh] overflow-y-auto rounded-xl border bg-white shadow-xl"
                  position="popper"
                  sideOffset={8}
                  align="start"
                >
                  <SelectItem
                    value="__all__"
                    className="relative flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-600 outline-none cursor-pointer select-none data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700 transition-all duration-150 border-b border-gray-100"
                  >
                    <span>All {key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    {!filters[key] && (
                      <svg className="w-4 h-4 ml-2 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </SelectItem>

                  {values.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="relative flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 font-medium outline-none cursor-pointer select-none data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700 data-[state=checked]:text-red-600 data-[state=checked]:font-semibold transition-all duration-150"
                    >
                      <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                      {filters[key] === value && (
                        <svg className="w-4 h-4 ml-2 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileExerciseFilter;
