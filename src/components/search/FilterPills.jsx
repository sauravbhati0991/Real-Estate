import { MapPin, ChevronDown } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import { useState, useRef, useEffect } from 'react';

export default function FilterPills() {
  const { filters, updateFilters, BENGALURU_LOCATIONS } = useProperty();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pills = [
    {
      key: 'location',
      label: filters.location || 'Bengaluru',
      icon: MapPin,
      options: ['Bengaluru', ...BENGALURU_LOCATIONS],
      onSelect: (val) => updateFilters({ location: val }),
    },
    {
      key: 'budget',
      label: 'Budget',
      options: null,
    },
    {
      key: 'transactionType',
      label: filters.transactionType === 'buy' ? 'Buy' : 'Rent',
      options: [
        { value: 'buy', label: 'Buy' },
        { value: 'rent', label: 'Rent' },
      ],
      onSelect: (val) => updateFilters({ transactionType: val }),
    },
    {
      key: 'propertyType',
      label: filters.propertyType || 'Property type',
      options: ['', 'Apartment', 'Plot', 'Villa', 'Builder Floor', 'Penthouse', 'Studio'],
      onSelect: (val) => updateFilters({ propertyType: val }),
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap" ref={dropdownRef}>
      {pills.map(pill => (
        <div key={pill.key} className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === pill.key ? null : pill.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
              openDropdown === pill.key
                ? 'border-brand-500 text-brand-600 bg-brand-50'
                : 'border-slate-200 text-slate-600 bg-white hover:border-slate-300'
            }`}
          >
            {pill.icon && <pill.icon size={14} />}
            <span>{pill.label}</span>
            <ChevronDown size={14} className={`transition-transform ${openDropdown === pill.key ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === pill.key && pill.options && (
            <div className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-card border border-slate-200 py-1 z-30 min-w-[160px] max-h-60 overflow-y-auto animate-slide-up">
              {pill.options.map((opt, idx) => {
                const value = typeof opt === 'object' ? opt.value : opt;
                const label = typeof opt === 'object' ? opt.label : (opt || 'All Types');
                const isActive = typeof opt === 'object'
                  ? filters[pill.key] === opt.value
                  : (pill.key === 'location' ? filters.location === opt : filters.propertyType === opt);

                return (
                  <button
                    key={idx}
                    onClick={() => { pill.onSelect(value); setOpenDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
