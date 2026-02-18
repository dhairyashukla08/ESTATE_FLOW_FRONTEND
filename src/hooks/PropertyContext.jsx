import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const PropertyContext=createContext();

export const PropertyProvider=({children})=>{

const mockProperties = [
  {
    _id: "1",
    title: "Luxury Penthouse",
    price: 85000000,
    purpose: "Buy",
    images: [],
    address: { city: "Mumbai", area: "Bandra West" },
    features: { bedrooms: 3, bathrooms: 4, areaSize: 2400 },
  },
  {
    _id: "2",
    title: "Modern Apartment",
    price: 45000000,
    purpose: "Buy",
    images: [],
    address: { city: "Delhi", area: "South Extension" },
    features: { bedrooms: 2, bathrooms: 2, areaSize: 1400 },
  },
  {
    _id: "3",
    title: "Cozy Rental Flat",
    price: 45000,
    purpose: "Rent",
    images: [],
    address: { city: "Mumbai", area: "Andheri" },
    features: { bedrooms: 1, bathrooms: 1, areaSize: 600 },
  },
];


    const [properties,setProperties]=useState([]);
    const [featuredProperties, setFeaturedProperties]=useState([]);
    const[loading,setLoading]=useState(false);
    const [filters, setFilters] = useState({
    city: '',
    type: '',
    minPrice: '',
    maxPrice: '',
  });

  const applyFilters = (data, searchFilters) => {
    let filtered = [...data];

    if (searchFilters.city) {
      filtered = filtered.filter((property) =>
        property.address.city
          .toLowerCase()
          .includes(searchFilters.city.toLowerCase())
      );
    }

    if (searchFilters.type) {
      filtered = filtered.filter(
        (property) =>
          property.purpose.toLowerCase() ===
          searchFilters.type.toLowerCase()
      );
    }

    if (searchFilters.minPrice) {
      filtered = filtered.filter(
        (property) =>
          property.price >= Number(searchFilters.minPrice)
      );
    }

    if (searchFilters.maxPrice) {
      filtered = filtered.filter(
        (property) =>
          property.price <= Number(searchFilters.maxPrice)
      );
    }

    return filtered;
  };

//   const fetchProperties = async (searchFilters = filters) => {
//     setLoading(true);
//     try {
//       const queryString = new URLSearchParams(searchFilters).toString();
//       const response = await axios.get(`/api/properties?${queryString}`);
//       setProperties(response.data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchProperties = (searchFilters = filters) => {
    setLoading(true);

    setTimeout(() => {
      const filtered = applyFilters(mockProperties, searchFilters);
      setProperties(filtered);
      setLoading(false);
    }, 500); 
  };

  const fetchFeatured = () => {
    const featured = mockProperties.filter(
      (property) => property.isFeatured
    );
    setFeaturedProperties(featured);
  };

//   useEffect(() => {
//     const fetchFeatured = async () => {
//       try {
//         const response = await axios.get('/api/properties/featured');
//         setFeaturedProperties(response.data);
//       } catch (error) {
//         console.error("Error fetching featured properties:", error);
//       }
//     };
//     fetchFeatured();
//     fetchProperties(); 
//   }, []);

 useEffect(() => {
    fetchFeatured();
    fetchProperties();
  }, []);


  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return(
    <PropertyContext.Provider value={{properties,loading,featuredProperties,filters,updateFilters,fetchProperties}}>
        {children}
    </PropertyContext.Provider>
  )
}

export const usePropertyContext=()=>useContext(PropertyContext);