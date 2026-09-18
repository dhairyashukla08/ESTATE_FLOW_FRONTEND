import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios.js";

const PropertyContext = createContext();

// strips empties, joins arrays into csv
const toParams = (filters = {}) =>
  Object.fromEntries(
    Object.entries(filters)
      .map(([k, v]) => [k, Array.isArray(v) ? v.join(",") : v])
      .filter(([, v]) => v !== "" && v !== null && v !== undefined)
  );

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [commercialProperties, setCommercialProperties] = useState([]);
  const [plotProperties, setPlotProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const res = await API.get("/api/properties/all", { params: toParams(filters) });
      setProperties(res.data);
    } catch (e) {
      console.error("Error fetching properties:", e);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommercial = async (filters = {}) => {
    setLoading(true);
    try {
      const res = await API.get("/api/commercial/all", { params: toParams(filters) });
      setCommercialProperties(res.data);
    } catch (e) {
      console.error("Error fetching commercial:", e);
      setCommercialProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlots = async (filters = {}) => {
    setLoading(true);
    try {
      const res = await API.get("/api/plots/all", { params: toParams(filters) });
      setPlotProperties(res.data);
    } catch (e) {
      console.error("Error fetching plots:", e);
      setPlotProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeatured = async () => {
    try {
      const res = await API.get("/api/properties/all");
      setFeaturedProperties(res.data.slice(0, 3));
    } catch (e) {
      console.error("Error fetching featured:", e);
    }
  };

  // kept so AddProperty's refresh call keeps working
  const fetchCategoryData = async () => {
    await Promise.all([fetchCommercial(), fetchPlots()]);
  };

  // NOTE: no unfiltered fetchProperties() here any more — that was
  // overwriting each page's filtered results on first load.
  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        commercialProperties,
        plotProperties,
        featuredProperties,
        loading,
        fetchProperties,
        fetchCommercial,
        fetchPlots,
        fetchFeatured,
        fetchCategoryData,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => useContext(PropertyContext);