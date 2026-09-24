import { useProperty } from '../../context/PropertyContext';
import { useLead } from '../../context/LeadContext';
import { mockAgents, mockCustomers } from '../../data/mockAgents';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, MessageSquare, Shield, TrendingUp, Clock, CheckCircle, XCircle, ArrowRight, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const { properties, pendingProperties, approvedProperties } = useProperty();
  const { leadStats } = useLead();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Properties', value: properties.length, icon: Building2, color: 'bg-blue-500', link: '/admin/approvals' },
    { label: 'Pending Approval', value: pendingProperties.length, icon: Clock, color: 'bg-amber-500', link: '/admin/approvals' },
    { label: 'Active Agents', value: mockAgents.filter(a => a.status === 'active').length, icon: Users, color: 'bg-brand-emerald', link: '/admin/agents' },
    { label: 'Total Leads', value: leadStats.total, icon: MessageSquare, color: 'bg-brand-indigo', link: '/admin/leads' },
    { label: 'Customers', value: mockCustomers.length, icon: Users, color: 'bg-pink-500', link: '/admin/customers' },
    { label: 'New Leads', value: leadStats.new, icon: TrendingUp, color: 'bg-brand-500', link: '/admin/leads' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Admin Control Center</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of platform activity</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <button
              key={idx}
              onClick={() => navigate(stat.link)}
              className="stat-card text-left hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-white mb-3`}>
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Clock size={18} className="text-amber-500" />
                Pending Approvals
              </h2>
              <button onClick={() => navigate('/admin/approvals')} className="text-xs text-brand-500 font-medium flex items-center gap-1">
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {pendingProperties.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <CheckCircle size={32} className="mx-auto mb-2 opacity-50" />
                  <p>All caught up!</p>
                </div>
              ) : (
                pendingProperties.slice(0, 4).map(prop => (
                  <div key={prop.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 cursor-pointer" onClick={() => navigate('/admin/approvals')}>
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 flex-shrink-0">
                      <Building2 size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{prop.title}</p>
                      <p className="text-xs text-slate-400">{prop.agentName} · {prop.location}</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Quick Actions</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {[
                { label: 'Property Approvals', desc: `${pendingProperties.length} pending`, icon: Shield, path: '/admin/approvals', color: 'text-amber-500 bg-amber-50' },
                { label: 'Agent Management', desc: `${mockAgents.length} agents`, icon: Users, path: '/admin/agents', color: 'text-blue-500 bg-blue-50' },
                { label: 'Lead Management', desc: `${leadStats.new} new leads`, icon: MessageSquare, path: '/admin/leads', color: 'text-brand-indigo bg-indigo-50' },
                { label: 'Customer Data', desc: `${mockCustomers.length} registered`, icon: Users, path: '/admin/customers', color: 'text-pink-500 bg-pink-50' },
                { label: 'Subscription Plans', desc: '3 plans active', icon: TrendingUp, path: '/admin/subscriptions', color: 'text-brand-emerald bg-emerald-50' },
                { label: 'Banner Management', desc: '3 banners', icon: Eye, path: '/admin/banners', color: 'text-purple-500 bg-purple-50' },
              ].map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(action.path)}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-soft transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color}`}>
                    <action.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{action.label}</p>
                    <p className="text-xs text-slate-400">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
