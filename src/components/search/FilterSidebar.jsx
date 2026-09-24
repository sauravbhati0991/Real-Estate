import { useState } from 'react';
import { Filter, ChevronUp, X } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import BudgetSlider from './BudgetSlider';

export default function FilterSidebar() {
  const { filters, updateFilters, resetFilters } = useProperty();
  const [expanded, setExpanded] = useState(true);

  const categoryOptions = ['Residential', 'Commercial'];
  const bhkOptions = [1, 2, 3, 4, 5, 6];

  const activeFilterCount = [
    filters.category !== 'Residential' ? 1 : 0,
    filters.propertyType ? 1 : 0,
    filters.bedrooms ? 1 : 0,
    filters.minPrice > 0 || filters.maxPrice < Infinity ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100"
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-500" />
          <span className="font-semibold text-slate-800">Applied Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        <ChevronUp size={18} className={`text-slate-400 transition-transform ${expanded ? '' : 'rotate-180'}`} />
      </button>

      {expanded && (
        <div className="p-5 space-y-6 animate-fade-in">
          {/* Active category chips */}
          {filters.category && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-medium border border-brand-200">
                {filters.category}
                <button onClick={() => updateFilters({ category: '' })} className="ml-1">
                  <X size={14} />
                </button>
              </span>
            </div>
          )}

          {/* Budget */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-lg">💰</span> Budget
            </h4>
            <BudgetSlider />
          </div>

          {/* Property Category */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-lg">🏠</span> Property category
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            </h4>
            <div className="flex gap-2">
              {categoryOptions.map(cat => (
                <button
                  key={cat}
                  onClick={() => updateFilters({ category: filters.category === cat ? '' : cat })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
                    filters.category === cat
                      ? 'bg-brand-50 border-brand-500 text-brand-600'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* BHK */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-lg">🛏️</span> Bedrooms (BHK)
            </h4>
            <div className="flex gap-2 flex-wrap">
              {bhkOptions.map(bhk => (
                <button
                  key={bhk}
                  onClick={() => updateFilters({ bedrooms: filters.bedrooms === String(bhk) ? '' : String(bhk) })}
                  className={`w-10 h-10 rounded-lg text-sm font-medium border transition-all duration-150 ${
                    filters.bedrooms === String(bhk)
                      ? 'bg-brand-500 border-brand-500 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="w-full py-2.5 text-sm font-medium text-brand-500 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
