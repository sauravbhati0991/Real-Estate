import { useParams, useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';
import { useState } from 'react';
import { ArrowLeft, MapPin, Maximize, BedDouble, Bath, Armchair, Clock, Eye, MessageCircle, Phone, Heart, Share2, BookmarkCheck, Bookmark } from 'lucide-react';
import ImageCarousel from '../../components/property/ImageCarousel';
import Highlights from '../../components/property/Highlights';
import ContactModal from '../../components/leads/ContactModal';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, toggleSaved, savedPropertyIds } = useProperty();
  const [showContact, setShowContact] = useState(false);

  const property = getPropertyById(id);
  const isSaved = savedPropertyIds.includes(id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Property Not Found</h2>
          <p className="text-slate-500 mb-4">The property you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/search')} className="btn-primary">
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const text = `Hi, I'm interested in: ${property.title} (${property.priceDisplay}). Please share more details.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8">
      {/* Back button */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Results</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaved(property.id)}
              className={`p-2 rounded-lg border transition-colors ${isSaved ? 'bg-brand-50 border-brand-200 text-brand-500' : 'border-slate-200 text-slate-400 hover:text-brand-500'}`}
            >
              {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Agent bar */}
        <div className="bg-brand-navy text-white rounded-t-xl px-5 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold">
            {property.agentName.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-semibold text-sm">{property.agentName}</span>
        </div>

        {/* Image carousel */}
        <ImageCarousel images={property.images} title={property.title} />

        {/* Content */}
        <div className="bg-white rounded-b-xl shadow-soft border border-slate-200 border-t-0">
          <div className="p-5 md:p-7">
            {/* Title + Save */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight font-['Outfit']">
                {property.title}
              </h1>
              <button
                onClick={() => toggleSaved(property.id)}
                className="flex-shrink-0 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Heart size={24} className={isSaved ? 'fill-red-500 text-red-500' : ''} />
              </button>
            </div>

            {/* Price + Key stats */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-6 pb-6 border-b border-slate-100">
              <div>
                <p className="text-3xl font-bold text-slate-900">{property.priceDisplay}</p>
                <p className="text-sm text-slate-400">Price breakup</p>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden md:block" />
              <div>
                <p className="text-xl font-bold text-slate-900">{property.area.toLocaleString()} {property.areaUnit}</p>
                <p className="text-sm text-slate-400">Builtup area</p>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden md:block" />
              <div>
                <p className="text-xl font-bold text-slate-900">{property.furnishing}</p>
                <p className="text-sm text-slate-400">Furnishing status</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <Highlights highlights={property.highlights} />
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Maximize, label: 'Type', value: property.propertyType },
                { icon: BedDouble, label: 'Bedrooms', value: property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'N/A' },
                { icon: Bath, label: 'Bathrooms', value: property.bathrooms > 0 ? property.bathrooms : 'N/A' },
                { icon: Armchair, label: 'Furnishing', value: property.furnishing },
                { icon: MapPin, label: 'Location', value: property.location },
                { icon: Clock, label: 'Posted', value: new Date(property.postedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                { icon: Eye, label: 'Views', value: property.views },
              ].map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <detail.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{detail.label}</p>
                    <p className="text-sm font-semibold text-slate-700">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-2">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Address */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-brand-500" />
                <span className="text-slate-600">{property.address}</span>
              </div>
            </div>

            {/* Updated time */}
            <p className="text-xs text-slate-400 mt-4">
              Updated {Math.floor(Math.random() * 4 + 1)}w ago
            </p>
          </div>

          {/* Action buttons */}
          <div className="border-t border-slate-100 p-5 flex items-center gap-3">
            <button onClick={handleWhatsApp} className="btn-whatsapp flex-1 justify-center">
              <MessageCircle size={20} />
              Chat
            </button>
            <button onClick={() => setShowContact(true)} className="btn-contact flex-1 justify-center">
              <Phone size={20} />
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Fixed mobile CTA */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex gap-3 md:hidden z-30">
        <button onClick={handleWhatsApp} className="btn-whatsapp flex-1 justify-center py-3">
          <MessageCircle size={18} />
          Chat
        </button>
        <button onClick={() => setShowContact(true)} className="btn-contact flex-1 justify-center py-3">
          <Phone size={18} />
          Contact
        </button>
      </div>

      {/* Contact modal */}
      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
        property={property}
      />
    </div>
  );
}
