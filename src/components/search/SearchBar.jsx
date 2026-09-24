import { useState } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function SearchBar() {
  const { filters, updateFilters } = useProperty();
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative w-full transition-all duration-300 ${focused ? 'scale-[1.01]' : ''}`}>
      <div className={`flex items-center bg-white rounded-xl border-2 transition-all duration-200 ${
        focused ? 'border-brand-500 shadow-floating' : 'border-slate-200 shadow-soft'
      }`}>
        <div className="pl-4 text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder='Try "2 BHK apartment in Koramangala"'
          className="flex-1 px-3 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent outline-none"
        />
        {filters.search && (
          <button
            onClick={() => updateFilters({ search: '' })}
            className="p-2 text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}
        <button className="p-3 text-slate-400 hover:text-brand-500 transition-colors">
          <Mic size={18} />
        </button>
      </div>
    </div>
  );
}
