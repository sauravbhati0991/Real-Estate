import { useProperty } from '../../context/PropertyContext';
import { CheckCircle, XCircle, Star, MapPin, Eye, Clock, Building2 } from 'lucide-react';

export default function PropertyApprovalPage() {
  const { pendingProperties, approvedProperties, updatePropertyStatus, toggleFeatured } = useProperty();

  const allProperties = [...pendingProperties, ...approvedProperties];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Property Approvals</h1>
          <p className="text-sm text-slate-500 mt-1">{pendingProperties.length} pending · {approvedProperties.length} approved</p>
        </div>

        {/* Pending */}
        {pendingProperties.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-amber-500" />
              Pending Review ({pendingProperties.length})
            </h2>
            <div className="space-y-3">
              {pendingProperties.map((prop, idx) => (
                <div key={prop.id} className="bg-white rounded-xl border-2 border-amber-200 shadow-soft p-5 animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      {prop.images?.[0] ? (
                        <img src={prop.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300"><Building2 size={24} /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 mb-1">{prop.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                        <span>{prop.priceDisplay}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {prop.location}</span>
                        <span>{prop.propertyType}</span>
                        <span>by {prop.agentName}</span>
                        <span>{prop.postedDate}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">{prop.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => updatePropertyStatus(prop.id, 'approved')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-brand-emerald text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button
                        onClick={() => updatePropertyStatus(prop.id, 'rejected')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-brand-emerald" />
            Approved ({approvedProperties.length})
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-4 py-3 font-medium text-slate-500">Property</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">Price</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">Agent</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">Views</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">Featured</th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {approvedProperties.map(prop => (
                    <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                            {prop.images?.[0] ? (
                              <img src={prop.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">🏠</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-700 truncate max-w-[200px]">{prop.title}</p>
                            <p className="text-xs text-slate-400">{prop.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700">{prop.priceDisplay}</td>
                      <td className="px-4 py-3 text-slate-500">{prop.agentName}</td>
                      <td className="px-4 py-3 text-slate-500 flex items-center gap-1"><Eye size={12} /> {prop.views}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleFeatured(prop.id)}
                          className={`${prop.featured ? 'text-amber-500' : 'text-slate-300'} hover:text-amber-500 transition-colors`}
                        >
                          <Star size={18} className={prop.featured ? 'fill-amber-500' : ''} />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => updatePropertyStatus(prop.id, 'rejected')}
                          className="text-xs text-red-500 hover:text-red-600 font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
