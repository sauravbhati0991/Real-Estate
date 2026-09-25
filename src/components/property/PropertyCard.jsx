import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bookmark, BookmarkCheck, Maximize, BedDouble, Home, ImageOff, Share2, Check } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function PropertyCard({ property }) {
  const navigate = useNavigate();
  const { toggleSaved, savedPropertyIds } = useProperty();
  const [copied, setCopied] = useState(false);
  const isSaved = savedPropertyIds.includes(property.id);

  const badgeClass = {
    Sale: 'badge-sale',
    Resale: 'badge-resale',
    Rent: 'badge-rent',
  }[property.transactionType] || 'badge-sale';

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/property/${property.id}`;
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} (${property.priceDisplay})`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="property-card shadow-soft cursor-pointer group bg-white rounded-2xl overflow-hidden border border-slate-100" onClick={handleClick}>
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

        {/* Share & Bookmark save buttons */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
          <button
            type="button"
            onClick={handleShare}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200/80 text-slate-700 shadow-md hover:bg-slate-50 hover:text-brand-500 active:scale-95 transition-all duration-200"
            title="Share Property"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaved(property.id);
            }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-md active:scale-95 transition-all duration-200 ${
              isSaved
                ? 'bg-amber-500 border-amber-600 text-white shadow-amber-500/20'
                : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:text-amber-500'
            }`}
            title={isSaved ? "Saved" : "Save Property"}
          >
            {isSaved ? <BookmarkCheck size={16} className="fill-current" /> : <Bookmark size={16} />}
          </button>
        </div>

        {/* Image count */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-md backdrop-blur-sm">
            1/{property.images.length}
          </div>
        )}
      </div>

      {/* Content / Description Block */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between">
        {/* Price + Badge */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-base sm:text-lg font-bold text-slate-900 leading-none">
            {property.priceDisplay}
          </span>
          <span className={badgeClass}>{property.transactionType}</span>
        </div>

        {/* Title / Project Name */}
        <h3 className="text-sm font-medium text-slate-800 line-clamp-1 mb-2.5 leading-snug">
          {property.title}
        </h3>

        {/* Details List (Location, Property Type, BHK) */}
        <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-slate-700">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[#C87A3D] shrink-0 stroke-[1.8]" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Property Type */}
          <div className="flex items-center gap-2">
            <Home size={15} className="text-[#C87A3D] shrink-0 stroke-[1.8]" />
            <span className="truncate">{property.propertyType}</span>
          </div>

          {/* BHK / Area */}
          {property.bedrooms > 0 ? (
            <div className="flex items-center gap-2">
              <BedDouble size={15} className="text-[#C87A3D] shrink-0 stroke-[1.8]" />
              <span>{property.bedrooms} BHK</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Maximize size={15} className="text-[#C87A3D] shrink-0 stroke-[1.8]" />
              <span>{property.area.toLocaleString()} {property.areaUnit}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
