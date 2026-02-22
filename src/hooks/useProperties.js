import axios from "axios";
import { useEffect, useState } from "react";

export const useProperties = (filters = {}) => {
  const mockProperties = [
    {
      _id: "1",
      title: "Luxury Penthouse",
      price: 85000000,
      purpose: "Buy",
      images: [
        "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      ],
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

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //     useEffect(()=> {
  //     const fetchProperties = async () => {
  //       setLoading(true);
  //       try {
  //         const queryString = new URLSearchParams(filters).toString();
  //         const response = await axios.get(`/api/properties?${queryString}`);
  //         setProperties(response.data);
  //       } catch (err) {
  //         setError(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchProperties();
  //   }, [JSON.stringify(filters)]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        let filtered = [...mockProperties];

        if (filters.purpose) {
          filtered = filtered.filter(
            (property) =>
              property.purpose.toLowerCase() === filters.purpose.toLowerCase(),
          );
        }
        if (filters.price) {
          filtered = filtered.filter(
            (property) => property.price <= Number(filters.price),
          );
        }
        if (filters.city) {
          filtered = filtered.filter((property) =>
            property.address.city
              .toLowerCase()
              .includes(filters.city.toLowerCase()),
          );
        }

        setProperties(filtered);
      } catch (err) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [JSON.stringify(filters)]);

  return { properties, loading, error };
};
