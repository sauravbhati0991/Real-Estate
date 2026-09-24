import { useAuth } from '../../context/AuthContext';
import { User, Building2, Shield, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roleConfig = {
  customer: { label: 'Customer', icon: User, color: 'bg-blue-500', path: '/' },
  agent: { label: 'Agent', icon: Building2, color: 'bg-brand-500', path: '/agent' },
  admin: { label: 'Admin', icon: Shield, color: 'bg-purple-600', path: '/admin' },
};

export default function RoleSwitcher() {
  const { currentRole, switchRole, ROLES } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const current = roleConfig[currentRole];

  const handleSwitch = (role) => {
    switchRole(role);
    navigate(roleConfig[role].path);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50">
      {/* Expanded menu */}
      {open && (
        <div className="mb-2 bg-white rounded-xl shadow-card border border-slate-200 overflow-hidden animate-slide-up">
          <div className="p-3 border-b border-slate-100">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Switch Role</p>
          </div>
          {Object.entries(ROLES).map(([key, value]) => {
            const config = roleConfig[value];
            const isActive = currentRole === value;
            return (
              <button
                key={value}
                onClick={() => handleSwitch(value)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center text-white`}>
                  <config.icon size={16} />
                </div>
                {config.label}
                {isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-brand-500" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`${current.color} text-white rounded-full px-4 py-3 shadow-floating flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95`}
      >
        <current.icon size={18} />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
