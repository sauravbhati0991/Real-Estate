import { useNavigate } from 'react-router-dom';
import { MapPin, Bookmark, BookmarkCheck, Maximize, BedDouble, ImageOff } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function PropertyCard({ property }) {
  const navigate = useNavigate();
  const { toggleSaved, savedPropertyIds } = useProperty();
  const isSaved = savedPropertyIds.includes(property.id);

  const badgeClass = {
    Sale: 'badge-sale',
    Resale: 'badge-resale',
    Rent: 'badge-rent',
  }[property.transactionType] || 'badge-sale';

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="property-card shadow-soft cursor-pointer group" onClick={handleClick}>
      {/* Image */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
            <ImageOff size={40} />
            <span className="text-sm mt-2">No images</span>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleSaved(property.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isSaved
              ? 'bg-brand-500 text-white shadow-lg'
              : 'bg-white/80 backdrop-blur-sm text-slate-500 hover:bg-white hover:text-brand-500'
          }`}
        >
          {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>

        {/* Image count */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
            1/{property.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        {/* Price + Badge */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-lg font-bold text-slate-900">{property.priceDisplay}</span>
          <span className={badgeClass}>{property.transactionType}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-slate-700 line-clamp-2 mb-2 leading-snug">
          {property.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-brand-500" />
            {property.location}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Maximize size={12} />
            {property.propertyType}
          </span>
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={12} />
              {property.bedrooms} BHK
            </span>
          )}
          <span className="flex items-center gap-1">
            📐 {property.area.toLocaleString()} {property.areaUnit}
          </span>
        </div>
      </div>
    </div>
  );
}
