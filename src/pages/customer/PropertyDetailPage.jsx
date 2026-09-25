import { useParams, useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';
import { useState } from 'react';
import {
  MapPin, Maximize, BedDouble, Bath, Armchair, Clock, Eye,
  Phone, BookmarkCheck, Bookmark, Share2, Check, Download,
  ChevronUp, MessageCircle, Mail, Copy, CheckCircle2,
  Building2, Home, Compass, Layers, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import ImageCarousel from '../../components/property/ImageCarousel';
import Highlights from '../../components/property/Highlights';
import ContactModal from '../../components/leads/ContactModal';
import LocationMapSection from '../../components/property/LocationMapSection';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, toggleSaved, savedPropertyIds } = useProperty();
  const [showContact, setShowContact] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const property = getPropertyById(id);
  const isSaved = property ? savedPropertyIds.includes(property.id) : false;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-['Outfit']">Property Not Found</h2>
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

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Property Inquiry: ${property.title}`);
    const body = encodeURIComponent(`Check out this property listing:\n${property.title}\nPrice: ${property.priceDisplay}\nLocation: ${property.location}\nLink: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBrochureDownload = () => {
    alert(`Downloading property brochure for ${property.title}...`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const badgeClass = {
    Sale: 'bg-[#E0F2FE] text-[#0369A1]',
    Resale: 'bg-[#DCFCE7] text-[#15803D]',
    Rent: 'bg-[#EFF6FF] text-[#1D4ED8]',
  }[property.transactionType] || 'bg-[#DCFCE7] text-[#15803D]';

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main 2-Column Grid Layout (Left Content 70%, Right Sidebar 30%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT COLUMN: Media, Pricing, Features, Overview, Location */}
          <div className="lg:col-span-8 space-y-6">

            {/* 1. Image Carousel Container */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-soft border border-slate-200/80">
              <ImageCarousel images={property.images} title={property.title} />
            </div>

            {/* 2. Price, Title, and Key Feature Cards Box */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft border border-slate-200/80">
              {/* Header: Price & Actions */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
                    {property.priceDisplay}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Price breakup</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold ${badgeClass}`}>
                    {property.transactionType}
                  </span>
                  
                  <button
                    onClick={() => toggleSaved(property.id)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200 ${
                      isSaved
                        ? 'bg-amber-500 border-amber-600 text-white shadow-md'
                        : 'bg-white border-slate-200 text-amber-500 hover:bg-amber-50'
                    }`}
                    title={isSaved ? "Saved" : "Save Property"}
                  >
                    {isSaved ? <BookmarkCheck size={18} className="fill-current" /> : <Bookmark size={18} />}
                  </button>
                </div>
              </div>

              {/* Title & Location */}
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-['Outfit'] mb-1">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <MapPin size={16} className="text-[#C87A3D]" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Key Features 4-Grid Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Card 1: Type */}
                <div className="border border-slate-200/80 rounded-xl p-3.5 bg-white flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{property.propertyType}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Type</p>
                  </div>
                  <Home size={22} className="text-[#C87A3D] shrink-0" />
                </div>

                {/* Card 2: Area */}
                <div className="border border-slate-200/80 rounded-xl p-3.5 bg-white flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {(property.area / 1000).toFixed(2)}K {property.areaUnit}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Area</p>
                  </div>
                  <Compass size={22} className="text-[#C87A3D] shrink-0" />
                </div>

                {/* Card 3: Category */}
                <div className="border border-slate-200/80 rounded-xl p-3.5 bg-white flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{property.category || 'Residential'}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Category</p>
                  </div>
                  <Building2 size={22} className="text-[#C87A3D] shrink-0" />
                </div>

                {/* Card 4: Status */}
                <div className="border border-slate-200/80 rounded-xl p-3.5 bg-white flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">
                      {property.bedrooms > 0 ? `${property.bedrooms} BHK Ready` : 'Ready for registration'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Property status</p>
                  </div>
                  <ShieldCheck size={22} className="text-[#C87A3D] shrink-0" />
                </div>
              </div>

              {/* Extra details expanded view */}
              {showMoreDetails && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-slate-100 animate-fade-in">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-400">Furnishing</p>
                    <p className="text-sm font-semibold text-slate-800">{property.furnishing}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-400">Bathrooms</p>
                    <p className="text-sm font-semibold text-slate-800">{property.bathrooms > 0 ? property.bathrooms : 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-400">Posted Date</p>
                    <p className="text-sm font-semibold text-slate-800">{new Date(property.postedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-400">Views</p>
                    <p className="text-sm font-semibold text-slate-800">{property.views}</p>
                  </div>
                </div>
              )}

              {/* See More Link */}
              <button
                onClick={() => setShowMoreDetails(!showMoreDetails)}
                className="w-full text-center text-sm font-bold text-[#FF6B00] hover:underline mt-4 cursor-pointer"
              >
                {showMoreDetails ? 'See less' : 'See more'}
              </button>
            </div>

            {/* 3. Overview Card */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft border border-slate-200/80">
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit']">Overview</h3>
              <p className={`text-sm text-slate-600 leading-relaxed ${!showFullOverview && 'line-clamp-3'}`}>
                {property.description}
              </p>
              <button
                onClick={() => setShowFullOverview(!showFullOverview)}
                className="text-sm font-bold text-[#FF6B00] hover:underline mt-2 inline-block cursor-pointer"
              >
                {showFullOverview ? 'See less' : 'See more'}
              </button>
            </div>

            {/* 4. Highlights & Amenities */}
            {((property.highlights && property.highlights.length > 0) || (property.amenities && property.amenities.length > 0)) && (
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft border border-slate-200/80">
                {property.highlights && property.highlights.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Highlights</h3>
                    <Highlights highlights={property.highlights} />
                  </div>
                )}

                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {property.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Location & Nearby Amenities Interactive Section */}
            <LocationMapSection property={property} />

          </div>

          {/* RIGHT COLUMN: Agent Details, Brochure, Share, Floating Controls */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">

            {/* 1. Listed By Card */}
            <div className="bg-white rounded-2xl p-5 shadow-soft border border-slate-200/80">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Listed by</p>
              
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1 flex-shrink-0">
                  <Building2 size={24} className="text-slate-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {property.agentName || 'Kuber Spaces & Estate Consulting'}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">Agent</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                  className="w-full bg-[#10B981] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#059669] transition-all shadow-sm"
                >
                  <Phone size={18} />
                  <span>{showPhoneNumber ? '+91 98765 43210' : 'View Number'}</span>
                </button>

                <button
                  onClick={() => setShowContact(true)}
                  className="w-full bg-white border border-[#10B981] text-[#10B981] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all"
                >
                  <span>Get a callback</span>
                </button>
              </div>
            </div>

            {/* 2. Property Brochure Card */}
            <div className="bg-white rounded-2xl p-5 shadow-soft border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Property brochure</h4>
              <button
                onClick={handleBrochureDownload}
                className="w-full bg-white border border-[#FF6B00] text-[#FF6B00] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-50 transition-all"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>

            {/* 3. Share This Property Card */}
            <div className="bg-white rounded-2xl p-5 shadow-soft border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Share this property</h4>

              <div className="grid grid-cols-3 gap-2 text-center">
                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <MessageCircle size={22} className="text-[#25D366] mb-1" />
                  <span className="text-xs font-semibold text-slate-700">WhatsApp</span>
                </button>

                {/* Email */}
                <button
                  onClick={handleEmailShare}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <Mail size={22} className="text-[#EA4335] mb-1" />
                  <span className="text-xs font-semibold text-slate-700">Email</span>
                </button>

                {/* Copy */}
                <button
                  onClick={handleCopy}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <Copy size={22} className="text-[#FF6B00] mb-1" />
                  <span className="text-xs font-semibold text-slate-700">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Circular Quick Buttons on Bottom Right */}
      <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex flex-col gap-2.5">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition-all"
          title="Scroll to Top"
        >
          <ChevronUp size={20} />
        </button>
        <button
          onClick={handleCopy}
          className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition-all"
          title="Share Link"
        >
          <Share2 size={18} />
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
