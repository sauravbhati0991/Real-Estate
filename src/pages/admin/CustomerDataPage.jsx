import { mockCustomers } from '../../data/mockAgents';
import { User, Mail, Phone, Calendar, Bookmark, MessageSquare } from 'lucide-react';

export default function CustomerDataPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Customer Data</h1>
          <p className="text-sm text-slate-500 mt-1">{mockCustomers.length} registered customers</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Customer</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Contact</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Registered</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Saved</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500">Inquiries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockCustomers.map((cust, idx) => (
                  <tr key={cust.id} className="hover:bg-slate-50 transition-colors animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                          <User size={16} />
                        </div>
                        <span className="font-medium text-slate-700">{cust.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={10} /> {cust.email}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Phone size={10} /> {cust.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 flex items-center gap-1">
                      <Calendar size={12} /> {cust.registeredDate}
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Bookmark size={12} /> {cust.savedProperties.length}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-slate-500">
                        <MessageSquare size={12} /> {cust.totalInquiries}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
