import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { mockProperties, BENGALURU_LOCATIONS, PROPERTY_TYPES, TRANSACTION_TYPES } from '../data/mockProperties';

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('beegru_properties');
    return saved ? JSON.parse(saved) : mockProperties;
  });

  const [savedPropertyIds, setSavedPropertyIds] = useState(() => {
    const saved = localStorage.getItem('beegru_saved');
    return saved ? JSON.parse(saved) : ['prop-001', 'prop-004', 'prop-006'];
  });

  const [filters, setFilters] = useState({
    search: '',
    location: 'Bengaluru',
    transactionType: 'buy', // buy, rent
    category: 'Residential',
    propertyType: '',
    minPrice: 0,
    maxPrice: Infinity,
    bedrooms: '',
    sortBy: 'newest', // newest, price_low, price_high, popular
  });

  // Save to localStorage on changes
  const saveProperties = useCallback((updated) => {
    setProperties(updated);
    localStorage.setItem('beegru_properties', JSON.stringify(updated));
  }, []);

  const saveSavedIds = useCallback((updated) => {
    setSavedPropertyIds(updated);
    localStorage.setItem('beegru_saved', JSON.stringify(updated));
  }, []);

  // Filter approved properties for customer-facing views
  const approvedProperties = useMemo(() => {
    return properties.filter(p => p.status === 'approved');
  }, [properties]);

  // Apply search filters
  const filteredProperties = useMemo(() => {
    let result = approvedProperties;

    // Transaction type
    if (filters.transactionType === 'buy') {
      result = result.filter(p => p.transactionType === 'Sale' || p.transactionType === 'Resale');
    } else if (filters.transactionType === 'rent') {
      result = result.filter(p => p.transactionType === 'Rent');
    }

    // Category
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Property type
    if (filters.propertyType) {
      result = result.filter(p => p.propertyType === filters.propertyType);
    }

    // Location
    if (filters.location && filters.location !== 'Bengaluru') {
      result = result.filter(p => p.location === filters.location);
    }

    // Search text
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.propertyType.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Price range
    if (filters.minPrice > 0) {
      result = result.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice < Infinity) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }

    // Bedrooms
    if (filters.bedrooms) {
      const bhk = parseInt(filters.bedrooms);
      result = result.filter(p => p.bedrooms === bhk);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    return result;
  }, [approvedProperties, filters]);

  // Pending properties for admin
  const pendingProperties = useMemo(() => {
    return properties.filter(p => p.status === 'pending');
  }, [properties]);

  // Get properties by agent
  const getAgentProperties = useCallback((agentId) => {
    return properties.filter(p => p.agentId === agentId);
  }, [properties]);

  // Get property by id
  const getPropertyById = useCallback((id) => {
    return properties.find(p => p.id === id);
  }, [properties]);

  // Toggle saved property
  const toggleSaved = useCallback((propertyId) => {
    const updated = savedPropertyIds.includes(propertyId)
      ? savedPropertyIds.filter(id => id !== propertyId)
      : [...savedPropertyIds, propertyId];
    saveSavedIds(updated);
  }, [savedPropertyIds, saveSavedIds]);

  // Get saved properties
  const savedProperties = useMemo(() => {
    return approvedProperties.filter(p => savedPropertyIds.includes(p.id));
  }, [approvedProperties, savedPropertyIds]);

  // Add property (agent)
  const addProperty = useCallback((propertyData) => {
    const newProperty = {
      ...propertyData,
      id: `prop-${String(properties.length + 1).padStart(3, '0')}`,
      status: 'pending',
      views: 0,
      inquiries: 0,
      postedDate: new Date().toISOString().split('T')[0],
    };
    saveProperties([...properties, newProperty]);
    return newProperty;
  }, [properties, saveProperties]);

  // Update property status (admin)
  const updatePropertyStatus = useCallback((propertyId, status) => {
    const updated = properties.map(p =>
      p.id === propertyId ? { ...p, status } : p
    );
    saveProperties(updated);
  }, [properties, saveProperties]);

  // Toggle featured (admin)
  const toggleFeatured = useCallback((propertyId) => {
    const updated = properties.map(p =>
      p.id === propertyId ? { ...p, featured: !p.featured } : p
    );
    saveProperties(updated);
  }, [properties, saveProperties]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      location: 'Bengaluru',
      transactionType: 'buy',
      category: 'Residential',
      propertyType: '',
      minPrice: 0,
      maxPrice: Infinity,
      bedrooms: '',
      sortBy: 'newest',
    });
  }, []);

  return (
    <PropertyContext.Provider value={{
      properties,
      approvedProperties,
      filteredProperties,
      pendingProperties,
      savedProperties,
      savedPropertyIds,
      filters,
      getPropertyById,
      getAgentProperties,
      toggleSaved,
      addProperty,
      updatePropertyStatus,
      toggleFeatured,
      updateFilters,
      resetFilters,
      BENGALURU_LOCATIONS,
      PROPERTY_TYPES,
      TRANSACTION_TYPES,
    }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}

export default PropertyContext;
