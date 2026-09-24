import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ROLES = {
  CUSTOMER: 'customer',
  AGENT: 'agent',
  ADMIN: 'admin',
};

const defaultUsers = {
  customer: {
    id: 'cust-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 99887 76655',
    role: 'customer',
    avatar: null,
  },
  agent: {
    id: 'agent-001',
    name: 'Property Paradise',
    email: 'info@propertyparadise.in',
    phone: '+91 98765 43210',
    role: 'agent',
    avatar: null,
    verified: true,
    subscription: 'pro',
  },
  admin: {
    id: 'admin-001',
    name: 'Admin',
    email: 'admin@beegru.com',
    phone: '+91 90000 00001',
    role: 'admin',
    avatar: null,
  },
};

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem('beegru_role');
    return saved || ROLES.CUSTOMER;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('beegru_role');
    return defaultUsers[saved || ROLES.CUSTOMER];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    localStorage.setItem('beegru_role', currentRole);
    setUser(defaultUsers[currentRole]);
  }, [currentRole]);

  const switchRole = (role) => {
    if (Object.values(ROLES).includes(role)) {
      setCurrentRole(role);
    }
  };

  const login = (role) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentRole(ROLES.CUSTOMER);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      currentRole,
      isAuthenticated,
      switchRole,
      login,
      logout,
      ROLES,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { ROLES };
export default AuthContext;
