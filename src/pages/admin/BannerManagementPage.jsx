import { mockBanners } from '../../data/mockBanners';
import { Image, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function BannerManagementPage() {
  const [banners, setBanners] = useState(mockBanners);

  const toggleActive = (id) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Banner Management</h1>
            <p className="text-sm text-slate-500 mt-1">Manage hero carousel banners</p>
          </div>
          <button className="btn-primary text-sm">+ Add Banner</button>
        </div>

        <div className="space-y-4">
          {banners.map((banner, idx) => (
            <div key={banner.id} className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
              <div className="flex items-stretch">
                <div className="w-48 h-32 flex-shrink-0 relative overflow-hidden">
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} opacity-50`} />
                </div>
                <div className="flex-1 p-4 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-800">{banner.title}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        banner.active ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {banner.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">{banner.subtitle}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>CTA: {banner.ctaText}</span>
                      <span>Link: {banner.ctaLink}</span>
                      <span>Order: {banner.order}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(banner.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        banner.active
                          ? 'border-green-200 text-green-500 hover:bg-green-50'
                          : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {banner.active ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 rounded-lg border border-red-200 text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
