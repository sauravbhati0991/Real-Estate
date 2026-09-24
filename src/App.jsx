import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { LeadProvider } from './context/LeadContext';

import Navbar from './components/common/Navbar';
import MobileNav from './components/common/MobileNav';
import Footer from './components/common/Footer';
import RoleSwitcher from './components/common/RoleSwitcher';

// Customer pages
import HomePage from './pages/customer/HomePage';
import SearchPage from './pages/customer/SearchPage';
import PropertyDetailPage from './pages/customer/PropertyDetailPage';
import SavedPropertiesPage from './pages/customer/SavedPropertiesPage';

// Agent pages
import AgentDashboard from './pages/agent/AgentDashboard';
import AddPropertyPage from './pages/agent/AddPropertyPage';
import AgentLeadsPage from './pages/agent/AgentLeadsPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PropertyApprovalPage from './pages/admin/PropertyApprovalPage';
import AgentManagementPage from './pages/admin/AgentManagementPage';
import CustomerDataPage from './pages/admin/CustomerDataPage';
import SubscriptionPlansPage from './pages/admin/SubscriptionPlansPage';
import BannerManagementPage from './pages/admin/BannerManagementPage';
import LeadManagementPage from './pages/admin/LeadManagementPage';

// Auth
import LoginPage from './pages/auth/LoginPage';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
          {/* Customer */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/saved" element={<SavedPropertiesPage />} />

          {/* Agent */}
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/agent/add-property" element={<AddPropertyPage />} />
          <Route path="/agent/leads" element={<AgentLeadsPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/approvals" element={<PropertyApprovalPage />} />
          <Route path="/admin/agents" element={<AgentManagementPage />} />
          <Route path="/admin/customers" element={<CustomerDataPage />} />
          <Route path="/admin/subscriptions" element={<SubscriptionPlansPage />} />
          <Route path="/admin/banners" element={<BannerManagementPage />} />
          <Route path="/admin/leads" element={<LeadManagementPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
      <RoleSwitcher />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <PropertyProvider>
          <LeadProvider>
            <AppLayout />
          </LeadProvider>
        </PropertyProvider>
      </AuthProvider>
    </Router>
  );
}
