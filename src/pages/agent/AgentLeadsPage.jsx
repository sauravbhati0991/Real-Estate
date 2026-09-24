import { useAuth } from '../../context/AuthContext';
import { useLead } from '../../context/LeadContext';
import { MessageSquare, Phone, Mail, Clock, CheckCircle, ArrowRight, User } from 'lucide-react';

export default function AgentLeadsPage() {
  const { user } = useAuth();
  const { getAgentLeads, updateLeadStatus } = useLead();
  const leads = getAgentLeads(user.id);

  const statusColors = {
    new: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
    contacted: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
    qualified: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
    closed: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Leads Inbox</h1>
            <p className="text-sm text-slate-500">{leads.length} total inquiries</p>
          </div>
          <div className="flex gap-2">
            {['new', 'contacted', 'qualified'].map(status => {
              const count = leads.filter(l => l.status === status).length;
              const colors = statusColors[status];
              return (
                <span key={status} className={`${colors.bg} ${colors.text} text-xs font-medium px-3 py-1.5 rounded-full capitalize`}>
                  {status}: {count}
                </span>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          {leads.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <MessageSquare size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-slate-500">No leads yet</p>
              <p className="text-sm text-slate-400 mt-1">Leads from property inquiries will appear here</p>
            </div>
          ) : (
            leads.map((lead, idx) => {
              const colors = statusColors[lead.status] || statusColors.new;
              return (
                <div
                  key={lead.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 hover:shadow-card transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{lead.customerName}</p>
                        <p className="text-xs text-slate-400">{lead.createdDate} · via {lead.source === 'whatsapp' ? 'WhatsApp' : 'Contact Form'}</p>
                      </div>
                    </div>
                    <span className={`${colors.bg} ${colors.text} text-xs font-medium px-2.5 py-1 rounded-full capitalize`}>
                      {lead.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
                    "{lead.message}"
                  </p>

                  <p className="text-xs text-slate-400 mb-3 truncate">
                    Property: <strong className="text-slate-500">{lead.propertyTitle}</strong>
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <a href={`tel:${lead.customerPhone}`} className="flex items-center gap-1 hover:text-brand-500 transition-colors">
                        <Phone size={12} /> {lead.customerPhone}
                      </a>
                      <a href={`mailto:${lead.customerEmail}`} className="flex items-center gap-1 hover:text-brand-500 transition-colors">
                        <Mail size={12} /> {lead.customerEmail}
                      </a>
                    </div>

                    <div className="flex gap-2">
                      {lead.status === 'new' && (
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'contacted')}
                          className="text-xs font-medium text-brand-500 hover:text-brand-600 flex items-center gap-1"
                        >
                          Mark Contacted <ArrowRight size={12} />
                        </button>
                      )}
                      {lead.status === 'contacted' && (
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'qualified')}
                          className="text-xs font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
                        >
                          <CheckCircle size={12} /> Qualify
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
