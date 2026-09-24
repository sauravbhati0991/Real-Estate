import { useProperty } from '../../context/PropertyContext';
import PropertyGrid from '../../components/property/PropertyGrid';
import { Bookmark } from 'lucide-react';

export default function SavedPropertiesPage() {
  const { savedProperties } = useProperty();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
            <Bookmark size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Saved Properties</h1>
            <p className="text-sm text-slate-500">{savedProperties.length} properties saved</p>
          </div>
        </div>

        <PropertyGrid
          properties={savedProperties}
          emptyMessage="No saved properties yet"
        />
      </div>
    </div>
  );
}
