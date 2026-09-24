import PropertyCard from './PropertyCard';

export default function PropertyGrid({ properties, emptyMessage = 'No properties found' }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <span className="text-3xl">🏠</span>
        </div>
        <p className="text-lg font-medium text-slate-500">{emptyMessage}</p>
        <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {properties.map((property, index) => (
        <div
          key={property.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
}
