import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, PlusCircle, Bookmark, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, ROLES } = useAuth();

  const getItems = () => {
    switch (currentRole) {
      case ROLES.AGENT:
        return [
          { path: '/agent', label: 'Dashboard', icon: Home },
          { path: '/agent/leads', label: 'Leads', icon: Search },
          { path: '/agent/add-property', label: 'Add', icon: PlusCircle, isCenter: true },
          { path: '/search', label: 'Browse', icon: Bookmark },
          { path: '/login', label: 'Profile', icon: User },
        ];
      case ROLES.ADMIN:
        return [
          { path: '/admin', label: 'Home', icon: Home },
          { path: '/admin/approvals', label: 'Approvals', icon: Search },
          { path: '/admin/agents', label: 'Agents', icon: PlusCircle, isCenter: true },
          { path: '/admin/leads', label: 'Leads', icon: Bookmark },
          { path: '/login', label: 'Profile', icon: User },
        ];
      default:
        return [
          { path: '/', label: 'Home', icon: Home },
          { path: '/search', label: 'Search', icon: Search },
          { path: '/agent/add-property', label: 'Post', icon: PlusCircle, isCenter: true },
          { path: '/saved', label: 'Saved', icon: Bookmark },
          { path: '/login', label: 'Login', icon: User },
        ];
    }
  };

  const items = getItems();

  return (
    <div className="mobile-nav safe-area-bottom">
      {items.map(item => {
        const isActive = location.pathname === item.path;

        if (item.isCenter) {
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center -mt-5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center shadow-floating text-white">
                <item.icon size={22} />
              </div>
              <span className="text-[10px] font-medium text-brand-500 mt-0.5">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
