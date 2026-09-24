import { useLead } from '../../context/LeadContext';
import { MessageSquare, Phone, Mail, User, Building2, ArrowRight, CheckCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../components/common/Modal';

export default function LeadManagementPage() {
  const { leads, updateLeadStatus, addLead } = useLead();
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLead, setNewLead] = useState({ customerName: '', customerEmail: '', customerPhone: '', message: '', propertyTitle: '', agentName: '' });

  const statusColors = {
    new: 'bg-blue-50 text-blue-600',
    contacted: 'bg-amber-50 text-amber-600',
    qualified: 'bg-green-50 text-green-600',
    closed: 'bg-slate-100 text-slate-500',
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    addLead({
      ...newLead,
      propertyId: 'manual',
      agentId: 'agent-001',
      source: 'manual',
    });
    setShowAddLead(false);
    setNewLead({ customerName: '', customerEmail: '', customerPhone: '', message: '', propertyTitle: '', agentName: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Lead Management</h1>
            <p className="text-sm text-slate-500 mt-1">{leads.length} total leads across all agents</p>
          </div>
          <button onClick={() => setShowAddLead(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} /> Add Lead
          </button>
        </div>

        {/* Lead stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {Object.entries(statusColors).map(([status, colors]) => {
            const count = leads.filter(l => l.status === status).length;
            return (
              <div key={status} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <p className="text-2xl font-bold text-slate-900">{count}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${colors}`}>{status}</span>
              </div>
            );
          })}
        </div>

        {/* Lead table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Customer</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Property</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Agent</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Source</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leads.map((lead, idx) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors animate-fade-in" style={{ animationDelay: `${idx * 30}ms` }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-700">{lead.customerName}</p>
                          <p className="text-xs text-slate-400">{lead.customerPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-600 truncate max-w-[180px]">{lead.propertyTitle}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{lead.agentName}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded capitalize">{lead.source}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[lead.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{lead.createdDate}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${lead.customerPhone}`} className="text-brand-500 hover:text-brand-600">
                        <Phone size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      <Modal isOpen={showAddLead} onClose={() => setShowAddLead(false)} title="Add Manual Lead">
        <form onSubmit={handleAddLead} className="space-y-4">
          <input type="text" placeholder="Customer Name *" required value={newLead.customerName} onChange={(e) => setNewLead({ ...newLead, customerName: e.target.value })} className="input-field" />
          <input type="email" placeholder="Email *" required value={newLead.customerEmail} onChange={(e) => setNewLead({ ...newLead, customerEmail: e.target.value })} className="input-field" />
          <input type="tel" placeholder="Phone *" required value={newLead.customerPhone} onChange={(e) => setNewLead({ ...newLead, customerPhone: e.target.value })} className="input-field" />
          <input type="text" placeholder="Property Title" value={newLead.propertyTitle} onChange={(e) => setNewLead({ ...newLead, propertyTitle: e.target.value })} className="input-field" />
          <input type="text" placeholder="Agent Name" value={newLead.agentName} onChange={(e) => setNewLead({ ...newLead, agentName: e.target.value })} className="input-field" />
          <textarea placeholder="Message" value={newLead.message} onChange={(e) => setNewLead({ ...newLead, message: e.target.value })} rows={3} className="textarea-field" />
          <button type="submit" className="btn-primary w-full">Add Lead</button>
        </form>
      </Modal>
    </div>
  );
}
