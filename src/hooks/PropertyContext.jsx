import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios.js";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [commercialProperties, setCommercialProperties] = useState([]); 
  const [plotProperties, setPlotProperties] = useState([]); 
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    city: "",
    category: "Residential",
    purpose: "",
    minPrice: "",
    maxPrice: "",
  });

  const getEndpoint = (category) => {
    switch (category) {
      case "Commercial":
        return "/api/commercial/all";
      case "Plots":
        return "/api/plots/all";
      default:
        return "/api/properties/all";
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

      const response = await API.get(endpoint, { params });
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const [commRes, plotRes] = await Promise.all([
        API.get("/api/commercial/all"),
        API.get("/api/plots/all"),
      ]);
      setCommercialProperties(commRes.data);
      setPlotProperties(plotRes.data);
    } catch (error) {
      console.error("Error fetching category specific data:", error);
    }
  };

  const fetchFeatured = async () => {
    try {
      const response = await API.get("/api/properties/all");
      setFeaturedProperties(response.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching featured properties:", error);
    }
  };

  useEffect(() => {
    fetchFeatured();
    fetchProperties();
    fetchCategoryData();
  }, []);

  const updateFilters = (newFilters) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      fetchProperties(updated);
      return updated;
    });
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        commercialProperties,
        plotProperties,
        loading,
        featuredProperties,
        filters,
        updateFilters,
        fetchProperties,
        fetchFeatured,
        fetchCategoryData,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => useContext(PropertyContext);
