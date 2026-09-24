import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { Upload, Plus, X, CheckCircle, ArrowLeft, MapPin, Image as ImageIcon } from 'lucide-react';
import { PROPERTY_TYPES, TRANSACTION_TYPES, FURNISHING_OPTIONS, AMENITIES_LIST, HIGHLIGHTS_LIST, BENGALURU_LOCATIONS } from '../../data/mockProperties';

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const { addProperty } = useProperty();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: '',
    propertyType: 'Apartment',
    transactionType: 'Sale',
    category: 'Residential',
    price: '',
    priceUnit: 'total',
    area: '',
    areaUnit: 'sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    furnishing: 'Semi Furnished',
    location: 'HSR Layout',
    address: '',
    description: '',
    highlights: [],
    amenities: [],
    images: [],
  });

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleArrayItem = (field, item) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceNum = parseInt(form.price.replace(/,/g, ''));
    const areaNum = parseInt(form.area.replace(/,/g, ''));

    const formatPrice = (p) => {
      if (form.priceUnit === 'month') return `₹${p.toLocaleString('en-IN')}/month`;
      if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
      if (p >= 100000) return `₹${(p / 100000).toFixed(0)} Lakhs`;
      return `₹${p.toLocaleString('en-IN')}`;
    };

    addProperty({
      ...form,
      price: priceNum,
      area: areaNum,
      priceDisplay: formatPrice(priceNum),
      agentId: user.id,
      agentName: user.name,
      coordinates: { lat: 12.9716, lng: 77.5946 },
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      ],
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-card p-8 max-w-md w-full text-center animate-slide-up">
          <div className="w-16 h-16 rounded-full bg-brand-emerald/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={36} className="text-brand-emerald" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Property Submitted!</h2>
          <p className="text-sm text-slate-500 mb-6">
            Your property has been submitted for review. Our admin team will review and approve it within 24 hours.
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/agent')} className="btn-secondary flex-1">
              Dashboard
            </button>
            <button onClick={() => { setSubmitted(false); setForm({ ...form, title: '', price: '', area: '', address: '', description: '' }); }} className="btn-primary flex-1">
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Add New Property</h1>
            <p className="text-sm text-slate-500">Fill in the details to list your property</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 md:p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Basic Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Property Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., 2 BHK Apartment for Sale in HSR Layout"
                  required
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                  <select value={form.propertyType} onChange={(e) => updateField('propertyType', e.target.value)} className="input-field">
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Transaction</label>
                  <select value={form.transactionType} onChange={(e) => updateField('transactionType', e.target.value)} className="input-field">
                    {TRANSACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="input-field">
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹) *</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => updateField('price', e.target.value)}
                    placeholder="e.g., 85,00,000"
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Area *</label>
                  <input
                    type="text"
                    value={form.area}
                    onChange={(e) => updateField('area', e.target.value)}
                    placeholder="e.g., 1200"
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bedrooms</label>
                  <select value={form.bedrooms} onChange={(e) => updateField('bedrooms', parseInt(e.target.value))} className="input-field">
                    {[0,1,2,3,4,5,6].map(n => <option key={n} value={n}>{n === 0 ? 'N/A' : `${n} BHK`}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bathrooms</label>
                  <select value={form.bathrooms} onChange={(e) => updateField('bathrooms', parseInt(e.target.value))} className="input-field">
                    {[0,1,2,3,4,5,6].map(n => <option key={n} value={n}>{n === 0 ? 'N/A' : n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Furnishing</label>
                  <select value={form.furnishing} onChange={(e) => updateField('furnishing', e.target.value)} className="input-field">
                    {FURNISHING_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 md:p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-brand-500" />
              Location
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Locality</label>
                <select value={form.location} onChange={(e) => updateField('location', e.target.value)} className="input-field">
                  {BENGALURU_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Enter complete address"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 md:p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-brand-500" />
              Photos
            </h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-brand-400 transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-600">Drag & drop photos here</p>
              <p className="text-xs text-slate-400 mt-1">or click to browse (max 15 images)</p>
              <p className="text-xs text-brand-500 mt-3 font-medium">📸 Placeholder: Photos will be added in production</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 md:p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {HIGHLIGHTS_LIST.map(h => (
                <button
                  key={h}
                  type="button"
                  onClick={() => toggleArrayItem('highlights', h)}
                  className={`filter-chip ${form.highlights.includes(h) ? 'active' : ''}`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 md:p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {AMENITIES_LIST.map(a => (
                <label key={a} className="flex items-center gap-2 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(a)}
                    onChange={() => toggleArrayItem('amenities', a)}
                    className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-600">{a}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 md:p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Description</h3>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe your property in detail..."
              rows={5}
              className="textarea-field"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Plus size={18} />
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
