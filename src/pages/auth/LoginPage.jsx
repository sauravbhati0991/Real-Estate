import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, Phone, Building2 } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, ROLES } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(ROLES.CUSTOMER);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-12">
      {/* Decorative */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">■</span>
            </div>
            <span className="text-2xl font-bold text-white font-['Outfit']">Real Estate</span>
          </div>
          <p className="text-slate-400 text-sm">Find your perfect property in Bengaluru</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-7 animate-slide-up">
          {/* Tabs */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                !isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Full Name" className="input-field pl-10" />
              </div>
            )}
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="email" placeholder="Email Address" className="input-field pl-10" />
            </div>
            {!isLogin && (
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="tel" placeholder="Phone Number" className="input-field pl-10" />
              </div>
            )}
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" placeholder="Password" className="input-field pl-10" />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">I am a</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Buyer', icon: User },
                    { label: 'Agent', icon: Building2 },
                    { label: 'Owner', icon: Building2 },
                  ].map(opt => (
                    <button
                      key={opt.label}
                      type="button"
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-500 hover:text-brand-500 transition-colors"
                    >
                      <opt.icon size={20} />
                      <span className="text-xs font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3">
              {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <p className="text-center text-xs text-slate-400 mt-4">
              <a href="#" className="text-brand-500 hover:text-brand-600 font-medium">Forgot password?</a>
            </p>
          )}

          {/* Demo quick login */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center mb-3">Quick demo login as:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: ROLES.CUSTOMER, label: 'Customer', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
                { role: ROLES.AGENT, label: 'Agent', color: 'bg-brand-50 text-brand-600 hover:bg-brand-100' },
                { role: ROLES.ADMIN, label: 'Admin', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
              ].map(opt => (
                <button
                  key={opt.role}
                  onClick={() => {
                    login(opt.role);
                    navigate(opt.role === 'admin' ? '/admin' : opt.role === 'agent' ? '/agent' : '/');
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold transition-colors ${opt.color}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
