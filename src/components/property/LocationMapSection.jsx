import { useState } from 'react';
import { MapPin, Navigation, Maximize2, School, ShoppingBag, Hospital, Landmark, ExternalLink } from 'lucide-react';

export default function LocationMapSection({ property }) {
  const [activeTab, setActiveTab] = useState('SCHOOLS');
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Default fallback data tailored for Bengaluru properties
  const locationName = property?.location || 'JC Road';
  const fullAddress = property?.address || `${locationName}, Bengaluru, Karnataka 560002, India`;
  const coordinates = property?.coordinates || { lat: 12.9507, lng: 77.5848 };

  // Category specific nearby amenities dataset
  const nearbyData = {
    SCHOOLS: [
      { name: 'Crescent High School', distance: '2.2 km' },
      { name: "St. Joseph's Boys High School", distance: '2.6 km' },
      { name: 'Fort High School', distance: '2.8 km' },
      { name: 'Insights IAS Academy', distance: '6.2 km' },
      { name: 'National Public School', distance: '3.4 km' },
    ],
    MALLS: [
      { name: 'UB City Luxury Mall', distance: '2.4 km' },
      { name: 'Garuda Mall', distance: '3.8 km' },
      { name: 'Nexus Forum Koramangala', distance: '4.5 km' },
      { name: 'Mantri Square Mall', distance: '5.1 km' },
    ],
    HOSPITALS: [
      { name: 'Victoria Hospital', distance: '1.5 km' },
      { name: 'BMCRI Super Speciality', distance: '1.8 km' },
      { name: 'NIMHANS Hospital', distance: '3.2 km' },
      { name: 'Apollo Hospitals Bannerghatta', distance: '4.8 km' },
    ],
    OTHERS: [
      { name: 'Lalbagh Botanical Garden', distance: '1.1 km' },
      { name: 'Kalasipalyam Main Bus Stand', distance: '1.4 km' },
      { name: 'Cubbon Park Metro Station', distance: '2.9 km' },
      { name: 'Krishnarajendra Market', distance: '1.9 km' },
    ],
  };

  const currentList = nearbyData[activeTab] || nearbyData.SCHOOLS;

  const mapsDirectionUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-soft">
      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 mb-4 font-['Outfit']">Location</h3>

      {/* Map Container */}
      <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 transition-all duration-300 ${
        isMapExpanded ? 'h-96' : 'h-72 sm:h-80'
      }`}>
        {/* OpenStreetMap iframe background canvas */}
        <iframe
          title="Property Location Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://maps.google.com/maps?q=${coordinates.lat || 12.9507},${coordinates.lng || 77.5848}&z=14&output=embed`}
          className="w-full h-full filter contrast-[1.05] opacity-95"
        />

        {/* Top-Left Floating Info Card */}
        <div className="absolute top-3 left-3 bg-white rounded-xl p-3.5 shadow-lg border border-slate-200/80 max-w-[260px] sm:max-w-[290px] text-xs z-10 backdrop-blur-md">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-bold text-slate-900 text-sm">{locationName}</h4>
            <a
              href={mapsDirectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-[#2563EB] hover:text-blue-700 shrink-0"
              title="Get Directions"
            >
              <Navigation size={16} className="rotate-45" />
              <span className="text-[10px] font-medium mt-0.5">Directions</span>
            </a>
          </div>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-2">
            {fullAddress}
          </p>

          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <span>View larger map</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Top-Right Expand Toggle */}
        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="absolute top-3 right-3 bg-white p-2 rounded-xl shadow-md hover:bg-slate-50 text-slate-700 transition-all z-10"
          title={isMapExpanded ? "Collapse Map" : "Expand Map"}
        >
          <Maximize2 size={16} />
        </button>

        {/* Mapbox attribution watermark badge */}
        <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-500 font-medium z-10 flex items-center gap-1">
          <span className="font-bold text-slate-700">mapbox</span>
          <span>© OpenStreetMap</span>
        </div>
      </div>

      {/* Category Filter Tabs (SCHOOLS, MALLS, HOSPITALS, OTHERS) */}
      <div className="flex items-center gap-2 sm:gap-3 mt-6 mb-4 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: 'SCHOOLS', label: 'SCHOOLS', icon: School },
          { key: 'MALLS', label: 'MALLS', icon: ShoppingBag },
          { key: 'HOSPITALS', label: 'HOSPITALS', icon: Hospital },
          { key: 'OTHERS', label: 'OTHERS', icon: Landmark },
        ].map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 uppercase whitespace-nowrap ${
                isActive
                  ? 'border-2 border-amber-500 text-amber-600 bg-amber-50/60 shadow-sm'
                  : 'text-slate-500 border border-slate-200 hover:text-slate-900 hover:border-slate-300 bg-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Nearby Amenity Places List */}
      <div className="space-y-3 pt-2">
        {currentList.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-sm"
          >
            <span className="text-slate-800 font-medium">{item.name}</span>
            <span className="text-slate-500 font-normal text-xs sm:text-sm shrink-0 ml-4">
              {item.distance}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
