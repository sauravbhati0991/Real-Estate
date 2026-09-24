import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, MapPin, TrendingUp, Shield, Star } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import PropertyCard from '../../components/property/PropertyCard';
import { mockBanners } from '../../data/mockBanners';

export default function HomePage() {
  const navigate = useNavigate();
  const { approvedProperties, updateFilters } = useProperty();
  const featuredProperties = approvedProperties.filter(p => p.featured).slice(0, 4);
  const recentProperties = approvedProperties.slice(0, 6);

  const popularLocations = [
    { name: 'HSR Layout', count: '2.4K', emoji: '🏢' },
    { name: 'Koramangala', count: '3.1K', emoji: '🏙️' },
    { name: 'Whitefield', count: '5.2K', emoji: '🏡' },
    { name: 'Indiranagar', count: '1.8K', emoji: '🌳' },
    { name: 'Electronic City', count: '4.6K', emoji: '💻' },
    { name: 'Jayanagar', count: '1.5K', emoji: '🛍️' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-slate-900 to-indigo-950 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
              <Star size={14} />
              37,000+ Properties in Bengaluru
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 font-['Outfit']">
              Find Your Perfect
              <span className="block text-gradient bg-gradient-to-r from-brand-400 to-amber-400 bg-clip-text text-transparent">
                Dream Home
              </span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Explore verified properties across Bengaluru. Buy, rent, or invest in residential and commercial spaces with trusted agents.
            </p>

            {/* Search bar */}
            <div
              onClick={() => navigate('/search')}
              className="max-w-2xl mx-auto bg-white rounded-2xl p-1.5 shadow-2xl cursor-pointer hover:shadow-floating transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="pl-4 text-slate-400">
                  <Search size={22} />
                </div>
                <div className="flex-1 px-4 py-3.5 text-left">
                  <span className="text-slate-400">Search for properties, localities, or projects...</span>
                </div>
                <button className="btn-primary rounded-xl px-6 py-3 text-sm flex items-center gap-2">
                  Search
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Quick filters */}
            <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
              {['Buy', 'Rent', 'Plot', 'Villa', 'Apartment'].map(label => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === 'Buy' || label === 'Rent') {
                      updateFilters({ transactionType: label.toLowerCase() });
                    } else {
                      updateFilters({ propertyType: label });
                    }
                    navigate('/search');
                  }}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium hover:bg-white/20 hover:text-white transition-all duration-200"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Properties', value: '37.15K', icon: '🏠' },
              { label: 'Verified Agents', value: '500+', icon: '✅' },
              { label: 'Happy Customers', value: '12K+', icon: '😊' },
              { label: 'Cities', value: '25+', icon: '🌆' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">Featured Properties</h2>
              <p className="text-sm text-slate-500 mt-1">Handpicked premium listings</p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="text-sm font-medium text-brand-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredProperties.map((prop, idx) => (
              <div key={prop.id} className="animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Locations */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 font-['Outfit'] mb-2">Popular in Bengaluru</h2>
          <p className="text-sm text-slate-500 mb-6">Explore properties in top neighborhoods</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularLocations.map((loc, idx) => (
              <button
                key={loc.name}
                onClick={() => { updateFilters({ location: loc.name }); navigate('/search'); }}
                className="bg-white rounded-xl p-4 border border-slate-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-left animate-fade-in"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <span className="text-2xl">{loc.emoji}</span>
                <h3 className="font-semibold text-slate-800 mt-2 text-sm">{loc.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{loc.count} properties</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">Recently Added</h2>
            <p className="text-sm text-slate-500 mt-1">Fresh listings just for you</p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="text-sm font-medium text-brand-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {recentProperties.map((prop, idx) => (
            <div key={prop.id} className="animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
              <PropertyCard property={prop} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-600 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-['Outfit'] mb-3">Ready to List Your Property?</h2>
          <p className="text-brand-100 mb-6">Join thousands of agents and reach verified buyers instantly</p>
          <button
            onClick={() => navigate('/agent/add-property')}
            className="bg-white text-brand-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Post Property — It's Free
          </button>
        </div>
      </section>
    </div>
  );
}
