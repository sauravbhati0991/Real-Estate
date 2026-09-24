import { useAuth } from '../../context/AuthContext';
import { useProperty } from '../../context/PropertyContext';
import { useLead } from '../../context/LeadContext';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, MessageSquare, Star, TrendingUp, Plus, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function AgentDashboard() {
  const { user } = useAuth();
  const { getAgentProperties } = useProperty();
  const { getAgentLeads } = useLead();
  const navigate = useNavigate();

  const agentProperties = getAgentProperties(user.id);
  const agentLeads = getAgentLeads(user.id);

  const stats = [
    { label: 'Total Listings', value: agentProperties.length, icon: Building2, color: 'bg-blue-500', change: '+3 this month' },
    { label: 'Active Listings', value: agentProperties.filter(p => p.status === 'approved').length, icon: CheckCircle, color: 'bg-brand-emerald', change: 'Live now' },
    { label: 'Pending Review', value: agentProperties.filter(p => p.status === 'pending').length, icon: Clock, color: 'bg-amber-500', change: 'Awaiting approval' },
    { label: 'Total Leads', value: agentLeads.length, icon: MessageSquare, color: 'bg-brand-indigo', change: `${agentLeads.filter(l => l.status === 'new').length} new` },
  ];

  const recentLeads = agentLeads.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Agent Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Welcome back, <strong>{user.name}</strong></p>
          </div>
          <button onClick={() => navigate('/agent/add-property')} className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">Add Property</span>
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="text-xs text-brand-500 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Listings */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">My Listings</h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{agentProperties.length} total</span>
            </div>
            <div className="divide-y divide-slate-50 max-h-96 overflow-y-auto custom-scrollbar">
              {agentProperties.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Building2 size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No listings yet</p>
                </div>
              ) : (
                agentProperties.map(prop => (
                  <div
                    key={prop.id}
                    onClick={() => navigate(`/property/${prop.id}`)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      {prop.images?.[0] ? (
                        <img src={prop.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">🏠</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{prop.title}</p>
                      <p className="text-xs text-slate-400">{prop.priceDisplay} · {prop.location}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      prop.status === 'approved' ? 'bg-green-50 text-green-600' :
                      prop.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {prop.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Recent Leads</h2>
              <button onClick={() => navigate('/agent/leads')} className="text-xs text-brand-500 font-medium flex items-center gap-1">
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="divide-y divide-slate-50 max-h-96 overflow-y-auto custom-scrollbar">
              {recentLeads.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No leads yet</p>
                </div>
              ) : (
                recentLeads.map(lead => (
                  <div key={lead.id} className="px-5 py-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-700">{lead.customerName}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        lead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                        lead.status === 'contacted' ? 'bg-amber-50 text-amber-600' :
                        lead.status === 'qualified' ? 'bg-green-50 text-green-600' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{lead.propertyTitle}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{lead.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
