import { FiSearch, FiRefreshCw, FiX, FiInbox } from "react-icons/fi";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { useSplitFilterStore } from "../../stores/splits/useSplitFilterStore";
import { useCurrentCategories } from "../../stores/splits/useCurrentCategories";

const SplitFilter = () => {
  const { isDesktop, isMobile } = useBreakpoint();

  const { name, categoryId, setName, setCategoryId, resetFilters } = useSplitFilterStore();
  const categories = useCurrentCategories((state) => state.categories);

  const handleChange = (key: "name" | "categoryId", value: string) => {
    if (key === "name") setName(value);
    else setCategoryId(value);
  };

  const filterOptions = [["categoryId", categories.map((c) => c.name)]] as const;

  // --- Desktop layout ---
  if (isDesktop) {
    return (
      <div
        role="search"
        aria-label="Split filter bar"
        className="z-20 sticky w-full top-0 md:top-auto bg-white/90 px-4 py-2 shadow-md border-t border-red-300 md:border-b md:border-t-0 rounded-b-2xl flex flex-row items-center gap-6"
      >
        {/* Search */}
        <div className="relative w-full md:w-64 flex-1">
          <label htmlFor="split-search" className="sr-only">
            Search splits
          </label>
          <input
            type="text"
            id="split-search"
            name="search"
            placeholder="Search Splits..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-red-400 rounded-full bg-red-50/70 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm placeholder-gray-500 text-sm transition-all duration-200"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true" />
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-4 py-1 flex-1" aria-label="Category filter">
          {filterOptions.map(([key, options]) => (
            <div key={key} className="relative flex-shrink-0 w-36 md:w-40">
              <label htmlFor="split-category" className="sr-only">
                Filter by category
              </label>
              <select
                id="split-category"
                name="categoryId"
                value={categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
                className="pl-10 pr-3 py-2 w-full border border-red-400 rounded-full bg-red-50/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition-all duration-200"
              >
                <option value="">Category</option>
                {options.map((opt) => (
                  <option key={opt} value={categories.find((c) => c.name === opt)?.id}>
                    {opt}
                  </option>
                ))}
              </select>
              <FiInbox className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Reset */}
        <button
          onClick={resetFilters}
          aria-label="Reset filters"
          className="ml-auto bg-red-700 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition-all duration-200"
        >
          Reset
        </button>
      </div>
    );
  }

  // --- Mobile layout ---
  if (isMobile) {
    return (
      <div
        role="search"
        aria-label="Split filter bar"
        className="sticky top-[60px] z-50 bg-white/95 backdrop-blur-lg flex overflow-x-auto gap-3 items-center px-3 py-2 border-b border-red-300 shadow-sm"
      >
        {/* Reset */}
        <button
          onClick={resetFilters}
          aria-label="Reset all filters"
          className="p-2 rounded-full bg-red-700 shadow-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FiRefreshCw className="text-lg" aria-hidden="true" />
        </button>

        {/* Search */}
        <div className="relative flex-1 min-w-[140px]">
          <label htmlFor="split-search" className="sr-only">
            Search splits
          </label>
          <input
            type="search"
            id="split-search"
            name="search"
            placeholder="Search"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="pl-10 pr-10 py-2 w-full border border-red-400 rounded-full bg-red-50/70 text-gray-800 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm transition-all duration-200"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true" />
          {name && (
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
        <div className="flex-shrink-0 flex gap-2" aria-label="Category filter">
          {filterOptions.map(([key, options]) => (
            <div key={key}>
              <label htmlFor="split-category" className="sr-only">
                Filter by category
              </label>
              <select
                id="split-category"
                name="categoryId"
                value={categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
                className="px-3 py-2 rounded-full bg-red-50 shadow-sm text-red-700 text-sm transition-all duration-200 hover:bg-red-100 focus:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Category</option>
                {options.map((opt) => (
                  <option key={opt} value={categories.find((c) => c.name === opt)?.id}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default SplitFilter;
