import { mockAgents } from '../../data/mockAgents';
import { Users, CheckCircle, XCircle, Mail, Phone, Star, MapPin, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function AgentManagementPage() {
  const [agents, setAgents] = useState(mockAgents);

  const toggleStatus = (agentId) => {
    setAgents(prev => prev.map(a =>
      a.id === agentId ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Agent Management</h1>
            <p className="text-sm text-slate-500 mt-1">{agents.length} registered agents</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent, idx) => (
            <div key={agent.id} className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 hover:shadow-card transition-all duration-200 animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-sm">
                    {agent.shortName}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800">{agent.name}</h3>
                      {agent.verified && <CheckCircle size={14} className="text-blue-500" />}
                    </div>
                    <p className="text-xs text-slate-400">Joined {agent.joinedDate}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                  agent.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                }`}>
                  {agent.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <p className="text-lg font-bold text-slate-800">{agent.activeListings}</p>
                  <p className="text-xs text-slate-400">Listings</p>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <p className="text-lg font-bold text-slate-800">{agent.totalLeads}</p>
                  <p className="text-xs text-slate-400">Leads</p>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <p className="text-lg font-bold text-slate-800 flex items-center justify-center gap-1">
                    <Star size={12} className="text-amber-500 fill-amber-500" /> {agent.rating}
                  </p>
                  <p className="text-xs text-slate-400">Rating</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                <p className="flex items-center gap-2"><Mail size={12} /> {agent.email}</p>
                <p className="flex items-center gap-2"><Phone size={12} /> {agent.phone}</p>
                <p className="flex items-center gap-2"><MapPin size={12} /> {agent.locations.join(', ')}</p>
                <p className="flex items-center gap-2"><Building2 size={12} /> Plan: <span className="capitalize font-medium text-slate-700">{agent.subscription}</span></p>
              </div>

              <button
                onClick={() => toggleStatus(agent.id)}
                className={`w-full text-sm font-medium py-2 rounded-lg border transition-colors ${
                  agent.status === 'active'
                    ? 'border-red-200 text-red-500 hover:bg-red-50'
                    : 'border-green-200 text-green-600 hover:bg-green-50'
                }`}
              >
                {agent.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
