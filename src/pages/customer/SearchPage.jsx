import { useProperty } from '../../context/PropertyContext';
import SearchBar from '../../components/search/SearchBar';
import FilterPills from '../../components/search/FilterPills';
import FilterSidebar from '../../components/search/FilterSidebar';
import PropertyGrid from '../../components/property/PropertyGrid';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export default function SearchPage() {
  const { filteredProperties, filters, updateFilters } = useProperty();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top search bar (desktop) */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Filter pills + Sort */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <FilterPills />
            <div className="hidden md:flex items-center gap-2">
              <ArrowUpDown size={14} className="text-slate-400" />
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value })}
                className="text-sm text-slate-600 font-medium bg-transparent border-none outline-none cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results count */}
        <p className="text-sm text-slate-500 mb-4">
          Showing <strong className="text-slate-700">{filteredProperties.length.toLocaleString()}</strong> properties
        </p>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <div className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-20">
              <FilterSidebar />
            </div>
          </div>

          {/* Mobile filters dropdown */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
                <div className="p-4">
                  <FilterSidebar />
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full btn-primary mt-4"
                  >
                    Show {filteredProperties.length} Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Property grid */}
          <div className="flex-1">
            <PropertyGrid properties={filteredProperties} />
          </div>
        </div>
      </div>
    </div>
  );
}
