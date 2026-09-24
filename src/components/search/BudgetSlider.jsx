import { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';

export default function BudgetSlider() {
  const { filters, updateFilters } = useProperty();
  const [min, setMin] = useState(filters.minPrice || 0);
  const [max, setMax] = useState(filters.maxPrice === Infinity ? 100000000 : filters.maxPrice);
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');

  const handleSubmit = () => {
    updateFilters({
      minPrice: min,
      maxPrice: max >= 100000000 ? Infinity : max,
    });
  };

  const formatLabel = (val) => {
    if (val >= 10000000) return `${(val / 10000000).toFixed(0)}Cr`;
    if (val >= 100000) return `${(val / 100000).toFixed(0)}L`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
    return val;
  };

  return (
    <div className="space-y-4">
      {/* Input fields */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
          <input
            type="text"
            placeholder="Minimum"
            value={minInput}
            onChange={(e) => {
              setMinInput(e.target.value);
              const val = parseInt(e.target.value.replace(/,/g, ''));
              if (!isNaN(val)) setMin(val);
            }}
            className="input-field pl-7 text-sm py-2"
          />
        </div>
        <span className="text-slate-400 text-sm">-</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
          <input
            type="text"
            placeholder="Maximum"
            value={maxInput}
            onChange={(e) => {
              setMaxInput(e.target.value);
              const val = parseInt(e.target.value.replace(/,/g, ''));
              if (!isNaN(val)) setMax(val);
            }}
            className="input-field pl-7 text-sm py-2"
          />
        </div>
      </div>

      {/* Slider */}
      <div className="px-1">
        <input
          type="range"
          min={0}
          max={100000000}
          step={500000}
          value={max >= 100000000 ? 100000000 : max}
          onChange={(e) => setMax(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-brand-500
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between mt-1 text-xs text-slate-400">
          <span>0</span>
          <span>2Cr</span>
          <span>10Cr+</span>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full btn-primary py-2.5 text-sm"
      >
        Submit
      </button>
    </div>
  );
}
