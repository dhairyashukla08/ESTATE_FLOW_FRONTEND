import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const PropertyContext=createContext();

export const PropertyProvider=({children})=>{

    const [properties,setProperties]=useState([]);
    const [featuredProperties, setFeaturedProperties]=useState([]);
    const[loading,setLoading]=useState(false);
    const [filters, setFilters] = useState({
    city: '',
    type: '',
    purpose: '',
    minPrice: '',
    maxPrice: '',
  });


const fetchProperties = async (searchFilters = filters) => {
    setLoading(true);
    try {
      const params = {};
    if (searchFilters.city) params.city = searchFilters.city;
    if (searchFilters.purpose) params.purpose = searchFilters.purpose;
    if (searchFilters.category && searchFilters.category !== "undefined") {
      params.category = searchFilters.category;
    }
    
    if (searchFilters.minPrice) params.minPrice = searchFilters.minPrice;
    if (searchFilters.maxPrice) params.maxPrice = searchFilters.maxPrice;

    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`/api/properties/all?${queryString}`);
    
    setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };


 const fetchFeatured = async () => {
    try {
      const response = await axios.get('/api/properties/all');
      setFeaturedProperties(response.data.slice(0, 3)); 
    } catch (error) {
      console.error("Error fetching featured properties:", error);
    }
  };

useEffect(() => {
    fetchFeatured();
    fetchProperties();
  }, []);


 const updateFilters = (newFilters) => {
  setFilters(prev => {
    const updated = { ...prev, ...newFilters };
    fetchProperties(updated);
    return updated;
  });
};

  return(
    <PropertyContext.Provider value={{properties,loading,featuredProperties,filters,updateFilters,fetchProperties}}>
        {children}
    </PropertyContext.Provider>
  )
}

export const usePropertyContext=()=>useContext(PropertyContext);