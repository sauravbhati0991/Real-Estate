import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Globe, LogIn, Menu, X, Home, Building2, User, Shield } from 'lucide-react';

export default function Navbar() {
  const { currentRole, user, ROLES } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinks = () => {
    switch (currentRole) {
      case ROLES.AGENT:
        return [
          { path: '/agent', label: 'Dashboard', icon: Home },
          { path: '/agent/add-property', label: 'Add Property', icon: Building2 },
          { path: '/agent/leads', label: 'Leads', icon: User },
        ];
      case ROLES.ADMIN:
        return [
          { path: '/admin', label: 'Dashboard', icon: Home },
          { path: '/admin/approvals', label: 'Approvals', icon: Shield },
          { path: '/admin/agents', label: 'Agents', icon: User },
          { path: '/admin/customers', label: 'Customers', icon: User },
          { path: '/admin/leads', label: 'Leads', icon: User },
          { path: '/admin/subscriptions', label: 'Plans', icon: Building2 },
          { path: '/admin/banners', label: 'Banners', icon: Building2 },
        ];
      default:
        return [
          { path: '/', label: 'Home', icon: Home },
          { path: '/search', label: 'Search', icon: Search },
          { path: '/saved', label: 'Saved', icon: Building2 },
        ];
    }
  };

  const links = getNavLinks();

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-brand-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">■</span>
            </div>
            <span className="text-xl font-bold text-brand-500 font-['Outfit']">Real Estate</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
              <Globe size={18} />
            </button>

            {currentRole === ROLES.CUSTOMER && (
              <button
                onClick={() => navigate('/agent/add-property')}
                className="hidden sm:flex btn-primary text-sm py-2 px-4 relative"
              >
                <span className="absolute -top-1.5 -right-1.5 bg-brand-emerald text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  FREE
                </span>
                Post Property
              </button>
            )}

            <button
              onClick={() => navigate('/login')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-navy text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LogIn size={16} />
              Login
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => { navigate('/login'); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-navy hover:bg-slate-50"
              >
                <LogIn size={18} />
                Login / Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
