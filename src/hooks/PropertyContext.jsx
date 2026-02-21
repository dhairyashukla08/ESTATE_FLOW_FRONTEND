import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [commercialProperties, setCommercialProperties] = useState([]); // For Commercial Page
  const [plotProperties, setPlotProperties] = useState([]);             // For Plots Page
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    city: '',
    category: 'Residential', // Default category
    purpose: '',
    minPrice: '',
    maxPrice: '',
  });

  // Helper to determine the endpoint
  const getEndpoint = (category) => {
    switch (category) {
      case 'Commercial': return '/api/commercial/all';
      case 'Plots': return '/api/plots/all';
      default: return '/api/properties/all';
    }
  };

  const fetchProperties = async (searchFilters = filters) => {
    setLoading(true);
    try {
      const endpoint = getEndpoint(searchFilters.category);
      
      const params = {};
      if (searchFilters.city) params.city = searchFilters.city;
      if (searchFilters.purpose) params.purpose = searchFilters.purpose;
      if (searchFilters.minPrice) params.minPrice = searchFilters.minPrice;
      if (searchFilters.maxPrice) params.maxPrice = searchFilters.maxPrice;

      const response = await axios.get(endpoint, { params });
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // NEW: Fetch specific data for the Commercial and Plots pages
  const fetchCategoryData = async () => {
    try {
      const [commRes, plotRes] = await Promise.all([
        axios.get('/api/commercial/all'),
        axios.get('/api/plots/all')
      ]);
      setCommercialProperties(commRes.data);
      setPlotProperties(plotRes.data);
    } catch (error) {
      console.error("Error fetching category specific data:", error);
    }
  };

  const fetchFeatured = async () => {
    try {
      // Just fetching residential for featured, or you could merge all 3
      const response = await axios.get('/api/properties/all');
      setFeaturedProperties(response.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching featured properties:", error);
    }
  };

  useEffect(() => {
    fetchFeatured();
    fetchProperties();
    fetchCategoryData(); // Load all data on mount
  }, []);

  const updateFilters = (newFilters) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      fetchProperties(updated);
      return updated;
    });
  };

  return (
    <PropertyContext.Provider value={{
      properties, 
      commercialProperties, 
      plotProperties, 
      loading, 
      featuredProperties, 
      filters, 
      updateFilters, 
      fetchProperties 
    }}>
      {children}
    </PropertyContext.Provider>
  );
}

export const usePropertyContext = () => useContext(PropertyContext);