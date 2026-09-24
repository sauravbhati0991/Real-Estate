import { createContext, useContext, useState, useCallback } from 'react';
import { mockLeads } from '../data/mockBanners';

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('beegru_leads');
    return saved ? JSON.parse(saved) : mockLeads;
  });

  const saveLeads = useCallback((updated) => {
    setLeads(updated);
    localStorage.setItem('beegru_leads', JSON.stringify(updated));
  }, []);

  // Add lead (from contact form / whatsapp)
  const addLead = useCallback((leadData) => {
    const newLead = {
      ...leadData,
      id: `lead-${String(leads.length + 1).padStart(3, '0')}`,
      status: 'new',
      consentGiven: true,
      createdDate: new Date().toISOString().split('T')[0],
    };
    saveLeads([...leads, newLead]);
    return newLead;
  }, [leads, saveLeads]);

  // Update lead status
  const updateLeadStatus = useCallback((leadId, status) => {
    const updated = leads.map(l =>
      l.id === leadId ? { ...l, status } : l
    );
    saveLeads(updated);
  }, [leads, saveLeads]);

  // Get leads by agent
  const getAgentLeads = useCallback((agentId) => {
    return leads.filter(l => l.agentId === agentId);
  }, [leads]);

  // Get leads by property
  const getPropertyLeads = useCallback((propertyId) => {
    return leads.filter(l => l.propertyId === propertyId);
  }, [leads]);

  // Lead stats
  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    closed: leads.filter(l => l.status === 'closed').length,
  };

  return (
    <LeadContext.Provider value={{
      leads,
      addLead,
      updateLeadStatus,
      getAgentLeads,
      getPropertyLeads,
      leadStats,
    }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLead must be used within a LeadProvider');
  }
  return context;
}

export default LeadContext;
